import React from "react"
import { DESKTOP_MIN_WIDTH, media, DISPLAY_FONT } from "../styles"
import _ from "lodash"

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

// @todo #1 Party View - binding data to ZonePartyMemberVoteResult
export default function ZonePartyMemberVoteResult({ data = mockData }) {
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
  return (
    <div
      css={{
        [media(DESKTOP_MIN_WIDTH)]: {
          display: "block",
          order: 3,
          margin: "0",
          padding: "16px",
          width: "320px",
          textAlign: "center",
        },
      }}
    >
      <h2 css={{ fontFamily: DISPLAY_FONT }}>ประมาณจำนวน สส. ที่ได้</h2>
      <div>
        {/* tab */}
        {
          // @todo #1 Party View - implement interactive tab
        }
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
            <li css={{ ...tabHeaderStyle, ...active }}>แบ่งเขต(31)</li>
            <li css={{ ...tabHeaderStyle }}>บัญชีรายชื่อ (13)</li>
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
                  {item.vote.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")}
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
