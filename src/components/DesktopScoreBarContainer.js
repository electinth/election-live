import React, { useState, useEffect } from "react"
import _ from "lodash"
import DesktopScoreBar from "./DesktopScoreBar"
import HelpTooltip from "./HelpTooltip"
import { nationwidePartyStatsFromSummaryJSON } from "../models/PartyStats"
import { useSummaryData } from "../models/LiveDataSubscription"
import { media, WIDE_NAV_MIN_WIDTH } from "../styles"

const barHeight = 76

export default function DesktopScoreBarContainer({
  onTooltipClick = () => {},
  onTooltipOpen = () => {},
  onTooltipClose = () => {},
}) {
  const [pageIndex, setPageIndex] = useState(0)

  const clickPagination = index => () => {
    setPageIndex(index)
  }

  const _onTooltipClick = data => onTooltipClick(data)
  const _onTooltipOpen = data => {
    onTooltipOpen({
      ...data,
      title: pageList[pageIndex].title,
    })
  }

  const wrapperCss = {
    transition: "all .8s cubic-bezier(0.18, 0.89, 0.32, 1.28)",
  }

  const pageList = [
    {
      name: "ประมาณ ส.ส. เขต (350 ที่)",
      title: "ประมาณจำนวน ส.ส. เขต",
      maxCount: 350,
      description:
        "นับจากจำนวน ส.ส. ที่มีคะแนนสูงสุดในแต่ละเขต ณ เวลานั้นๆ โดยที่จะเริ่มแสดงคะแนนหลังจากเขตนั้นได้นับคะแนนไปมากกว่า 10%",
      data: () =>
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
    },
    {
      name: "ประมาณ ส.ส. บัญชีรายชื่อ (150 ที่)",
      title: "ประมาณจำนวน ส.ส. บัญชีรายชื่อ",
      maxCount: 150,
      description:
        "คำนวณจาก 'ค่าประมาณจำนวน ส.ส. พึงมี' หักลบกับ 'ค่าประมาณจำนวน ส.ส. เขต'",
      data: () =>
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
    },
    {
      name: "ประมาณ ส.ส. พึงมี (500 ที่)",
      title: "ประมาณจำนวน ส.ส. พึงมี",
      maxCount: 500,
      description:
        "คำนวณโดยใช้ค่าประมาณจำนวนผู้ที่จะมาใช้สิทธิ์การเลือกตั้งอยู่ที่ 38,564,981 คน (คำนวณจากจำนวนผู้มีสิทธิ์เลือกตั้งในปี 2562 ทั้งหมด 51,419,975 คน และตามสถิติปี 2554 มีผู้มาใช้สิทธิ์ 75.03%)",
      data: () =>
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
    },
    {
      name: "ประมาณ ส.ส. พึงมี ตามจุดยืนพรรค (500 ที่)",
      title: "ประมาณจำนวน ส.ส. พึงมี ตามจุดยืนพรรค",
      maxCount: 500,
      description: "ข้อมูลแยกตามพรรคที่สนับสนุนพรรคพลังประชารัฐ",
      data: () => {
        const SUPPORT_NCPO = 0
        const NOT_SUPPORT_NCPO = 1
        const OTHER = 2

        let out = [
          // index should be following the above value
          {
            id: 1000,
            type: "all",
            name: "สนับสนุน คสช",
            color: "#37833a",
            count: 0,
          },
          {
            id: 1001,
            type: "all",
            name: "ไม่สนับสนุน คสช",
            color: "#c8991e",
            count: 0,
          },
          {
            id: 1002,
            type: "all",
            name: "ไม่ชัดเจน",
            color: "#979797",
            count: 0,
          },
        ]

        for (let row of partyStats) {
          if (row.party.supportNcpo === true) {
            out[SUPPORT_NCPO].count +=
              row.constituencySeats + row.partyListSeats
          } else if (row.party.supportNcpo === false) {
            out[NOT_SUPPORT_NCPO].count +=
              row.constituencySeats + row.partyListSeats
          } else {
            out[OTHER].count += row.constituencySeats + row.partyListSeats
          }
        }

        return out
      },
    },
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setPageIndex(page => (page + 1) % pageList.length)
    }, 10000)
    return () => clearInterval(interval)
  }, [])

  const summaryState = useSummaryData()
  if (!summaryState.completed) return null

  const summary = summaryState.data
  const partyStats = nationwidePartyStatsFromSummaryJSON(summary)

  const data = pageList.map(page => page.data())

  function renderScoreBarBullet() {
    return (
      <div
        css={{
          display: "flex",
          position: "absolute",
          top: 0,
          right: "70px",
          zIndex: 10,
          [media(WIDE_NAV_MIN_WIDTH)]: {
            right: 0,
          },
        }}
      >
        {pageList.map((page, i) => {
          return (
            <div
              css={{
                paddingTop: "8px",
                paddingBottom: "8px",
                marginLeft: "6px",
                cursor: "pointer",
              }}
              style={{
                opacity: pageIndex === i ? 1 : 0.5,
              }}
              onClick={clickPagination(i)}
            >
              <i
                css={{
                  display: "block",
                  width: "8px",
                  height: "4px",
                  background: "#ffffff",
                  [media(WIDE_NAV_MIN_WIDTH)]: {
                    width: "24px",
                  },
                }}
              />
            </div>
          )
        })}
      </div>
    )
  }

  return (
    <div
      css={{
        position: "relative",
      }}
    >
      <div
        css={{
          position: "relative",
          height: barHeight,
          overflow: "hidden",
        }}
        onMouseLeave={onTooltipClose}
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
                options={{
                  maxValue: page.maxCount,
                  onClick: _onTooltipClick,
                  onTooltipOpen: _onTooltipOpen,
                }}
              />
            </div>
          ))}
        </div>
      </div>
      {renderScoreBarBullet()}
    </div>
  )
}
