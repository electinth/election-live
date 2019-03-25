import { navigate } from "gatsby"
import _ from "lodash"
import React, { useContext } from "react"
import CandidateStatsRow from "./CandidateStatsRow"
import CloseButton from "./CloseButton"
import NationwideSubSummaryHeader from "./NationwideSubSummaryBox"
import TotalVoterSummary from "./TotalVoterSummary"
import { ZoneFilterContext } from "./ZoneFilterPanel"
import Arrow from "./Arrow"
import {
  filterPath,
  getProvinceById,
  getZoneByProvinceIdAndZoneNo,
  zonePath,
  getPartyById,
} from "../models/information"
import { useSummaryData, usePerZoneData } from "../models/LiveDataSubscription"
import { DISPLAY_FONT, labelColor } from "../styles"
import Loading from "./Loading"
import Placeholder from "./Placeholder"
import UndesirableState from "./UndesirableState"
import LoadingError from "./LoadingError"
import { MobileTabContext } from "../pages/index"

export default function PerZoneView({ provinceId, zoneNo }) {
  const zone = getZoneByProvinceIdAndZoneNo(provinceId, zoneNo)
  const province = getProvinceById(provinceId)
  const activeFilter = useContext(ZoneFilterContext)
  const summaryState = useSummaryData()
  const mobileTab = useContext(MobileTabContext)

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
          <CloseButton
            onClick={() =>
              navigate(
                filterPath(activeFilter) +
                  (mobileTab === "summary" ? "" : `?tab=${mobileTab}`)
              )
            }
          />
          {renderHeader()}
          <ZoneCandidateList
            key={`${provinceId}:${zoneNo}`}
            provinceId={provinceId}
            zoneNo={zoneNo}
            zoneStats={ifSummaryLoaded(data => data.zoneStats, () => null)}
          />
        </div>
      </div>
    </div>
  )

  function renderHeader() {
    /**
     * @template T
     * @param {(data: { summary: ElectionDataSource.SummaryJSON; zoneStats: ElectionDataSource.ZoneStats }) => T} f
     * @param {() => T} otherwise
     */
    const ifSummaryLoaded = (f, otherwise) =>
      summaryState.completed
        ? f({
            summary: summaryState.data,
            zoneStats: summaryState.data.zoneStatsMap[provinceId][zoneNo],
          })
        : otherwise()

    return (
      <div
        css={{
          textAlign: "center",
          flex: "none",
        }}
      >
        <h1 css={{ fontFamily: DISPLAY_FONT, margin: "0.63em 0 0.1em 0" }}>
          {province.name}
        </h1>
        <h2
          css={{
            fontFamily: DISPLAY_FONT,
            color: labelColor,
            margin: "0.3em 0 0.5em 0",
            position: "relative",
          }}
        >
          <Arrow
            onLeftArrowClick={() => {
              navigate(zonePath({ provinceId, no: zoneNo - 1 || 1 }))
            }}
            onRightArrowClick={() =>
              navigate(
                zonePath({
                  provinceId,
                  no: zoneNo < province.zone ? zoneNo + 1 : province.zone,
                })
              )
            }
            hideLeftArrow={zoneNo === 1}
            hideRightArrow={zoneNo === province.zone}
          >
            เขตเลือกตั้งที่ {zone.no}
          </Arrow>
        </h2>
        <div
          css={{
            marginBottom: 10,
          }}
        >
          {zone.details}
        </div>
        <div>
          <span>นับแล้ว</span>
          <span
            css={{
              marginLeft: 10,
              fontSize: "1.7em",
              fontFamily: DISPLAY_FONT,
            }}
          >
            {ifSummaryLoaded(data => data.zoneStats.progress, () => 0)}%
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
            totalVoteCount={ifSummaryLoaded(
              data => data.zoneStats.votesTotal,
              () => 0
            )}
            totalVotePercentage={ifSummaryLoaded(
              data => {
                const zoneStats = data.zoneStats
                return Math.round(
                  (zoneStats.votesTotal / zoneStats.eligible) * 100
                )
              },
              () => 0
            )}
          />
        </div>

        <div css={{ borderBottom: "1px solid", display: "none" }}>
          <NationwideSubSummaryHeader
            label="บัตรดี"
            stat={ifSummaryLoaded(
              data => data.zoneStats.goodVotes,
              () => (
                <Loading size="small" />
              )
            )}
            idx={0}
          />
          <NationwideSubSummaryHeader
            label="บัตรเสีย"
            stat={ifSummaryLoaded(
              data => data.zoneStats.badVotes,
              () => (
                <Loading size="small" />
              )
            )}
            idx={1}
          />
        </div>
      </div>
    )
  }
}

/**
 * @param {object} props
 * @param {number} props.provinceId
 * @param {number} props.zoneNo
 * @param {ElectionDataSource.ZoneStats} props.zoneStats
 */
function ZoneCandidateList({ provinceId, zoneNo, zoneStats }) {
  const dataState = usePerZoneData(provinceId, zoneNo)
  if (!dataState.completed || !zoneStats) {
    if (dataState.failed) {
      return <LoadingError />
    }
    return <Loading size="large" />
  }
  const data = dataState.data
  if (!data) {
    return (
      <Placeholder height={150}>
        No information for province {provinceId} zone {zoneNo}
      </Placeholder>
    )
  }
  const noVotes = zoneStats.noVotes
  // Add no votes as one of candidates.
  const zoneCandidates = [
    ...data.candidates.slice(),
    {
      firstName: "",
      lastName: "",
      no: "",
      score: noVotes,
      partyId: 0,
    },
  ]
  zoneCandidates.sort(function(a, b) {
    return b.score - a.score
  })
  const goodVotes = _.sumBy(zoneCandidates, "score")
  if (data.candidates.length < 1) {
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
  return (
    <ul css={{ listStyle: "none", margin: 0, marginTop: 10, padding: 0 }}>
      {zoneCandidates.map((candidate, index) => {
        const party = getPartyById(candidate.partyId)
        const percentage = Math.round((candidate.score / goodVotes) * 100) || 0
        const fullName =
          candidate.firstName || candidate.lastName
            ? `${candidate.firstName} ${candidate.lastName}`
            : ""
        return (
          <li key={candidate.no}>
            <CandidateStatsRow
              candidateName={`${fullName}`}
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
