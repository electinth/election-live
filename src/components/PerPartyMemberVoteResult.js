import React, { useState, useMemo } from "react"
import { DESKTOP_MIN_WIDTH, media, DISPLAY_FONT } from "../styles"
import { numberWithCommas } from "../util/format"
import { useSummaryData } from "../models/LiveDataSubscription"
import { nationwidePartyStatsFromSummaryJSON } from "../models/PartyStats"
import { partyListCandidates } from "../models/information"
import _ from "lodash"

const defaultTab = "DISTRICT_TAB"

export default function ZonePartyMemberVoteResult({ partyId }) {
  const [state, setState] = useState({
    showingTab: defaultTab,
  })
  const active = { background: "#000", color: "#FFF" }
  const tabHeaderStyle = {
    padding: "15px",
    width: "100%",
    cursor: "pointer",
    border: 0,
    borderBottom: "1px solid #000",
    ["&:hover"]: {
      ...active,
    },
  }

  const eachDistrictStyling =
    state.showingTab === defaultTab ? { ...active } : {}
  const partyListStyling = state.showingTab !== defaultTab ? { ...active } : {}

  /** @type {ElectionDataSource.SummaryJSON} */
  const summaryState = useSummaryData()
  const winningConstituencyCandidates = getWinningConstituencyCandidates(
    summaryState,
    partyId
  )
  const winningPartyListCandidates = getWinningPartyListCandidates(
    summaryState,
    partyId
  )

  const candidatesList =
    state.showingTab === defaultTab ? (
      <ConstitudencyCandidatesList candidates={winningConstituencyCandidates} />
    ) : (
      <PartyListCandidatesList candidates={winningPartyListCandidates} />
    )

  return (
    <div
      css={{
        textAlign: "center",
        [media(DESKTOP_MIN_WIDTH)]: {
          display: "block",
          order: 3,
          margin: "0",
          padding: "16px",
          width: "320px",
        },
      }}
    >
      <h2 css={{ fontFamily: DISPLAY_FONT }}>ประมาณจำนวน ส.ส. ที่ได้</h2>
      <div>
        {/* tab */}
        <div>
          <ul
            css={{
              display: "flex",
              listStyle: "none",
              padding: 0,
              margin: 0,
              width: "100%",
            }}
          >
            <li
              css={{ ...tabHeaderStyle, ...eachDistrictStyling }}
              onClick={() => {
                setState({ showingTab: defaultTab })
              }}
            >
              แบ่งเขต({winningConstituencyCandidates.length})
            </li>
            <li
              css={{ ...tabHeaderStyle, ...partyListStyling }}
              onClick={() => {
                setState({ showingTab: "PARTY_LIST_TAB" })
              }}
            >
              บัญชีรายชื่อ ({winningPartyListCandidates.length})
            </li>
          </ul>
        </div>

        {candidatesList}
      </div>
    </div>
  )
}

function ConstitudencyCandidatesList({ candidates }) {
  if (candidates.length > 0) {
    return (
      <div
        css={{
          textAlign: "left",
          padding: "5px",
          height: "calc(70vh - 200px)",
          overflowX: "hidden",
          overflowY: "auto",
          WebkitOverflowScrolling: "touch",
        }}
      >
        {candidates.map(item => (
          <div
            css={{ display: "flex", position: "relative", marginTop: "15px" }}
          >
            <div css={{ marginLeft: "5px", fontFamily: DISPLAY_FONT }}>
              <div css={{ fontWeight: "bold" }}>
                {item.firstName} {item.lastName}
              </div>
              <div css={{ fontSize: "0.8em" }}>{item.zone}</div>
            </div>
            <div css={{ float: "right", position: "absolute", right: 0 }}>
              <span css={{ fontWeight: "bold" }}>
                {numberWithCommas(item.score)}
              </span>{" "}
              - {Math.round(item.percentage * 100)}%
            </div>
          </div>
        ))}
      </div>
    )
  } else {
    return <p>ไม่พบข้อมูล</p>
  }
}

function PartyListCandidatesList({ candidates }) {
  if (candidates.length > 0) {
    return (
      <div
        css={{
          textAlign: "left",
          padding: "5px",
          height: "calc(70vh - 200px)",
          overflowX: "hidden",
          overflowY: "auto",
          WebkitOverflowScrolling: "touch",
        }}
      >
        {candidates.map(item => (
          <div
            css={{ display: "flex", position: "relative", marginTop: "15px" }}
          >
            <div css={{ marginLeft: "5px", fontFamily: DISPLAY_FONT }}>
              <div css={{ fontWeight: "bold" }}>
                {item.firstName} {item.lastName}
              </div>
              <div css={{ fontSize: "0.8em" }}>{item.zone}</div>
            </div>
            <div css={{ float: "right", position: "absolute", right: 0 }}>
              อันดับที่ <span css={{ fontWeight: "bold" }}>{item.no}</span>
            </div>
          </div>
        ))}
      </div>
    )
  } else {
    return <p>ไม่พบข้อมูล</p>
  }
}

function getWinningConstituencyCandidates(summaryState, partyId) {
  if (!summaryState.completed) {
    return []
  } else {
    const summary = summaryState.data
    let winningCandidates = []

    // For each provinceId...
    for (const provinceId of Object.keys(summary.zoneWinningCandidateMap)) {
      const zoneNoWinningCandidateMap =
        summary.zoneWinningCandidateMap[provinceId]

      // For each zone number...
      for (const zoneNo of Object.keys(zoneNoWinningCandidateMap)) {
        const candidateData = zoneNoWinningCandidateMap[zoneNo]
        const votesTotal = summary.zoneStatsMap[provinceId][zoneNo].votesTotal

        // Add to list only if the candidate matches the partyId
        if (candidateData.partyId == partyId) {
          candidateData["percentage"] = candidateData.score / votesTotal || 0
          winningCandidates.push(candidateData)
        }
      }
    }

    return winningCandidates
  }
}

function getWinningPartyListCandidates(summaryState, partyId) {
  const partyStatsRow = useMemo(() => {
    if (!summaryState.completed) return []
    return _.find(
      nationwidePartyStatsFromSummaryJSON(summaryState.data),
      row => row.party.id === +partyId
    )
  }, [summaryState, partyId])

  if (
    !partyStatsRow ||
    partyStatsRow.partyListSeats <= 0 ||
    !partyListCandidates[partyId]
  )
    return []

  return partyListCandidates[partyId].partyList.slice(
    0,
    partyStatsRow.partyListSeats
  )
}
