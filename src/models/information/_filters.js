import { getProvinceById } from "."

// @ts-check

// Provinces where vote count difference between 1st and 2nd parties
// is less than 5% (source: Thailand general election 2554)
// @see https://github.com/codeforthailand/election-live/issues/22
const SWING_PROVINCES = [37, 26, 70, 25, 20, 10, 62, 64, 74]

/**
 * Available filters.
 *
 * To add a new filter, please also add a new entry in ZoneFilterName type.
 *
 * @type {{ [filterName in ZoneFilterName]: IZoneFilter }}
 */
export const filters = {
  all: {
    name: {
      th: "ทั่วประเทศ",
      en: "All areas",
    },
    criterion: (province, zone) => true,
  },
  northern: {
    name: {
      th: "ภาคเหนือ",
      en: "Northern region",
    },
    criterion: (province, zone) => province.regionId === 1,
  },
  northeastern: {
    name: {
      th: "ภาคตะวันออกเฉียงเหนือ",
      en: "Northeastern region",
    },
    criterion: (province, zone) => province.regionId === 2,
  },
  central: {
    name: {
      th: "ภาคกลาง",
      en: "Central region",
    },
    criterion: (province, zone) => province.regionId === 3,
  },
  southern: {
    name: {
      th: "ภาคใต้",
      en: "Southern region",
    },
    criterion: (province, zone) => province.regionId === 4,
  },

  // @todo #18 Implement filtering code for เขตพื้นที่ในเมือง
  urban: {
    name: {
      th: "เขตพื้นที่ในเมือง",
      en: "Urban",
    },
    criterion: (province, zone) => false,
  },
  // @todo #18 Implement filtering code for เขตพื้นที่นอกเมือง
  rural: {
    name: {
      th: "เขตพื้นที่นอกเมือง",
      en: "Rural",
    },
    criterion: (province, zone) => false,
  },
  // @todo #18 Implement filtering code for Gerrymandering
  gerrymandering: {
    name: {
      th: "Gerrymandering",
      en: "Gerrymandering",
    },
    criterion: (province, zone) => false,
  },
  swing: {
    name: {
      th: "เขตที่ไม่มีฐานเสียงชัดเจน",
      en: "Swing District",
    },
    criterion: (province, zone) => SWING_PROVINCES.includes(province.id),
  },
}

/**
 * @param {ZoneFilterName} filterName
 */
export function filterPath(filterName) {
  return filterName === "all" ? "/" : `/filters/${filterName}`
}

/**
 * @param {IZoneFilter} filter
 * @param {IZone} zone
 */
export function checkFilter(filter, zone) {
  return filter.criterion(getProvinceById(zone.provinceId), zone)
}
