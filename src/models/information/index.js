import { fail } from "assert"

/**
 * This file represents the static information about Thailand General Election 2019
 * such as available parties, election zones, etc.
 */

/** @type {IParty[]} */
export const parties = require("./_parties.json")

/** @type {IPartyInformation[]} */
export const partyInfomation = require("./_party-information.json")

/** @type {IProvince[]} */
export const provinces = require("./_provinces.json")

/** @type {IZone[]} */
export const zones = require("./_zones.json")

/** @type {IPartyListCandidate[]} */
export const partyListCandidates = require("./_party-list-candidates.json")

export * from "./_filters"

export const contributors = require("./_contributors.json")

/**
 * @param {IParty} party
 */
export function partyPath(party) {
  return `/party/${party.name}`
}

/**
 * @param {IZone} zone
 */
export function zonePath(zone) {
  return `${provincePath(getProvinceById(zone.provinceId))}/zone/${zone.no}`
}

/**
 * @param {IProvince} province
 */
function provincePath(province) {
  return `/province/${province.code.toLowerCase()}`
}

const provincesMap = new Map(provinces.map(province => [province.id, province]))

/**
 * @param {number} id
 * @returns {IProvince}
 */
export function getProvinceById(id) {
  id = +id

  return provincesMap.get(id) || fail(`Province ID ${id} not found`)
}

const zoneMap = new Map(
  zones.map(zone => [zoneKey(zone.provinceId, zone.no), zone])
)

export const zonesForSearch = zones.map(zone => {
  return {
    inclusionAreas: zone.details.replace(/(\(ยกเว้น.+\)?)/g, ""),
    zone: getZoneByProvinceIdAndZoneNo(zone.provinceId, zone.no),
    province: getProvinceById(zone.provinceId),
    zoneKey: zoneKey(zone.provinceId, zone.no),
    postcode: zone.postcode,
  }
})

/**
 * @param {number} provinceId
 * @param {number} zoneNo
 * @returns {IZone}
 */
export function getZoneByProvinceIdAndZoneNo(provinceId, zoneNo) {
  provinceId = +provinceId
  zoneNo = +zoneNo

  return zoneMap.get(zoneKey(provinceId, zoneNo))
}

/**
 * @param {number} provinceId
 * @param {number} zoneNo
 */
function zoneKey(provinceId, zoneNo) {
  return provinceId + ":" + zoneNo
}

const partiesMap = new Map(parties.map(party => [party.id, party]))

export const partyLogo = x =>
  `//elect.in.th/candidates/statics/party-logos/${x}.png`

/**
 * @param {number} id
 * @returns {IParty}
 */
export function getPartyById(id) {
  id = +id
  if (id === 0) {
    return {
      name: "ไม่เลือกใคร",
      color: "#9e9e9e",
    }
  } else if (id === 1000) {
    // used in DesktopScoreBarContainer
    return {
      name: "สนับสนุน คสช",
      color: "#37833a",
    }
  } else if (id === 1001) {
    return {
      name: "ไม่สนับสนุน คสช",
      color: "#c8991e",
    }
  } else if (id === 1002) {
    return {
      name: "ไม่ชัดเจน",
      color: "#979797",
    }
  }
  return partiesMap.get(id) || fail(`Party ID ${id} not found`)
}

/**
 * @param {IParty} party
 */
export function partyColor(party) {
  return party.color || "#000000"
}
