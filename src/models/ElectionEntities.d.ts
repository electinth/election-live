// Put data model type definitions here.

/**
 * A political party
 */
interface IParty {
  id: number
  name: string
  codeTH: string
  codeEN: string
  color?: string
  /** Number of party list candidates */
  partylist: number
  supportNcpo?: boolean
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
 * Names of available zone filters
 */
type ZoneFilterName =
  | "all"
  | "northern"
  | "northeastern"
  | "central"
  | "southern"
  | "urban"
  | "rural"
  | "gerrymandering"
  | "swing"


/**
 * An election map state for each zone.
 */
interface IMapZone {
  /** @example "10-1" for Bangkok zone 1 */
  id: number
  /** @example "1" for democrat party */
  partyId: number
  /** is counting completed */
  complete: boolean
  /** set to false if this zone is filtered out */
  show: boolean
}
