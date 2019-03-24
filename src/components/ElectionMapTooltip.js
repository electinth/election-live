import React, { useMemo } from "react"
import { keyBy } from "lodash"
import {
  parties,
  getProvinceById,
  partyColor,
  getPartyById,
  getZoneByProvinceIdAndZoneNo,
} from "../models/information"
import loadingSmall from "../styles/images/loading.gif"
import ZoneMark from "./ZoneMark"
import { useSummaryData } from "../models/LiveDataSubscription"
import { format } from "d3-format"

const partyLookup = keyBy(parties, d => d.id)
const formatInt = format(",d")
const formatPercent = format(".2%")

const FIRST_COLUMN_STYLE = { verticalAlign: "top", paddingTop: 5 }
const LARGE_FONT = { fontSize: "1.1rem" }

export default function ElectionMapTooltip({ positionId, positions }) {
  const memo = useMemo(() => {
    const position = positions.find(p => p.id == positionId)
    const party = partyLookup[position.partyId]
    const matchZone = positionId.match(/^(\d+)-(\d+)$/)
    if (matchZone) {
      return {
        zone: getZoneByProvinceIdAndZoneNo(+matchZone[1], +matchZone[2]),
        province: getProvinceById(matchZone[1]).name,
        party,
        complete: position.complete,
      }
    }
    const matchSeat = positionId.match(/^pl-(\d+)$/)
    if (matchSeat) {
      return {
        seat: {
          no: matchSeat[1],
        },
        party,
        complete: position.complete,
      }
    }
  }, [positionId])

  const summaryState = useSummaryData()
  const { party } = memo

  let markColor = "#ccc"
  if (memo.zone && summaryState.completed) {
    const { zone } = memo
    const summary = summaryState.data.zoneWinningCandidateMap
    const { no, provinceId } = zone
    const candidate = (summary[provinceId] || {})[no]
    markColor = partyColor(getPartyById(candidate.partyId))
  } else if (memo.seat) {
    markColor = party ? party.color : "#ccc"
  }

  return (
    <table>
      <tbody>
        <tr>
          <td css={FIRST_COLUMN_STYLE}>
            <ZoneMark color={markColor} isCompleted={memo.complete} />
          </td>
          <td>
            {memo.zone && (
              <div>
                <div style={LARGE_FONT}>
                  <b>{memo.province}</b> เขต {memo.zone.no}
                </div>
                {summaryState.completed ? (
                  <WinnerInspector
                    summary={summaryState.data}
                    zone={memo.zone}
                  />
                ) : (
                  <img src={loadingSmall} alt="Loading" />
                )}
              </div>
            )}
            {memo.seat && (
              <div>
                <div style={LARGE_FONT}>
                  <b>ส.ส. บัญชีรายชื่อ</b>
                </div>
                <div>อันดับที่ {memo.seat.no}</div>
                <div>{party ? `พรรค${party.name}` : null}</div>
              </div>
            )}
          </td>
        </tr>
      </tbody>
    </table>
  )
}

const PERCENT_STYLE = {
  opacity: 0.5,
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
    const noVotesWin = candidate.score <= stats.noVotes
    const percentage =
      Math.max(candidate.score, stats.noVotes) /
      (stats.goodVotes + stats.noVotes)

    return (
      <div
        style={{
          opacity: noVotesWin ? 0.3 : 1,
        }}
      >
        {noVotesWin ? (
          <div>NO VOTE</div>
        ) : (
          <React.Fragment>
            <div>
              {candidate.title}
              {candidate.firstName} {candidate.lastName}
            </div>
            <div>พรรค{party.name}</div>
          </React.Fragment>
        )}
        <div style={PERCENT_STYLE}>
          {formatInt(candidate.score)} ({formatPercent(percentage)})
        </div>
        <svg width="120" height="5">
          <rect width={120} height="5" fill="#ccc" />
          <rect
            width={Math.round(percentage * 120)}
            height="5"
            fill={partyColor(party)}
          />
        </svg>
      </div>
    )
  }
}
