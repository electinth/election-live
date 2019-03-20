import React from "react"
import _ from "lodash"
import MainLayout from "../components/MainLayout"
import ZoneMasterView from "../components/ZoneMasterView"
import NationwideSummaryHeader from "../components/NationwideSummaryHeader"
import PartyStatsList from "../components/PartyStatsList"
import { useSummaryData } from "../models/LiveDataSubscription"
import { partyStatsFromSummaryJSON } from "../models/PartyStats"

export default ({ pageContext }) => (
  <MainLayout>
    <ZoneMasterView
      contentHeader={<NationwideSummaryHeaderContainer />}
      contentBody={<NationwidePartyStatsContainer />}
    />
  </MainLayout>
)

function NationwideSummaryHeaderContainer() {
  const summaryState = useSummaryData()

  // @todo #52 Calculate `totalZoneCount` based on filter instead of hardcoded 350.
  const totalZoneCount = 350

  if (summaryState.loading)
    return <NationwideSummaryHeader loading totalZoneCount={totalZoneCount} />

  const summary = summaryState.data
  const allZoneStats = _.chain(summary.zoneStatsMap)
    .values()
    .flatMap(m => _.values(m))
    .value()

  const mockData = {
    totalZoneCount,
    completedZoneCount: _.sumBy(allZoneStats, s => (s.finished ? 1 : 0)),
    totalVoteCount: _.sumBy(allZoneStats, s => s.votesTotal),
    eligibleVoterCount: _.sumBy(allZoneStats, s => s.eligible),
  }
  return <NationwideSummaryHeader {...mockData} />
}

function NationwidePartyStatsContainer() {
  const summaryState = useSummaryData()
  if (summaryState.loading) return null
  const summary = summaryState.data
  const partyStats = partyStatsFromSummaryJSON(summary)
  return <PartyStatsList partyStats={partyStats} />
}
