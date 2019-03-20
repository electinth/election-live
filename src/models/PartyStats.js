import _ from "lodash"
import { parties, getPartyById } from "./information"
import { calculatePartyList } from "thailand-party-list-calculator"

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
 * @param {ElectionDataSource.SummaryJSON} summary
 */
export function partyStatsFromSummaryJSON(summary) {
  // Calculate the constituency seat count for each party.
  const constituencySeatCount = _(summary.zoneWinningCandidateMap)
    .values()
    .flatMap(z => _.values(z))
    .countBy(c => c.partyId)
    .value()

  // Calculate seat counts for ecah party.
  const partyStats = _(parties)
    .map(party => {
      return {
        id: party.id,
        electedMemberCount: constituencySeatCount[party.id] || 0,
        voteCount: summary.partyScoreMap[party.id] || 0,
        partyListCandidateCount: party.partylist,
      }
    })
    .thru(calculatePartyList)
    .map(calculated => {
      const partyId = calculated.id
      const party = getPartyById(partyId)
      return {
        party,
        constituencySeats: calculated.electedMemberCount,
        partyListSeats: calculated.partyListMemberCount,
      }
    })
    .sortBy(row => row.constituencySeats + row.partyListSeats)
    .reverse()
    .value()
  return partyStats
}

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
