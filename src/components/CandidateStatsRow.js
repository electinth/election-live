import React from "react"
import { numberWithCommas } from "../util/format"

export default function CandidateStatsRow(props) {
  const { candidate } = props
  return (
    <div css={{ display: "flex", marginBottom: 15 }}>
      <div
        css={{
          background: "black",
          color: "white",
          marginRight: 10,
          width: 30,
          height: 30,
          textAlign: "center",
          borderRadius: "50%",
          lineHeight: "30px",
          flex: "none",
        }}
      >
        {candidate}
      </div>
      <div css={{ width: "100%" }}>
        <div css={{ position: "relative", fontSize: "1.2rem" }}>
          <b>Party Name</b>
          <span css={{ position: "absolute", right: 0, top: 0 }}>
            <b>{numberWithCommas(1233333)}</b> - 80%
          </span>
        </div>
        <div>Mr. candidate {candidate}, เบอร์ x</div>
        <div css={{ height: 5, width: "70%", background: "green" }} />
      </div>
    </div>
  )
}
