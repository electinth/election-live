import React, { useState, useLayoutEffect } from "react"
import _ from "lodash"
import MainLayout from "../components/MainLayout"
import ZoneMasterView from "../components/ZoneMasterView"
import NationwideSummaryHeader from "../components/NationwideSummaryHeader"
import PartyStatsList from "../components/PartyStatsList"
import { useSummaryData } from "../models/LiveDataSubscription"
import {
  partyStatsFromSummaryJSON,
  partyStatsRowTotalSeats,
} from "../models/PartyStats"
import {
  zones,
  filters,
  checkFilter,
  getZoneByProvinceIdAndZoneNo,
} from "../models/information"
import { ZoneFilterContext } from "../components/ZoneFilterPanel"

export default ({ pageContext }) => (
  <MainLayout activeNavBarSection="by-area">
    <InertFilter
      value={pageContext.zoneView ? null : pageContext.filterName || "all"}
    >
      {filterName => (
        <ZoneFilterContext.Provider value={filterName}>
          <ZoneMasterView
            contentHeader={<SummaryHeaderContainer filterName={filterName} />}
            contentBody={<PartyStatsContainer filterName={filterName} />}
            popup={
              pageContext.zoneView ? (
                <ZoneView {...pageContext.zoneView} />
              ) : null
            }
          />
        </ZoneFilterContext.Provider>
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
function SummaryHeaderContainer({ filterName }) {
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
    .flatMap((zoneNoStatsMap, provinceId) =>
      _.map(zoneNoStatsMap, (stats, zoneNo) => ({
        provinceId: +provinceId,
        zoneNo: +zoneNo,
        stats,
      }))
    )
    .filter(row =>
      checkFilter(
        currentFilter,
        getZoneByProvinceIdAndZoneNo(row.provinceId, row.zoneNo)
      )
    )
    .map(row => row.stats)
    .value()

  const mockData = {
    totalZoneCount,
    completedZoneCount: _.sumBy(allZoneStats, s => (s.finished ? 1 : 0)),
    totalVoteCount: _.sumBy(allZoneStats, s => s.votesTotal),
    eligibleVoterCount: _.sumBy(allZoneStats, s => s.eligible),
  }
  return <NationwideSummaryHeader title={title} {...mockData} />
}

function PartyStatsContainer({ filterName }) {
  const summaryState = useSummaryData()
  if (summaryState.loading) return null

  const summary = summaryState.data
  const currentFilter = filters[filterName]
  const partyStats = partyStatsFromSummaryJSON(summary, currentFilter).filter(
    row => partyStatsRowTotalSeats(row) > 0
  )

  return <PartyStatsList partyStats={partyStats} />
}

function ZoneView({ provinceId, zoneNo }) {
  return (
    <div>
      {provinceId} - {zoneNo}
    </div>
  )
}
