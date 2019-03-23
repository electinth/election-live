import React, { useState } from "react"
import { DESKTOP_MIN_WIDTH, media, DISPLAY_FONT } from "../styles"
import { numberWithCommas } from "../util/format"

const mockData = [
  {
    name: "นายประมูล อึ้งไปเลยสิย้ง",
    zone: "ราชบุรี, เขต 3",
    vote: "1234567",
    percentage: "20",
  },
  {
    name: "นายย้ง อึ้งไปเลยสิประมูล",
    zone: "ราชบุรี, เขต 3",
    vote: "672367",
    percentage: "20",
  },
  {
    name: "นายอึ้ง ย้ง",
    zone: "ราชบุรี, เขต 3",
    vote: "345",
    percentage: "20",
  },
  {
    name: "นายย้ง อึ้ง",
    zone: "ราชบุรี, เขต 3",
    vote: "22344",
    percentage: "20",
  },
]

const defaultTab = "EACH_DISTRICT_TAB"

// @todo #1 Party View - binding data to ZonePartyMemberVoteResult
export default function ZonePartyMemberVoteResult({
  data = mockData,
  totalDistrictCandidate = 31,
  totalPartyListCandidate = 13,
}) {
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
      <h2 css={{ fontFamily: DISPLAY_FONT }}>ประมาณจำนวน สส. ที่ได้</h2>
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
                // @todo #1 Party View - result panel - implement showing candidate's vote result when select tab

                setState({ showingTab: defaultTab })
              }}
            >
              แบ่งเขต({totalDistrictCandidate})
            </li>
            <li
              css={{ ...tabHeaderStyle, ...partyListStyling }}
              onClick={() => {
                setState({ showingTab: "PARTY_LIST_TAB" })
              }}
            >
              บัญชีรายชื่อ ({totalPartyListCandidate})
            </li>
          </ul>
        </div>

        {/* list */}
        <div css={{ textAlign: "left", padding: "5px" }}>
          {data.map(item => (
            <div
              css={{ display: "flex", position: "relative", marginTop: "15px" }}
            >
              <img
                src={require(`../styles/images/pmcan/1-s.png`)}
                css={{ width: "30px", height: "30px", borderRadius: "50%" }}
              />
              <div css={{ marginLeft: "5px", fontFamily: DISPLAY_FONT }}>
                <div css={{ fontWeight: "bold" }}>{item.name}</div>
                <div css={{ fontSize: "0.8em" }}>{item.zone}</div>
              </div>
              <div css={{ float: "right", position: "absolute", right: 0 }}>
                <span css={{ fontWeight: "bold" }}>
                  {numberWithCommas(item.vote)}
                </span>{" "}
                - {item.percentage}%
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
