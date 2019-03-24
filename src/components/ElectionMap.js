import { keyBy, uniq, uniqBy } from "lodash"
import {
  quadtree,
  event as d3Event,
  mouse as d3Mouse,
  zoom as d3Zoom,
} from "d3"
import { SvgChart, helper } from "d3kit"
import { createComponent } from "react-d3kit"
import { parties, zones } from "../models/information"
import { memo } from "react"
import onlyPassThroughPropsWhilePageIsVisible from "./onlyPassThroughPropsWhilePageIsVisible"
import { createSelector } from "reselect"
import { isMobileOrTablet } from "../util/device"
const maps = require("../models/information/_map.json")

const mapLabels = uniqBy(
  maps.labels.map(l => ({ ...l, id: l.lines.map(l => l.text).join(",") })),
  d => d.id
)
const partyLookup = keyBy(parties, p => p.id)
const NO_PARTY = "#aaaaaa"
const HIDDEN_ZONE = "#dddddd"
const uniqueColors = uniq(
  parties.map(p => p.color).concat([NO_PARTY, HIDDEN_ZONE])
)

const EMPTY_LOOKUP = {}

const createDataLookup = createSelector(
  zoneData => zoneData,
  zoneData => (zoneData ? keyBy(zoneData, d => d.id) : EMPTY_LOOKUP)
)

const createZoneLayout = createSelector(
  ({ size }) => size,
  ({ padding }) => padding,
  (size, padding) => {
    const rectSide = size - padding

    const zones = maps.zones.map(z => ({
      x: z.x * size + rectSide / 2,
      y: z.y * size + rectSide / 2,
      data: z,
    }))

    // Add center of the cells to quadtree
    const quadTree = quadtree()
      .x(d => d.x)
      .y(d => d.y)
      .addAll(zones)

    return { zones, quadTree }
  }
)

/**
 * @param {Object} props
 * @param {IMapZone[]} props.data - List of all map zone state
 * @param {function} [props.options.onClick] - Fire when a zone is clicked
 */
class ElectionMap extends SvgChart {
  static getDefaultOptions() {
    return helper.deepExtend(super.getDefaultOptions(), {
      initialWidth: 375,
      initialHeight: 560,
      size: 9,
      padding: 1,
      margin: {
        top: 20,
        bottom: 20,
        left: 20,
        right: 20,
      },
    })
  }

  static getCustomEventNames() {
    return ["zoneClick", "zoneMouseenter", "zoneMousemove", "zoneMouseleave"]
  }

  constructor(element, options) {
    super(element, options)
    this.layers.create({
      center: { zoom: { map: ["label", "glass", "cell"] } },
    })

    this.visualize = this.visualize.bind(this)
    this.on("data", this.visualize)
    this.on("options", this.visualize)
    this.on("resize", () => {
      this.layers
        .get("center")
        .attr(
          "transform",
          `translate(${this.getInnerWidth() / 2},${this.getInnerHeight() / 2})`
        )

      this.layers
        .get("center/zoom/map")
        .attr(
          "transform",
          `translate(${-this.getInnerWidth() / 2},${-this.getInnerHeight() /
            2})`
        )

      this.visualize()
    })

    // set up svg
    this.svg.style("position", "relative")

    const pixelRatio = window.devicePixelRatio || 1
    if (pixelRatio >= 2) {
      this.svg
        .append("defs")
        .selectAll("pattern")
        .data(uniqueColors, c => c)
        .enter()
        .append("pattern")
        .attr("id", c => `dLines-${c.replace("#", "")}`)
        .attr("width", 3)
        .attr("height", 3)
        .attr("patternUnits", "userSpaceOnUse")
        .append("path")
        .attr("transform", "scale(0.75)")
        .attr("d", "M 0,4 l 4,-4 M -1,1 l 2,-2 M 3,5 l 2,-2")
        .attr("stroke", c => c)
        .attr("stroke-width", 1)
        .attr("stroke-linecap", "square")
        .attr("shape-rendering", "auto")
    } else {
      this.svg
        .append("defs")
        .selectAll("pattern")
        .data(uniqueColors, c => c)
        .enter()
        .append("pattern")
        .attr("id", c => `dLines-${c.replace("#", "")}`)
        .attr("width", 4)
        .attr("height", 4)
        .attr("patternUnits", "userSpaceOnUse")
        .append("path")
        .attr("d", "M 0,4 l 4,-4 M -1,1 l 2,-2 M 3,5 l 2,-2")
        .attr("stroke", c => c)
        .attr("stroke-width", 1)
        .attr("stroke-linecap", "square")
        .attr("shape-rendering", "auto")
    }

    const zoomLayer = this.layers.get("center/zoom")

    this.zoom = d3Zoom()
      .scaleExtent([1, 4])
      .on("zoom", function zoomed() {
        zoomLayer.attr("transform", d3Event.transform)
      })

    this.layers
      .get("center")
      .attr(
        "transform",
        `translate(${this.getInnerWidth() / 2},${this.getInnerHeight() / 2})`
      )

    if (isMobileOrTablet()) {
      this.layers.get("center").call(this.zoom)
    }

    this.layers
      .get("center/zoom/map")
      .attr(
        "transform",
        `translate(${-this.getInnerWidth() / 2},${-this.getInnerHeight() / 2})`
      )

    this.glass = this.layers
      .get("center/zoom/map/glass")
      .append("rect")
      .attr("fill", "rgba(0,0,0,0)")
      .attr("width", this.getInnerWidth())
      .attr("height", this.getInnerHeight())

    this.layers
      .get("center/zoom/map")
      .on("mouseleave", () => {
        const zone = this.findNearbyZone()
        this.zoneLayer
          .selectAll("g.zone")
          .style("stroke", d => (d === zone ? "#222" : "none"))

        if (this.prevZone) {
          this.dispatchAs("zoneMouseleave")(this.prevZone, d3Event)
        }
        this.prevZone = null
      })
      .on("mousemove", () => {
        const zone = this.findNearbyZone()
        const { selectedZone } = this.data() || {}
        this.zoneLayer
          .selectAll("g.zone rect")
          .style("stroke", d =>
            d === zone || d.data.id === selectedZone ? "#222" : "none"
          )

        if (zone) {
          if (zone !== this.prevZone) {
            if (this.prevZone) {
              this.dispatchAs("zoneMouseleave")(this.prevZone, d3Event)
            }
            this.dispatchAs("zoneMouseenter")(zone, d3Event)
          } else {
            this.dispatchAs("zoneMousemove")(zone, d3Event)
          }
        } else if (this.prevZone) {
          this.dispatchAs("zoneMouseleave")(this.prevZone, d3Event)
        }
        this.prevZone = zone
      })
      .on("click", () => {
        const zone = this.findNearbyZone()
        if (zone) {
          this.dispatchAs("zoneClick")(zone, d3Event)
        } else {
          this.dispatchAs("zoneClick")(null, d3Event)
        }
      })

    this.zoneLayer = this.layers
      .get("center/zoom/map/cell")
      .attr("stroke", "none")
      .attr("stroke-width", 1)
      .attr("fill", "none")
      .attr("fill-rule", "evenodd")
    // .style("transform", "scale(1)translate(0px, 0px)")
    // .append("g")
    // .style("transform", "scale(1)translate(0px, 0px)")
    // .style("pointer-events", "bounding-box")

    this.layers
      .get("center/zoom/map/label")
      .attr("font-size", "6.4")
      .attr("font-weight", "normal")
      .attr("letter-spacing", "0")

    // hack for testing
    // window.theMap = this;
  }

  visualize() {
    if (!this.hasNonZeroArea()) return
    this.render()
  }

  findNearbyZone() {
    const [x, y] = d3Mouse(this.glass.node())
    return this.quadTree && this.quadTree.find(x, y, 32)
  }

  clearSelectedZone() {
    this.zoneLayer
      .selectAll("g.zone rect")
      .attr("stroke", "none")
      .attr("stroke-width", 1)
  }

  selectZone(zoneId) {
    this.clearSelectedZone()
    this.zoneLayer
      .selectAll("g.zone")
      .filter(d => d.data.id === zoneId)
      .raise()
      .select("rect")
      .attr("stroke", "#222")
      .attr("stroke-width", 2)
  }

  color(d) {
    // for testing
    // const index = Math.round(Math.random()*3)*2
    // const full = Math.random() > 0.5
    // const color = uniqueColors[index];
    // return full ? color : `url(#dLines-${color.replace('#', '')})`

    const match = this.dataLookup[d.id]
    if (match) {
      if (!match.show) return HIDDEN_ZONE
      const party = partyLookup[match.partyId]
      const color = (party && party.color) || NO_PARTY
      return match.complete ? color : `url(#dLines-${color.replace("#", "")})`
    }
    return NO_PARTY
  }

  party(d) {
    const match = this.dataLookup[d.id]
    return match ? match.partyId : "-"
  }

  radius(d) {
    return 0
    // const match = this.dataLookup[d.id]
    // return match && match.complete ? 0 : this.options().size
  }

  opacity(d) {
    return 1
    const match = this.dataLookup[d.id]
    return match && match.complete ? 1 : 0.5
  }

  resetZoom() {
    this.layers.get("center/zoom").attr("transform", "translate(0,0)scale(1)")
  }

  render() {
    this.glass
      .attr("width", this.getInnerWidth())
      .attr("height", this.getInnerHeight())

    this.renderZones()

    const { selectedZone } = this.data()
    if (selectedZone) {
      this.selectZone(selectedZone)
    } else {
      this.clearSelectedZone()
    }

    // // resize to fit window
    // this.fit({
    //   mode: "basic",
    //   width: 375,
    //   height: this.options().height,
    // })
  }

  renderZones() {
    const { size, padding } = this.options()
    const rectSide = size - padding
    const { zones, quadTree } = createZoneLayout(this.options())
    const dataLookup = createDataLookup(this.data().zones)

    // If data is truly immutable, this will make it even more optimized
    // if (this.quadTree === quadTree && this.dataLookup === dataLookup) {
    //   return;
    // }

    this.dataLookup = dataLookup
    this.quadTree = quadTree

    const zoneSelection = this.zoneLayer
      .selectAll("g.zone")
      .data(zones, d => d.data.id)

    const zoneEnter = zoneSelection
      .enter()
      .append("g")
      .classed("zone", true)
      .attr("transform", d => `translate(${d.x},${d.y})`)
      .style("cursor", "pointer")

    zoneEnter
      .append("rect")
      // .attr("data-p", d => this.party(d.data))
      .attr("x", -rectSide / 2)
      .attr("y", -rectSide / 2)
      .attr("width", rectSide)
      .attr("height", rectSide)
      .attr("rx", 2)
    // .attr("vector-effect", "non-scaling-stroke")

    zoneSelection
      .merge(zoneEnter)
      .attr("transform", d => `translate(${d.x},${d.y})`)
      .select("rect")
      .attr("fill", d => this.color(d.data))
    // .attr("opacity", d => this.opacity(d.data))

    zoneSelection.exit().remove()

    const labelSelection = this.layers
      .get("center/zoom/map/label")
      .selectAll("text.label")
      .data(mapLabels, d => d.id)
      .enter()
      .append("text")
      .classed("label", true)
      // .attr("id", d => d.id)
      .style("transform", "translate(0, -10px)")

    labelSelection.exit().remove()

    const spanSelection = labelSelection
      .selectAll("tspan")
      .data(d => d.lines)
      .enter()
      .append("tspan")
      .attr("x", d => d.x * size)
      .attr("y", d => d.y * size)
      .text(d => d.text)

    spanSelection.exit().remove()
  }
}

export const electionMapLoadingData = () => {
  const partylist = []
  while (partylist.length < 150) {
    partylist.push({
      id: `pl-${partylist.length + 1}`,
      partyId: "nope",
      complete: true,
      show: false,
    })
  }
  return [
    ...zones.map((zone, i) => {
      return {
        id: `${zone.provinceId}-${zone.no}`,
        partyId: "nope",
        complete: false,
        show: false,
      }
    }),
    ...partylist,
  ]
}

export default /** @type {React.FunctionComponent<Props>} */ (onlyPassThroughPropsWhilePageIsVisible(
  memo(createComponent(ElectionMap))
))
