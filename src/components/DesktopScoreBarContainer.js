import React from "react"
import _ from "lodash"
import DesktopScoreBar from "./DesktopScoreBar"
import { partyStatsFromSummaryJSON } from "../models/PartyStats"
import { useSummaryData } from "../models/LiveDataSubscription"

export default function DesktopScoreBarContainer() {
  const summaryState = useSummaryData()
  if (!summaryState.completed) return null

  const summary = summaryState.data
  const partyStats = partyStatsFromSummaryJSON(summary)
  const data = _.chain(partyStats)
    .flatMap(row => /** @type {import('./DesktopScoreBar').Row[]} */ ([
      {
        id: `${row.party.id}d`,
        type: "district",
        name: row.party.name,
        color: row.party.color,
        count: row.constituencySeats,
      },
      {
        id: `${row.party.id}p`,
        type: "partylist",
        name: row.party.name,
        color: row.party.color,
        count: row.partyListSeats,
      },
    ]))
    .value()
  return <DesktopScoreBar data={data} />
}
