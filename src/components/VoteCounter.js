import React from "react"
import { media, WIDE_NAV_MIN_WIDTH } from "../styles"
import DesktopVoteCounter from "./DesktopVoteCounter"
import MobileVoteCounter from "./MobileVoteCounter"
import { Responsive } from "../styles"

export default function VoteCounter({ percentage = 60, lastUpdate = "23:59" }) {
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
      <Responsive
        breakpoint={WIDE_NAV_MIN_WIDTH}
        narrow={<MobileVoteCounter percentage={percentage} />}
        wide={
          <DesktopVoteCounter percentage={percentage} lastUpdate={lastUpdate} />
        }
      />
    </div>
  )
}
