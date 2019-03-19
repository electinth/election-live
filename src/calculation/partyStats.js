/**
 * @param {{ partyStats: PartyStats }} props
 */
export const maxSeats = function(partyStats) {
  return Math.max(
    ...partyStats.map(p => p.constituencySeats + p.partyListSeats)
  )
}
