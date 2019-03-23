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
 * @prop {number} score
 * @prop {number} seatsCeiling
 */

/**
 * @param {ElectionDataSource.ZoneStats} zoneStats
 */
export const isZoneFinished = zoneStats =>
  zoneStats.finished || zoneStats.progress >= 95

/**
 * @param {ElectionDataSource.ZoneStats} zoneStats
 */
export const shouldDisplayZoneData = zoneStats =>
  zoneStats.finished || zoneStats.progress >= 10

/**
 * @param {ElectionDataSource.SummaryJSON} summary
 * @param {IZoneFilter} filter
 * @return {PartyStats}
 */
export function partyStatsFromSummaryJSON(
  summary,
  {
    filter = filters.all,
    fillAllSeats = false,
    expectedVotersCount = 30000000,
  } = {}
) {
  // Calculate the constituency seat count for each party.
  const constituencySeatCount = {}
  const filteredConstituencySeatCount = {}
  let countedVotes = 0
  let allGoodVotes = 0
  for (const provinceIdStr of Object.keys(summary.zoneStatsMap)) {
    const zoneNoStatsMap = summary.zoneStatsMap[provinceIdStr]
    for (const zoneNoStr of Object.keys(zoneNoStatsMap)) {
      const stats = zoneNoStatsMap[zoneNoStr]
      allGoodVotes += stats.goodVotes
      if (!shouldDisplayZoneData(stats) && !fillAllSeats) continue
      countedVotes += stats.goodVotes
    }
  }
  const targetPhantom =
    (1 - countedVotes / Math.max(allGoodVotes, expectedVotersCount)) *
    (150 / 500)
  const totalPartyScore = _.sum(_.values(summary.partyScoreMap))
  const phantomVotes = Math.round(
    totalPartyScore * (targetPhantom / (1 - targetPhantom))
  )

  for (const provinceIdStr of Object.keys(summary.zoneWinningCandidateMap)) {
    const zoneNoWinningCandidateMap =
      summary.zoneWinningCandidateMap[provinceIdStr]
    for (const zoneNoStr of Object.keys(zoneNoWinningCandidateMap)) {
      const candidate = zoneNoWinningCandidateMap[zoneNoStr]
      const zone = getZoneByProvinceIdAndZoneNo(+provinceIdStr, +zoneNoStr)
      const stats = (summary.zoneStatsMap[zone.provinceId] || {})[zone.no]

      // Only counting those with stats
      if (!stats) continue
      if (!shouldDisplayZoneData(stats) && !fillAllSeats) continue

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
  const partyStatsBasis = _(parties)
    .map(party => {
      return {
        id: party.id,
        electedMemberCount: constituencySeatCount[party.id] || 0,
        voteCount: summary.partyScoreMap[party.id] || 0,
        partyListCandidateCount: party.partylist,
      }
    })
    .concat(
      phantomVotes > 0
        ? [
            {
              id: "phantom",
              electedMemberCount: 0,
              voteCount: phantomVotes,
              partyListCandidateCount: 999999,
            },
          ]
        : []
    )
    .value()
  const totalVoteCount = _.sumBy(partyStatsBasis, "voteCount")
  const partyStats = _(partyStatsBasis)
    .thru(calculatePartyList)
    .filter(calculated => calculated.id !== "phantom")
    .map(calculated => {
      const partyId = calculated.id
      const party = getPartyById(partyId)
      return {
        party,
        constituencySeats: filteredConstituencySeatCount[party.id] || 0,
        partyListSeats: calculated.partyListMemberCount,
        score: calculated.voteCount,
        seatsCeiling: (calculated.voteCount / totalVoteCount) * 500,
      }
    })
    .sortBy(row => row.seatsCeiling)
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
