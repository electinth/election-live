import React from "react"
import { createComponent } from "react-d3kit"
import RawScoreBar from "./ScoreBar"
import { useHouseOfRepresentativesSummaryState } from "../models/live"

const ScoreBar = createComponent(RawScoreBar)

function GlobalPanel() {
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
      <ScoreBar data={state.data.party_scores} />
    </div>
  )
}

export default GlobalPanel
