import { keyBy } from "lodash"
import {
  quadtree,
  select as d3Select,
  event as d3Event,
  mouse as d3Mouse,
  zoom as d3Zoom,
} from "d3"
import { transition as d3Transition } from "d3"
import { SvgChart, helper } from "d3kit"
import { createComponent } from "react-d3kit"
import { parties } from "../models/information"
const maps = require("../models/information/_map.json")

const partyLookup = keyBy(parties, p => p.id)

const NO_PARTY = "#aaaaaa"
const HIDDEN_ZONE = "#dddddd"

// @todo #30 Declare the required props for Election Map.
/**
 * @param {Object} props
 * @param {IProvince[]} props.data - List of all map zone state
 * @param {function} [props.options.onClick] - Fire when a zone is clicked
 */
class ElectionMap extends SvgChart {
  static getDefaultOptions() {
    return helper.deepExtend(super.getDefaultOptions(), {
      height: 560,
      size: 8,
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
      center: { zoom: { map: ["cell", "label", "glass"] } },
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
      .call(this.zoom)

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
      .on("mousemove", () => {
        const zone = this.findNearbyZone()
        if (zone) {
          if (zone !== this.prevZone) {
            this.dispatchAs("zoneMouseenter")(zone, d3Event)
            if (this.prevZone) {
              this.dispatchAs("zoneMouseleave")(this.prevZone, d3Event)
            }
          } else {
            this.dispatchAs("zoneMousemove")(zone, d3Event)
          }
        } else if (this.prevZone) {
          this.dispatchAs("zoneMouseleave")(this.prevZone, d3Event)
        }
        this.prevZone = zone
      })
      .on("click", () => {
        // clear previous seletion
        const allZones = this.selection.selectAll("rect.zone")
        allZones
          .transition()
          .style("transform", "translate(0, 0)scale(1)")
          .style("opacity", 1)
        const zone = this.findNearbyZone()
        if (zone) {
          const { size, padding } = this.options()
          allZones
            .filter(d => d === zone)
            .raise()
            .transition()
            .style("opacity", 0.6)
            .style(
              "transform",
              `translate(${-zone.x - (size - padding) / 2}px, ${-zone.y -
                (size - padding) / 2}px)scale(2)`
            )
          this.dispatchAs("zoneClick")(zone, d3Event)
        }
      })

    this.selection = this.layers
      .get("center/zoom/map/cell")
      .attr("stroke", "none")
      .attr("stroke-width", 1)
      .attr("fill", "none")
      .attr("fill-rule", "evenodd")
      .style("transition", "all .5s ease-in")
      .style("transform", "scale(1)translate(0px, 0px)")
      .append("g")
      .style("transform", "scale(1)translate(0px, 0px)")
      .style("pointer-events", "bounding-box")

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

  color(d) {
    const match = this.dataLookup[d.id]
    if (match) {
      if (!match.show) return HIDDEN_ZONE
      const party = partyLookup[match.partyId]
      return (party && party.color) || NO_PARTY
    }
    return NO_PARTY
  }

  party(d) {
    const match = this.dataLookup[d.id]
    return match ? match.partyId : "-"
  }

  radius(d) {
    const match = this.dataLookup[d.id]
    return match && match.complete ? this.options().size : 0
  }

  resetZoom() {
    this.layers
      .get("center/zoom")
      .transition()
      .attr("transform", "translate(0,0)scale(1)")
  }

  render() {
    this.glass
      .attr("width", this.getInnerWidth())
      .attr("height", this.getInnerHeight())

    this.dataLookup = keyBy(this.data(), d => d.id)
    const { size, padding } = this.options()
    const t = d3Transition().duration(1000)

    const zones = maps.zones.map(z => ({
      x: z.x * size,
      y: z.y * size,
      data: z,
    }))

    const rectSide = size - padding

    // Add center of the cell to quadtree
    this.quadTree = quadtree()
      .x(d => d.x + rectSide / 2)
      .y(d => d.y + rectSide / 2)
      .addAll(zones)

    const zoneSelection = this.selection
      .selectAll("rect.zone")
      .data(zones, d => d.data.id)
    const zoneEnter = zoneSelection
      .enter()
      .append("rect")
      .classed("zone", true)
      .attr("data-p", d => this.party(d.data))
      .attr("x", d => d.x)
      .attr("y", d => d.y)
      .attr("width", rectSide)
      .attr("height", rectSide)
      .style("transition", "all .2s ease-out")
      .style("transform", "translate(0, 0)scale(1)")

    zoneSelection
      .merge(zoneEnter)
      .transition(t)
      .attr("fill", d => this.color(d.data))
      .attr("rx", d => this.radius(d.data))

    zoneSelection.exit().remove()

    const labelSelection = this.layers
      .get("center/zoom/map/label")
      .attr("font-family", "BaiJamjuree-Regular, Bai Jamjuree")
      .attr("font-size", "6.4")
      .attr("font-weight", "normal")
      .attr("letter-spacing", "0")
      .selectAll("text.label")
      .data(maps.labels, d => d.id)
      .enter()
      .append("text")
      .classed("label", true)
      .attr("id", d => d.id)
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

    // resize to fit window
    this.fit(
      {
        mode: "basic",
        width: "100%",
        height: this.options().height,
      },
      true
    )
  }
}

export default /** @type {React.FunctionComponent<Props>} */ (createComponent(
  ElectionMap
))
