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

/**
 * @param {number} id
 * @todo #1 Improve performance of `getProvinceById` to be O(1),
 *  e.g. by pre-generating a map.
 */
export function getProvinceById(id) {
  id = +id
  return (
    provinces.filter(p => p.id === id)[0] || fail(`Province ID ${id} not found`)
  )
}

/**
 * @param {number} id
 * @todo #1 Improve performance of `getPartyById` to be O(1),
 *  e.g. by pre-generating a map.
 */
export function getPartyById(id) {
  id = +id
  return parties.filter(p => p.id === id)[0] || fail(`Party ID ${id} not found`)
}
