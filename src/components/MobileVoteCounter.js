import React from "react"
import { DISPLAY_FONT } from "../styles"
export default function MobileVoteCounter(props) {
  const { totalCount } = props
  return (
    <div
      css={{
        fontFamily: DISPLAY_FONT,
        textAlign: "center",
        color: "white",
        marginTop: "8px",
        margin: "auto",
        display: "flex",
      }}
    >
      <div>นับแล้ว</div>
      <div
        css={{
          textAlign: "right",
          paddingLeft: "5px",
        }}
      >
        {totalCount}%
      </div>
    </div>
  )
}
