import React from "react"
import _ from "lodash"
import MainLayout from "../components/MainLayout"
import ZoneMasterView from "../components/ZoneMasterView"
import NationwideSummaryHeader from "../components/NationwideSummaryHeader"
import PartyStatsList from "../components/PartyStatsList"
import { useSummaryData } from "../models/LiveDataSubscription"
import { parties, getPartyById } from "../models/information"
import { calculatePartyList } from "thailand-party-list-calculator"

export default ({ pageContext }) => (
  <MainLayout>
    <ZoneMasterView
      contentHeader={<NationwideSummaryHeaderContainer />}
      contentBody={<NationwidePartyStatsContainer />}
    />
  </MainLayout>
)

function NationwideSummaryHeaderContainer() {
  // @todo #1 Replace mock data in NationwideSummaryHeaderContainer
  //  with subscription to the Data Model.
  const mockData = {
    totalZoneCount: 350,
    completedZoneCount: 202,
    totalVoteCount: 17452385,
    eligibleVoterCount: 51427890,
  }
  return <NationwideSummaryHeader {...mockData} />
}

function NationwidePartyStatsContainer() {
  const summaryState = useSummaryData()
  if (summaryState.loading) return null
  const summary = summaryState.data

  // @todo #53 [Refactor] Move party stats calculation logic to models/PartyStats.

  // Calculate the constituency seat count for each party.
  const constituencySeatCount = _(summary.zoneWinningCandidateMap)
    .values()
    .flatMap(z => _.values(z))
    .countBy(c => c.partyId)
    .value()

  // Calculate seat counts for ecah party.
  const partyStats = _(parties)
    .map(party => {
      return {
        id: party.id,
        electedMemberCount: constituencySeatCount[party.id] || 0,
        voteCount: summary.partyScoreMap[party.id] || 0,
        partyListCandidateCount: party.partylist,
      }
    })
    .thru(calculatePartyList)
    .map(calculated => {
      const partyId = calculated.id
      const party = getPartyById(partyId)
      return {
        party,
        constituencySeats: calculated.electedMemberCount,
        partyListSeats: calculated.partyListMemberCount,
      }
    })
    .sortBy(row => row.constituencySeats + row.partyListSeats)
    .reverse()
    .value()

  return <PartyStatsList partyStats={partyStats} />
}
