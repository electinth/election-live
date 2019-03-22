import _ from "lodash"
import {
  parties,
  getPartyById,
  getZoneByProvinceIdAndZoneNo,
  checkFilter,
  filters,
} from "./information"
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
 * @param {IZoneFilter} filter
 * @return {PartyStats}
 */
export function partyStatsFromSummaryJSON(
  summary,
  {
    filter = filters.all,
    includeIncomplete = true,
    expectedVotersCount = 30000000,
  } = {}
) {
  // Calculate the constituency seat count for each party.
  const constituencySeatCount = {}
  const filteredConstituencySeatCount = {}
  /**
   * @param {ElectionDataSource.ZoneStats} zoneStats
   */
  const isZoneFinished = zoneStats => zoneStats.finished
  let fakeVotes = expectedVotersCount

  for (const provinceIdStr of Object.keys(summary.zoneStatsMap)) {
    const zoneNoStatsMap = summary.zoneStatsMap[provinceIdStr]
    for (const zoneNoStr of Object.keys(zoneNoStatsMap)) {
      const stats = zoneNoStatsMap[zoneNoStr]
      if (!isZoneFinished(stats) && !includeIncomplete) continue
      fakeVotes -= stats.goodVotes
    }
  }

  for (const provinceIdStr of Object.keys(summary.zoneWinningCandidateMap)) {
    const zoneNoWinningCandidateMap =
      summary.zoneWinningCandidateMap[provinceIdStr]
    for (const zoneNoStr of Object.keys(zoneNoWinningCandidateMap)) {
      const candidate = zoneNoWinningCandidateMap[zoneNoStr]
      const zone = getZoneByProvinceIdAndZoneNo(+provinceIdStr, +zoneNoStr)
      const stats = (summary.zoneStatsMap[zone.provinceId] || {})[zone.no]

      // Only counting those with stats
      if (!stats) continue
      if (!isZoneFinished(stats) && !includeIncomplete) continue

      // No one wins: § 126
      if (stats.noVotes >= candidate.score) continue

      const partyId = candidate.partyId
      constituencySeatCount[partyId] = (constituencySeatCount[partyId] || 0) + 1
      if (checkFilter(filter, zone)) {
        filteredConstituencySeatCount[partyId] =
          (filteredConstituencySeatCount[partyId] || 0) + 1
      }
    }
  }

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
    .concat(
      fakeVotes > 0
        ? [
            {
              id: "phantom",
              electedMemberCount: 0,
              voteCount: fakeVotes,
              partyListCandidateCount: 999999,
            },
          ]
        : []
    )
    .thru(calculatePartyList)
    .filter(calculated => calculated.id !== "phantom")
    .map(calculated => {
      const partyId = calculated.id
      const party = getPartyById(partyId)
      return {
        party,
        constituencySeats: filteredConstituencySeatCount[party.id] || 0,
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
