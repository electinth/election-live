import _ from "lodash"
import { calculatePartyList } from "thailand-party-list-calculator"
import { parties, getPartyById } from "../../models/information"

const summary = /** @type {ElectionDataSource.SummaryJSON} */ (require("../../models/__fixtures__/Summary1.json"))

export function getMockDesktopScoreBarData(_progress) {
  const constituencySeatCount = _(summary.zoneWinningCandidateMap)
    .values()
    .flatMap(z => _.values(z))
    .countBy(c => c.partyId)
    .value()
  return _(parties)
    .flatMap(party => {
      return {
        id: party.id,
        electedMemberCount: constituencySeatCount[party.id] || 0,
        voteCount: summary.partyScoreMap[party.id] || 0,
        partyListCandidateCount: party.partylist,
      }
    })
    .thru(calculatePartyList)
    .flatMap(calculated => {
      const partyId = calculated.id
      const party = getPartyById(partyId)
      const base = { name: party.name, color: party.color }
      return /** @type {import('../DesktopScoreBar').Row[]} */ ([
        {
          ...base,
          id: `${partyId}`,
          type: "zone",
          count: calculated.electedMemberCount,
        },
      ])
    })
    .filter(row => row.count > 0)
    .value()
}
