import { navigate } from "gatsby"
import _ from "lodash"
import React, { useContext, useLayoutEffect, useState } from "react"
import CandidateStatsRow from "../components/CandidateStatsRow"
import CloseButton from "../components/CloseButton"
import MainLayout from "../components/MainLayout"
import NationwideSubSummaryHeader from "../components/NationwideSubSummaryBox"
import NationwideSummaryHeader from "../components/NationwideSummaryHeader"
import PartyStatsList from "../components/PartyStatsList"
import TotalVoterSummary from "../components/TotalVoterSummary"
import { ZoneFilterContext } from "../components/ZoneFilterPanel"
import ZoneMasterView from "../components/ZoneMasterView"
import {
  checkFilter,
  filterPath,
  filters,
  getProvinceById,
  getZoneByProvinceIdAndZoneNo,
  zones,
  getPartyById,
} from "../models/information"
import { useSummaryData, usePerZoneData } from "../models/LiveDataSubscription"
import {
  partyStatsFromSummaryJSON,
  partyStatsRowTotalSeats,
  isZoneFinished,
} from "../models/PartyStats"
import { DISPLAY_FONT, labelColor } from "../styles"
import Loading from "../components/Loading"
import Placeholder from "../components/Placeholder"

export default ({ pageContext }) => (
  <MainLayout activeNavBarSection="by-area">
    <InertFilter
      value={pageContext.zoneView ? null : pageContext.filterName || "all"}
    >
      {filterName => (
        <ZoneFilterContext.Provider value={filterName}>
          <ZoneMasterView
            contentHeader={
              <SummaryHeaderContainer
                key={filterName}
                filterName={filterName}
              />
            }
            contentBody={
              <PartyStatsContainer key={filterName} filterName={filterName} />
            }
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
  if (!summaryState.completed) return null

  const summary = summaryState.data
  const currentFilter = filters[filterName]
  const partyStats = partyStatsFromSummaryJSON(summary, {
    filter: currentFilter,
  }).filter(row => partyStatsRowTotalSeats(row) > 0)

  return <PartyStatsList partyStats={partyStats} />
}

function ZoneView({ provinceId, zoneNo }) {
  const zone = getZoneByProvinceIdAndZoneNo(provinceId, zoneNo)
  const province = getProvinceById(provinceId)
  const activeFilter = useContext(ZoneFilterContext)

  const summaryState = useSummaryData()
  const summary = summaryState.data
  if (!summary) {
    return null
  }

  const zoneStats = summary.zoneStatsMap[provinceId][zoneNo]
  const votePercentage = Math.round(
    (zoneStats.votesTotal / zoneStats.eligible) * 100
  )

  return (
    <div
      css={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        display: "flex",
        flexDirection: "column",
        padding: 10,
      }}
    >
      <div css={{ flex: "auto", position: "relative" }}>
        <div
          css={{
            position: "absolute",
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            overflowX: "hidden",
            overflowY: "auto",
            WebkitOverflowScrolling: "touch",
          }}
        >
          <CloseButton onClick={() => navigate(filterPath(activeFilter))} />
          <div
            css={{
              textAlign: "center",
              flex: "none",
            }}
          >
            <h1 css={{ fontFamily: DISPLAY_FONT }}>{province.name}</h1>
            <h2 css={{ fontFamily: DISPLAY_FONT, color: labelColor }}>
              เขตเลือกตั้งที่ {zone.no}
            </h2>
            <div>
              <span>นับแล้ว</span>
              <span
                css={{
                  marginLeft: 10,
                  fontSize: "2rem",
                  fontFamily: DISPLAY_FONT,
                }}
              >
                {zoneStats.progress}%
              </span>
            </div>

            <div
              css={{
                borderTop: "1px solid",
                // borderBottom: "1px solid",
                marginBottom: 10,
              }}
            >
              <TotalVoterSummary
                totalVoteCount={zoneStats.votesTotal}
                totalVotePercentage={votePercentage}
              />
            </div>

            <div css={{ borderBottom: "1px solid" }}>
              <NationwideSubSummaryHeader
                label="บัตรดี"
                stat={zoneStats.goodVotes}
                idx={0}
              />
              <NationwideSubSummaryHeader
                label="บัตรเสีย"
                stat={zoneStats.badVotes}
                idx={1}
              />
            </div>
          </div>
          <ZoneCandidateList
            provinceId={provinceId}
            zoneNo={zoneNo}
            goodVotes={zoneStats.goodVotes}
          />
        </div>
      </div>
    </div>
  )
}

function ZoneCandidateList({ provinceId, zoneNo, goodVotes }) {
  const dataState = usePerZoneData(provinceId, zoneNo)
  if (!dataState.completed) {
    return <Loading />
  }
  const data = dataState.data
  if (!data) {
    return (
      <Placeholder height={150}>
        No information for province {provinceId} zone {zoneNo}
      </Placeholder>
    )
  }
  return (
    <ul css={{ listStyle: "none", margin: 0, marginTop: 10, padding: 0 }}>
      {data.candidates.map((candidate, index) => {
        const party = getPartyById(candidate.partyId)
        const percentage = Math.round((candidate.score / goodVotes) * 100)

        return (
          <li key={candidate.no}>
            <CandidateStatsRow
              candidateName={`${candidate.firstName} ${candidate.lastName}`}
              candidateNumber={candidate.no}
              partyName={party.name}
              partyColor={party.color}
              rank={index + 1}
              score={candidate.score}
              percentage={percentage}
            />
          </li>
        )
      })}
    </ul>
  )
}
