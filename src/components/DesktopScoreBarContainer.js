import React from "react"
import DesktopScoreBar from "./DesktopScoreBar"
import { useHouseOfRepresentativesSummaryState } from "../models/live"

function DesktopScoreBarContainer() {
  const state = useHouseOfRepresentativesSummaryState()
  return (
    <div
      css={{
        margin: "16px",
        marginBottom: "0",
        position: "absolute",
        top: 0,
        height: "60px",
        left: "180px",
        right: 0,
      }}
    >
      <DesktopScoreBar data={state.data.party_scores} />
    </div>
  )
}

export default DesktopScoreBarContainer
