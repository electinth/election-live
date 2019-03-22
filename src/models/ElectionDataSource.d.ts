declare namespace ElectionDataSource {
  /** ISO-formatted date, e.g. 2019-03-18T17:00:00.000Z */
  type DateString = string

  /**
   * The summary file which contains all necessary data to render these sections.
   *
   * - Nationwide Summary
   * - Filtered Summary
   * - Election Map
   * - Score Bar
   */
  interface SummaryJSON {
    updatedAt: DateString
    zoneWinningCandidateMap: ZoneWinningCandidateMap
    zoneStatsMap: ZoneStatsMap
    partyScoreMap: PartyScoreMap
  }

  /**
   * Information representing the winning candidate for each district.
   */
  interface ZoneWinningCandidateMap {
    [provinceId: string]: {
      [zoneNo: string]: Candidate
    }
  }

  /**
   * Information representing the number of people who voted in each zone.
   *
   * This is required for calculating:
   * - how many people voted (in total, as well as in filtered views)
   * - stats for overview page
   */
  interface ZoneStatsMap {
    [provinceId: string]: {
      [zoneNo: string]: ZoneStats
    }
  }
  interface ZoneStats {
    /** Number of election units */
    units: number
    /** Number of eligible voters */
    eligible: number
    /** Number of voters who voted = (goodVotes + badVotes) = (votesM + votesF) */
    votesTotal: number
    /** Number of men who voted */
    votesM: number
    /** Number of women who voted */
    votesF: number
    /** Number of votes that are valid */
    goodVotes: number
    /** Number of votes that are invalid */
    badVotes: number
    /** Number of "no" votes (also counted as a good vote) */
    noVotes: number

    /** Vote counting progress, between 0–100 */
    progress: number
    /** True if counting finished */
    finished: boolean
  }

  /**
   * The total score each party received, aggregated nationwide.
   *
   * This is required for calculating:
   * - Party list member count for each party. -> Score bar
   */
  interface PartyScoreMap {
    [partyNo: string]: {
      score: number
    }
  }

  /**
   * A file for each province which contains all necessary data to render
   * the Per-Zone Summary.
   *
   * - Per-Zone Summary
   * - Per-Province Summary (if we want to implement one)
   *
   * We use one file for each province, instead of one file for each zone
   * because we want to allow user to switch between zones as quickly as possible.
   */
  interface PerProvinceJSON {
    updatedAt: DateString
    zoneInformationMap: {
      [zoneNo: string]: PerZoneData
    }
  }

  interface PerZoneData {
    candidates: Candidate[]
  }

  interface Candidate {
    /** Candidate number */
    no: number
    /** Score (number of votes) */
    score: number
    /** Party ID */
    partyId: number
    /** นาย/นางสาว/นาง */
    title: string
    /** Candidate’s first name */
    firstName: string
    /** Candidate’s last name */
    lastName: string
  }
}
