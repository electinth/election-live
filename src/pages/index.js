import React, { useState, useEffect, useLayoutEffect } from "react"
import _ from "lodash"
import MainLayout from "../components/MainLayout"
import ZoneMasterView from "../components/ZoneMasterView"
import NationwideSummaryHeader from "../components/NationwideSummaryHeader"
import PartyStatsList from "../components/PartyStatsList"
import { useSummaryData } from "../models/LiveDataSubscription"
import { partyStatsFromSummaryJSON } from "../models/PartyStats"
import { zones, filters, checkFilter } from "../models/information"
import { ZoneFilterContextProvider } from "../components/ZoneFilterPanel"

export default ({ pageContext }) => (
  <MainLayout>
    <InertFilter
      value={pageContext.zoneView ? null : pageContext.filterName || "all"}
    >
      {filterName => (
        <ZoneFilterContextProvider value={filterName}>
          <ZoneMasterView
            contentHeader={
              <NationwideSummaryHeaderContainer filterName={filterName} />
            }
            contentBody={
              <NationwidePartyStatsContainer filterName={filterName} />
            }
          />
        </ZoneFilterContextProvider>
      )}
    </InertFilter>
  </MainLayout>
)

function InertFilter({ value: filterNameFromRoute, children }) {
  const [filterName, setFilterName] = useState(filterNameFromRoute || "all")

  useLayoutEffect(() => {
    if (filterNameFromRoute !== null) {
      if (filterName !== filterNameFromRoute) {
        setFilterName(filterNameFromRoute)
      }
    }
  }, [filterName, filterNameFromRoute])

  return children(filterName)
}

/**
 * @param {object} props
 * @param {ZoneFilterName} props.filterName
 */
function NationwideSummaryHeaderContainer({ filterName }) {
  const summaryState = useSummaryData()
  const currentFilter = filters[filterName]
  const totalZoneCount = zones.filter(zone => checkFilter(currentFilter, zone))
    .length
  const title = currentFilter.name.th

  if (summaryState.loading) {
    return (
      <NationwideSummaryHeader
        title={title}
        loading
        totalZoneCount={totalZoneCount}
      />
    )
  }

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
  return <NationwideSummaryHeader title={title} {...mockData} />
}

function NationwidePartyStatsContainer({ filterName }) {
  const summaryState = useSummaryData()
  if (summaryState.loading) return null

  const summary = summaryState.data
  const currentFilter = filters[filterName]
  const partyStats = partyStatsFromSummaryJSON(summary, currentFilter)

  return <PartyStatsList partyStats={partyStats} />
}
