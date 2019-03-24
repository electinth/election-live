import { shouldDisplayZoneData } from "./PartyStats"

/**
 * @param {ElectionDataSource.SummaryJSON} summary
 * @param {IZone} zone
 */
export function getSeatDisplayModel(summary, zone) {
  const winningCandidate = (summary.zoneWinningCandidateMap[zone.provinceId] ||
    {})[zone.no]
  const zoneStats = (summary.zoneStatsMap[zone.provinceId] || {})[zone.no]
  const candidate =
    shouldDisplayZoneData(zoneStats) &&
    winningCandidate &&
    winningCandidate.score > zoneStats.noVotes
      ? winningCandidate
      : null
  return { candidate, zoneStats }
}
