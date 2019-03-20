import { getPartyById } from "../../models/information/index.js"

export function getMockPartyStatsNationwide() {
  return require("./PartyStatsNationwide.json").map(basePartyStatRow => ({
    ...basePartyStatRow,
    party: getPartyById(basePartyStatRow._partyId),
  }))
}
