import React from "react"
import PartyStatsRow from "./PartyStatsRow"
import { partyStatsMaxSeats } from "../models/PartyStats"

/**
 * @param {{ partyStats: import('../models/PartyStats').PartyStats }} props
 */
export default function PartyStatsList(props) {
  const totalSeats = partyStatsMaxSeats(props.partyStats)
  return (
    <div>
      {props.partyStats.map(row => (
        <PartyStatsRow
          key={`party-stats-row-${row.party.id}`}
          party={row.party}
          constituencySeats={row.constituencySeats}
          partyListSeats={row.partyListSeats}
          maxSeats={totalSeats}
        />
      ))}
    </div>
  )
}
