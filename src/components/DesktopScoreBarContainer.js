import React, { useState, useEffect } from "react"
import _ from "lodash"
import DesktopScoreBar from "./DesktopScoreBar"
import { partyStatsFromSummaryJSON } from "../models/PartyStats"
import { useSummaryData } from "../models/LiveDataSubscription"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faQuestionCircle } from "@fortawesome/free-solid-svg-icons"
import { Responsive, media, WIDE_NAV_MIN_WIDTH, DISPLAY_FONT } from "../styles"

const barHeight = 76

export default function DesktopScoreBarContainer() {
  const [pageIndex, setPageIndex] = useState(0)
  useEffect(() => {
    const interval = setInterval(() => {
      setPageIndex(page => (page + 1) % 3)
    }, 10000)
    return () => clearInterval(interval)
  }, [])

  const summaryState = useSummaryData()
  if (!summaryState.completed) return null

  const summary = summaryState.data
  const partyStats = partyStatsFromSummaryJSON(summary)

  const data = [
    _.chain(partyStats)
      .flatMap(row => /** @type {import('./DesktopScoreBar').Row[]} */ ([
        {
          id: `${row.party.id}`,
          type: "zone",
          name: row.party.name,
          color: row.party.color,
          count: row.constituencySeats,
        },
      ]))
      .value(),
    _.chain(partyStats)
      .flatMap(row => /** @type {import('./DesktopScoreBar').Row[]} */ ([
        {
          id: `${row.party.id}`,
          type: "partylist",
          name: row.party.name,
          color: row.party.color,
          count: row.partyListSeats,
        },
      ]))
      .value(),
    _.chain(partyStats)
      .flatMap(row => /** @type {import('./DesktopScoreBar').Row[]} */ ([
        {
          id: `${row.party.id}`,
          type: "all",
          name: row.party.name,
          color: row.party.color,
          count: row.constituencySeats + row.partyListSeats,
        },
      ]))
      .value(),
  ]

  const wrapperCss = {
    transition: "all .8s cubic-bezier(0.18, 0.89, 0.32, 1.28)",
  }

  const pageList = [
    { name: "ประมาณจำนวน ส.ส. เขต (350 ที่)", maxCount: 350 },
    { name: "ประมาณจำนวน ส.ส. บัญชีรายชื่อ (150 ที่)", maxCount: 150 },
    { name: "ประมาณจำนวน ส.ส. พึงมี (500 ที่)", maxCount: 500 },
  ]

  return (
    <div
      css={{
        height: barHeight,
        overflow: "hidden",
      }}
    >
      <div
        css={{
          ...wrapperCss,
          transform: `translate(0, -${pageIndex * barHeight}px)`,
        }}
      >
        {pageList.map((page, i) => (
          <div css={{ height: barHeight }}>
            <div
              css={{
                color: "#fff",
                fontSize: "11px",
                paddingTop: "2px",
                paddingBottom: "2px",
                [media(WIDE_NAV_MIN_WIDTH)]: {
                  fontSize: "14px",
                  paddingTop: "1px",
                  paddingBottom: "0",
                },
              }}
            >
              {page.name}
              &nbsp;
              <FontAwesomeIcon icon={faQuestionCircle} />
            </div>
            <DesktopScoreBar
              width="320"
              data={data[i]}
              options={{ maxValue: page.maxCount }}
            />
          </div>
        ))}
      </div>
    </div>
  )
}
