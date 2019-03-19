import React from "react"
import DesktopScoreBar from "./DesktopScoreBar"
import { useHouseOfRepresentativesSummaryState } from "../models/live"

function DesktopScoreBarContainer() {
  const state = useHouseOfRepresentativesSummaryState()
  return <DesktopScoreBar data={state.data.party_scores} />
}

export default DesktopScoreBarContainer
