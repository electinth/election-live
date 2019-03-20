import React from "react"
import MainLayout from "../components/MainLayout"
import ZoneMasterView from "../components/ZoneMasterView"
import NationwideSummaryHeader from "../components/NationwideSummaryHeader"
import PartyStatsList from "../components/PartyStatsList"
import { getMockPartyStatsNationwide } from "../components/__mocks__/PartyStatsMockData"

export default ({ pageContext }) => (
  <MainLayout>
    <ZoneMasterView
      contentHeader={<NationwideSummaryHeaderContainer />}
      contentBody={<PartyStatsContainer />}
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

function PartyStatsContainer() {
  // @todo #1 Replace mock data in PartyStatsContainer
  //  with subscription to the Data Model.
  const mockPartyStats = getMockPartyStatsNationwide()
  return <PartyStatsList partyStats={mockPartyStats} />
}
