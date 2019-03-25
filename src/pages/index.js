import { navigate } from "gatsby"
import _ from "lodash"
import React, {
  useLayoutEffect,
  useState,
  useRef,
  useEffect,
  createContext,
} from "react"
import MainLayout from "../components/MainLayout"
import NationwideSummaryHeader from "../components/NationwideSummaryHeader"
import PartyStatsList from "../components/PartyStatsList"
import { ZoneFilterContext } from "../components/ZoneFilterPanel"
import ZoneMasterView from "../components/ZoneMasterView"
import {
  checkFilter,
  filters,
  getZoneByProvinceIdAndZoneNo,
  zones,
} from "../models/information"
import { useSummaryData } from "../models/LiveDataSubscription"
import {
  partyStatsFromSummaryJSON,
  partyStatsRowTotalSeats,
  isZoneFinished,
} from "../models/PartyStats"
import Loading from "../components/Loading"
import UndesirableState from "../components/UndesirableState"
import LoadingError from "../components/LoadingError"
import PerZoneView from "../components/PerZoneView"

export const MobileTabContext = createContext(
  /** @type {import('../components/ZoneMasterView').MobileTab} */ ("summary")
)

export default ({ pageContext, location }) => (
  <MainLayout activeNavBarSection="by-area">
    <ZonePageContainer pageContext={pageContext} location={location} />
  </MainLayout>
)

function ZonePageContainer({ pageContext, location }) {
  /** @type {ZoneFilterName | null} */
  const filterNameFromRoute = pageContext.zoneView
    ? null
    : pageContext.filterName || "all"
  const filterNameRef = useRef(filterNameFromRoute || "all")
  const filterName =
    filterNameFromRoute != null ? filterNameFromRoute : filterNameRef.current
  useEffect(() => {
    filterNameRef.current = filterName
  })

  /** @type {import('../components/ZoneMasterView').MobileTab | null} */
  const mobileTabFromRoute = pageContext.zoneView
    ? null
    : getTabFromUrl(location)
  const currentMobileTabRef = useRef(mobileTabFromRoute || "summary")
  const currentMobileTab =
    mobileTabFromRoute != null
      ? mobileTabFromRoute
      : currentMobileTabRef.current
  const switchMobileTab = targetTab => {
    if (targetTab === "summary") {
      navigate(`${location.pathname}`)
    } else {
      navigate(`${location.pathname}?tab=${targetTab}`)
    }
  }
  useEffect(() => {
    currentMobileTabRef.current = currentMobileTab
  })

  return (
    <ZoneFilterContext.Provider value={filterName}>
      <MobileTabContext.Provider value={currentMobileTab}>
        <ZoneMasterView
          currentZone={pageContext.zoneView}
          contentHeader={
            <SummaryHeaderContainer key={filterName} filterName={filterName} />
          }
          contentBody={
            <PartyStatsContainer key={filterName} filterName={filterName} />
          }
          popup={
            pageContext.zoneView ? (
              <PerZoneView {...pageContext.zoneView} />
            ) : null
          }
          currentMobileTab={currentMobileTab}
          switchMobileTab={switchMobileTab}
        />
      </MobileTabContext.Provider>
    </ZoneFilterContext.Provider>
  )
}

function getTabFromUrl(location) {
  const matches = location.search.match(/(\?|&)tab=(.+)(&|$)/)
  return matches ? matches[2] : "summary"
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

  if (!summaryState.completed) {
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
    completedZoneCount: _.sumBy(allZoneStats, s => (isZoneFinished(s) ? 1 : 0)),
    totalVoteCount: _.sumBy(allZoneStats, s => s.votesTotal),
    eligibleVoterCount: _.sumBy(allZoneStats, s => s.eligible),
  }
  return <NationwideSummaryHeader title={title} {...mockData} />
}

function PartyStatsContainer({ filterName }) {
  const summaryState = useSummaryData()
  if (!summaryState.completed) {
    if (summaryState.failed) {
      return <LoadingError />
    }
    return <Loading size="large" />
  }

  const summary = summaryState.data
  const currentFilter = filters[filterName]
  const filtered = filterName !== "all"
  const filteredPartyStats = _.chain(
    partyStatsFromSummaryJSON(summary, {
      filter: currentFilter,
    })
  )
    .map(row => (filtered ? { ...row, partyListSeats: 0 } : row))
    .filter(row => partyStatsRowTotalSeats(row) > 0)
    .sortBy(row => row.seatsCeiling)
    .sortBy(row => partyStatsRowTotalSeats(row))
    .reverse()
    .value()

  if (filteredPartyStats.length < 1) {
    return (
      <UndesirableState
        heading={
          <span>
            ยังไม่มีพรรคไหน
            <br />
            ได้ที่นั่ง ส.ส.
          </span>
        }
      >
        เริ่มแสดงผลเมื่อนับคะแนนแล้ว 10%
      </UndesirableState>
    )
  }

  return <PartyStatsList partyStats={filteredPartyStats} filtered={filtered} />
}
