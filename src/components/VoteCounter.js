import React from "react"
import { Responsive, media, WIDE_NAV_MIN_WIDTH, DISPLAY_FONT } from "../styles"

export default function VoteCounter() {
  return (
    <div
      css={{
        display: "flex",
        justifyContent: "flex-end",
        paddingTop: "2px",
        paddingBottom: "2px",
        color: "#fff",
        fontSize: "11px",
        [media(WIDE_NAV_MIN_WIDTH)]: {
          alignItems: "center",
          height: "76px",
          paddingTop: 0,
          paddingBottom: 0,
        },
      }}
    >
      <div
        css={{
          textAlign: "right",
          [media(WIDE_NAV_MIN_WIDTH)]: {
            display: "none",
          },
        }}
      >
        นับแล้ว
      </div>
      <div
        css={{
          display: "none",
          [media(WIDE_NAV_MIN_WIDTH)]: {
            display: "block",
            textAlign: "right",
            paddingBottom: "4px",
            fontSize: "14px",
          },
        }}
      >
        นับคะแนนแล้ว
      </div>
      <div
        css={{
          textAlign: "right",
          flexBasis: "30px",
          [media(WIDE_NAV_MIN_WIDTH)]: {
            paddingLeft: "10px",
            paddingBottom: "5px",
            fontSize: "30px",
            fontFamily: "The Matter",
          },
        }}
      >
        60%
      </div>
    </div>
  )
}
