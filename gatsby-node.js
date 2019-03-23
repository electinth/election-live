require = require("esm")(module)

const fs = require("fs")
const path = require("path")
const {
  provinces,
  zones,
  parties,
  partyPath,
  zonePath,
  filters,
  filterPath,
} = require("./src/models/information")

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
        component: path.resolve(`src/pages/index.js`),
        context: {
          zoneView: {
            provinceId: province.id,
            zoneNo: zone.no,
          },
        },
      })
    }
  }

  for (const filterName of Object.keys(filters)) {
    createPage({
      path: filterPath(filterName),
      component: path.resolve(`src/pages/index.js`),
      context: {
        filterName: filterName,
      },
    })
  }
}

exports.onPostBuild = async () => {
  fs.writeFileSync(
    "public/version.info.json",
    JSON.stringify({
      version: require("./package").version,
    })
  )
}
