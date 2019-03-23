import React, { useMemo } from "react"
import {
  zones,
  parties,
  getProvinceById,
  partyColor,
  getPartyById,
} from "../models/information"
import loadingSmall from "../styles/images/loading.gif"
import { numberWithCommas } from "../util/format"
import { useSummaryData } from "../models/LiveDataSubscription"

export default function ElectionMapTooltip({ positionId, positions }) {
  const memo = useMemo(() => {
    const position = positions.find(p => p.id == positionId)
    const party = parties.find(p => p.id == position.partyId)
    const matchZone = positionId.match(/^(\d+)-(\d+)$/)
    if (matchZone) {
      return {
        zone: zones.find(
          z => z.provinceId == matchZone[1] && z.no == matchZone[2]
        ),
        province: getProvinceById(matchZone[1]).name,
        party: party ? `พรรค${party.name}` : null,
      }
    } else {
      const matchSeat = positionId.match(/^pl-(\d+)$/)
      return {
        seat: {
          no: matchSeat[1],
        },
        party: party ? `พรรค${party.name}` : null,
      }
    }
  }, [positionId])

  const summaryState = useSummaryData()

  return (
    <div>
      {memo.zone && (
        <div>
          <div style={{ fontSize: "1.1rem" }}>
            <b>{memo.province}</b> เขต {memo.zone.no}
          </div>
          {summaryState.completed ? (
            <WinnerInspector summary={summaryState.data} zone={memo.zone} />
          ) : (
            <img src={loadingSmall} alt="Loading" />
          )}
        </div>
      )}
      {memo.seat && (
        <div>
          <div>ส.ส. บัญชีรายชื่ออันดับที่ {memo.seat.no}</div>
          <div>{memo.party}</div>
        </div>
      )}
    </div>
  )
}

function WinnerInspector({ summary, zone }) {
  /** @type {ElectionDataSource.ZoneStats} */
  const stats = (summary.zoneStatsMap[zone.provinceId] || {})[zone.no] || {}
  const winning = (summary.zoneWinningCandidateMap[zone.provinceId] || {})[
    zone.no
  ]
  return <div>{!!winning && renderWinning(winning)}</div>
  /**
   * @param {ElectionDataSource.Candidate} candidate
   */
  function renderWinning(candidate) {
    const party = getPartyById(candidate.partyId)
    const percentage = Math.round(
      (candidate.score / (stats.goodVotes + stats.noVotes)) * 100
    )
    return (
      <div
        style={{
          textDecoration:
            candidate.score <= stats.noVotes ? "line-through" : "none",
          opacity: candidate.score <= stats.noVotes ? 0.3 : 1,
        }}
      >
        <div>
          {candidate.title}
          {candidate.firstName} {candidate.lastName}
        </div>
        <div>พรรค{party.name}</div>
        <div
          style={{
            opacity: 0.5,
          }}
        >
          {numberWithCommas(candidate.score)} - {percentage}%
        </div>
        <div
          style={{
            height: 5,
            width: `${percentage}%`,
            background: partyColor(party),
          }}
        />
      </div>
    )
  }
}
