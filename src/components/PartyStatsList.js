import React from "react"
import PartyStatsRow from "./PartyStatsRow"

/**
 * @param {{ partyStats: PartyStats }} props
 */
export default function PartyStatsList(props) {
  const maxSeats = Math.max(
    ...props.partyStats.map(p => p.constituencySeats + p.partyListSeats)
  )
  return (
    <div
      css={{
        overflowY: "scroll",
        height: "500px",
      }}
    >
      {props.partyStats.map(row => (
        <PartyStatsRow
          party={row.party}
          constituencySeats={row.constituencySeats}
          partyListSeats={row.partyListSeats}
          maxSeats={maxSeats}
        />
      ))}
    </div>
  )
}
