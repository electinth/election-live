import { fail } from "assert"

/** @type {IParty[]} */
const parties = require("./parties.json")

/** @type {IProvince[]} */
const provinces = require("./provinces.json")

/** @type {IZone[]} */
const zones = require("./zones.json")

export { parties, provinces, zones }

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
 */
export function getProvinceById(id) {
  id = +id
  return (
    provinces.filter(p => p.id === id)[0] || fail(`Province ID ${id} not found`)
  )
}

/**
 * @param {number} id
 */
export function getPartyById(id) {
  id = +id
  return parties.filter(p => p.id === id)[0] || fail(`Party ID ${id} not found`)
}
