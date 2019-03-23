import React from "react"
import { media, WIDE_NAV_MIN_WIDTH } from "../styles"
import DesktopVoteCounter from "./DesktopVoteCounter"
import MobileVoteCounter from "./MobileVoteCounter"

export default function VoteCounter(props) {
  // @todo #1 inject vote count props to this comp for showing total vote %
  // const { totalCount, lastUpdate } = props

  // mock values
  const totalCount = "20"
  const lastUpdate = "23:59"
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
        <MobileVoteCounter totalCount={totalCount} />
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
        <DesktopVoteCounter
          css={{
            width: "15%",
          }}
          totalCount={totalCount}
          lastUpdate={lastUpdate}
        />
      </div>
    </div>
  )
}
