import React from "react"
import { BODY_FONT } from "../styles"
export default function MobileVoteCounter(props) {
  const { percentage } = props
  return (
    <div
      css={{
        fontFamily: BODY_FONT,
        textAlign: "center",
        color: "white",
        margin: "auto",
        marginTop: "0",
        marginRight: "0",
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
        {percentage}%
      </div>
    </div>
  )
}
