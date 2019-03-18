// Put data model type definitions here.

/**
 * A political party
 */
interface IParty {
  id: number
  name: string
  codeTH: string
  codeEN: string
}

/**
 * A province
 */
interface IProvince {
  id: number
  /** @example "BKK" */
  code: string
  /** @example "กรุงเทพมหานคร" */
  name: string
  /** Number of zones */
  zone: number
  /** Number of eligible voters */
  eligible: number
  regionId: number
  /** Number of units */
  units: number
}

/**
 * An election zone (electoral area) inside a province.
 */
interface IZone {
  provinceId: number
  no: number
  units: number
  details: string
  eligible: number
}

/**
 * Zone filter criterion
 */
interface IZoneFilter {
  /**
   * Determine if the zone should be included in the result.
   * @param province
   * @param zone
   */
  criterion(province: IProvince, zone: IZone): boolean

  name: {
    th: string
    en: string
  }

  help?: string
}

/**
 * Data summarizing the national election result in terms of how many
 * people from each party ended up in the House of Representatives.
 */
type HouseOfRepresentativesSummary = {
  /** Number from 0-1 representing completion of the counting process. */
  complete: number
  party_scores: HouseOfRepresentativesSummaryRow[]
}
type HouseOfRepresentativesSummaryRow = {
  /** A unique ID for this row. */
  id: string

  /** Party name. */
  name: string

  /** Color representing the party. */
  color: string

  /**
   * Type of this row.
   *
   * - `district`: From election result of each district.
   * - `partylist`: Derived from election result.
   *   See: https://github.com/Cleverse/thailand-party-list-calculator
   * - `other`: Grouped from other fields.
   */
  type: "district" | "partylist" | "other"
}
