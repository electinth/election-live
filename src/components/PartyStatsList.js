import React from "react"
import PartyStatsRow from "./PartyStatsRow"
import { maxSeats } from "../calculation/partyStats"

/**
 * @param {{ partyStats: PartyStats }} props
 */
export default function PartyStatsList(props) {
  return (
    <div>
      {props.partyStats.map(row => (
        <PartyStatsRow
          key={`party-stats-row-${row.party.id}`}
          party={row.party}
          constituencySeats={row.constituencySeats}
          partyListSeats={row.partyListSeats}
          maxSeats={maxSeats(props.partyStats)}
        />
      ))}
    </div>
  )
}
