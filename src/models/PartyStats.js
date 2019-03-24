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
  zoneStats.finished ||
  zoneStats.progress >= 80 ||
  zoneStats.votesTotal >= zoneStats.eligible * 0.8

/**
 * @param {ElectionDataSource.ZoneStats} zoneStats
 */
export const shouldDisplayZoneData = zoneStats =>
  zoneStats.finished ||
  zoneStats.progress >= 1 ||
  zoneStats.votesTotal >= zoneStats.eligible * 0.01

const cache = global.WeakMap && new WeakMap()

/**
 * Like `partyStatsFromSummaryJSON`, but no filter and with caching.
 *
 * @param {ElectionDataSource.SummaryJSON} summary
 * @return {PartyStats}
 */
export function nationwidePartyStatsFromSummaryJSON(summary) {
  if (cache && cache.has(summary)) {
    return cache.get(summary)
  }
  const result = partyStatsFromSummaryJSON(summary)
  if (cache) {
    cache.set(summary, result)
  }
  return result
}

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
    expectedVotersCount = 20000000,
  } = {}
) {
  // Calculate how many phantom votes to generate.
  let totalVotes = 0
  let filteredOutSeats = 0
  for (const provinceIdStr of Object.keys(summary.zoneStatsMap)) {
    const zoneNoStatsMap = summary.zoneStatsMap[provinceIdStr]
    for (const zoneNoStr of Object.keys(zoneNoStatsMap)) {
      const stats = zoneNoStatsMap[zoneNoStr]
      totalVotes += stats.votesTotal
      if (!shouldDisplayZoneData(stats) && !fillAllSeats) {
        filteredOutSeats++
        continue
      }
    }
  }
  const targetPhantom =
    (1 - totalVotes / Math.max(totalVotes, expectedVotersCount)) *
    ((150 + Math.max(0, filteredOutSeats - 1)) / 500)
  const totalPartyScore = _.sum(_.values(summary.partyScoreMap))
  const phantomVotes = Math.round(
    totalPartyScore * (targetPhantom / (1 - targetPhantom))
  )

  // Calculate the constituency seat count for each party.
  const constituencySeatCount = {}
  const filteredConstituencySeatCount = {}
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
      phantomVotes > 0 && !fillAllSeats
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
        partyListSeats: calculated.partyListMemberCount || 0,
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
