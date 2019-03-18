// @ts-check

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
  // @todo #18 Implement filtering code for Swing District
  swing: {
    name: {
      th: "Swing District",
      en: "Swing District",
    },
    criterion: (province, zone) => false,
  },
}
