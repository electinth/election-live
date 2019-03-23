import React from "react"
import { DISPLAY_FONT } from "../styles"
export default function DesktopVoteCounter(props) {
  const { totalCount, lastUpdate } = props
  return (
    <div
      css={{
        fontFamily: DISPLAY_FONT,
        textAlign: "center",
        color: "white",
        marginTop: "8px",
        margin: "auto",
      }}
    >
      <div css={{ fontSize: "0.8em" }}>นับคะแนนแล้ว</div>
      <div css={{ fontSize: "2em", fontWeight: "bold", marginTop: "-5px" }}>
        {totalCount}%
      </div>
      <div css={{ fontSize: "0.8em", marginTop: "-5px" }}>
        อัพเดตเมื่อ {lastUpdate}
      </div>
    </div>
  )
}
