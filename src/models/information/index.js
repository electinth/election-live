import { fail } from "assert"

/**
 * This file represents the static information about Thailand General Election 2019
 * such as available parties, election zones, etc.
 */

/** @type {IParty[]} */
export const parties = require("./_parties.json")

/** @type {IProvince[]} */
export const provinces = require("./_provinces.json")

/** @type {IZone[]} */
export const zones = require("./_zones.json")

export * from "./_filters"

/**
 * @param {IParty} party
 */
export function partyPath(party) {
  return `/party/${party.codeEN.toLowerCase()}`
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
 */
export function getProvinceById(id) {
  id = +id

  return provincesMap.get(id) || fail(`Province ID ${id} not found`)
}

const zoneMap = new Map(
  zones.map(zone => [zoneKey(zone.provinceId, zone.no), zone])
)

/**
 * @param {number} provinceId
 * @param {number} zoneNo
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

/**
 * @param {number} id
 */
export function getPartyById(id) {
  id = +id

  return partiesMap.get(id) || fail(`Party ID ${id} not found`)
}

/**
 * @param {IParty} party
 */
export function partyColor(party) {
  return party.color || "#000000"
}
