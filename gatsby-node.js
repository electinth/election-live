require = require("esm")(module)

const path = require("path")
const {
  provinces,
  zones,
  parties,
  partyPath,
  zonePath,
} = require("./src/data/information")

exports.createPages = async ({ actions }) => {
  const { createPage } = actions

  for (const party of parties) {
    createPage({
      path: partyPath(party),
      component: path.resolve(`src/pages/party.js`),
      context: {
        partyId: party.id,
      },
    })
  }

  for (const province of provinces) {
    for (const zone of zones.filter(z => z.provinceId === province.id)) {
      createPage({
        path: zonePath(zone),
        component: path.resolve(`src/pages/party.js`),
        context: {
          provinceId: province.id,
          zoneNo: zone.no,
        },
      })
    }
  }
}
