// @todo #53 [Refactor] Move calculation logic related to partyStats to models/PartyStats.

/**
 * @param {{ partyStats: PartyStats }} props
 */
export const maxSeats = function(partyStats) {
  return Math.max(
    ...partyStats.map(p => p.constituencySeats + p.partyListSeats)
  )
}
