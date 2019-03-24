import React, { useState, useEffect } from "react"
import _ from "lodash"
import DesktopScoreBar from "./DesktopScoreBar"
import HelpTooltip from "./HelpTooltip"
import { partyStatsFromSummaryJSON } from "../models/PartyStats"
import { useSummaryData } from "../models/LiveDataSubscription"
import { media, WIDE_NAV_MIN_WIDTH } from "../styles"

const barHeight = 76

export default function DesktopScoreBarContainer() {
  const wrapperCss = {
    transition: "all .8s cubic-bezier(0.18, 0.89, 0.32, 1.28)",
  }

  const pageList = [
    {
      name: "ประมาณ ส.ส. เขต (350 ที่)",
      maxCount: 350,
      description:
        "นับจากจำนวน ส.ส. ที่มีคะแนนสูงสุดในแต่ละเขต ณ เวลานั้นๆ โดยที่จะเริ่มแสดงคะแนนหลังจากเขตนั้นได้นับคะแนนไปมากกว่า 10%",
    },
    {
      name: "ประมาณ ส.ส. บัญชีรายชื่อ (150 ที่)",
      maxCount: 150,
      description:
        "คำนวณจาก 'ค่าประมาณจำนวน ส.ส. พึงมี' หักลบกับ 'ค่าประมาณจำนวน ส.ส. เขต'",
    },
    {
      name: "ประมาณ ส.ส. พึงมี (500 ที่)",
      maxCount: 500,
      description:
        "คำนวณโดยใช้ค่าประมาณจำนวนผู้ที่จะมาใช้สิทธิ์การเลือกตั้งอยู่ที่ 38,564,981 คน (คำนวณจากจำนวนผู้มีสิทธิ์เลือกตั้งในปี 2562 ทั้งหมด 51,419,975 คน และตามสถิติปี 2554 มีผู้มาใช้สิทธิ์ 75.03%)",
    },
  ]

  const [pageIndex, setPageIndex] = useState(0)
  useEffect(() => {
    const interval = setInterval(() => {
      setPageIndex(page => (page + 1) % pageList.length)
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
              <span>{page.name}</span>
              <HelpTooltip
                description={page.description}
                dir="bottom right"
                tooltipStyle={{ width: "240px" }}
              />
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
