/**
 * Summarizes the number of constituency seats and party list seats of each party.
 * @typedef {PartyStatsRow[]} PartyStats
 */

/**
 * @typedef {object} PartyStatsRow
 * @prop {IParty} party
 * @prop {number} constituencySeats
 * @prop {number} partyListSeats
 */

/**
 * @param {PartyStats} partyStats
 */
export const partyStatsMaxSeats = function(partyStats) {
  return Math.max(...partyStats.map(partyStatsRowTotalSeats))
}

/**
 * @param {PartyStatsRow} partyStatsRow
 */
export const partyStatsRowTotalSeats = function(partyStatsRow) {
  return partyStatsRow.constituencySeats + partyStatsRow.partyListSeats
}
