import React from "react"
import DesktopScoreBar from "./DesktopScoreBar"
import { getMockDesktopScoreBarData } from "./__mocks__/DesktopScoreBarMockData"

export default function DesktopScoreBarContainer() {
  // @todo #1 Replace hardcoded mock data in DesktopScoreBarContainer
  //  with subscription to data model.
  const data = getMockDesktopScoreBarData()
  return <DesktopScoreBar data={data} />
}
