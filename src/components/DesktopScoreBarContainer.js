import React from "react"
import DesktopScoreBar from "./DesktopScoreBar"
import { useRandomScoreBarData } from "./__mocks__/DesktopScoreBarRandomData"

export default function DesktopScoreBarContainer() {
  const data = useRandomScoreBarData()
  return <DesktopScoreBar data={data} />
}
