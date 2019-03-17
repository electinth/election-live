interface IParty {
  id: number
  name: string
  codeTH: string
  codeEN: string
}

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

interface IZone {
  provinceId: number
  no: number
  units: number
  details: string
  eligible: number
}
