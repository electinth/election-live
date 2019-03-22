import _ from "lodash"
import { select as d3Select, event as d3Event, mouse as d3Mouse } from "d3"
import { transition as d3Transition } from "d3"
import { SvgChart, helper } from "d3kit"
import { createComponent } from "react-d3kit"
import { parties } from "../models/information"

const maps = require("../models/information/_map.json")

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
      onClick: (d, i) => {
        /* no op */
      },
    })
  }

  static getCustomEventNames() {
    return []
  }

  constructor(element, options) {
    super(element, options)
    this.layers.create(["map", "label"])

    this.visualize = this.visualize.bind(this)
    this.on("data", this.visualize)
    this.on("options", this.visualize)
    this.on("resize", this.visualize)
    this.margin(this.options().margin)

    // set up svg
    this.svg.style("position", "relative").on("click", this.mapClick.bind(this))
    this.selection = this.layers
      .get("map")
      .attr("stroke", "none")
      .attr("stroke-width", 1)
      .attr("fill", "none")
      .attr("fill-rule", "evenodd")
      .style("transition", "all .5s ease-in")
      .style("transform", "scale(1)translate(0px, 0px)")
      .append("g")
      .style("transform", "scale(1)translate(0px, 0px)")
      .style("pointer-events", "bounding-box")
  }

  visualize() {
    if (!this.hasNonZeroArea()) return
    this.render()
  }

  color(d, data) {
    const NO_PARTY = "#aaaaaa"
    const HIDDEN_ZONE = "#dddddd"
    const match = _.find(data, ["id", d.id])
    if (match) {
      if (!match.show) return HIDDEN_ZONE
      const party = _.find(parties, ["id", match.partyId])
      return (party && party.color) || NO_PARTY
    }
    return NO_PARTY
  }

  party(d, data) {
    const match = _.find(data, ["id", d.id])
    if (match) {
      return match.partyId
    }
    return "-"
  }

  radius(d, data) {
    const match = _.find(data, ["id", d.id])
    if (match) {
      return match.complete ? this.options().size : 0
    }
    return 0
  }

  closestRect(point) {
    let dmin = Infinity
    let rect
    const size = this.options().size
    maps.zones.forEach(zone => {
      const d = distance2(zone)
      if (d < dmin) {
        dmin = d
        rect = zone
      }
    })
    dmin = Math.sqrt(dmin)
    return dmin < 32 ? rect : null

    function distance2(p) {
      var dx = p.x * size - point[0],
        dy = p.y * size - point[1]
      return dx * dx + dy * dy
    }
  }

  mapClick(d, i) {
    d3Event.stopPropagation()
    let zone
    if (!d) {
      const x = d3Event.offsetX - 30.5
      const y = d3Event.offsetY - 30.5
      zone = this.closestRect([x, y])
    } else {
      zone = _.find(maps.zones, ["id", d.id])
    }

    // clear previous seletion
    this.selection
      .selectAll("rect.zone")
      .style("transform", "translate(0, 0)scale(1)")

    if (zone) {
      const node = document.getElementById(zone.id)
      const size = this.options().size
      const padding = this.options().padding
      const rect = d3Select(node)
      rect.style(
        "transform",
        `translate(${-(zone.x * size) - (size - padding) / 2}px, ${-(
          zone.y * size
        ) -
          (size - padding) / 2}px)scale(2)`
      )
      rect.raise()
    }

    this.options().onClick(d, i)
  }

  render() {
    const data = [...this.data()]
    const size = this.options().size
    const padding = this.options().padding

    const t = d3Transition().duration(1000)

    const zoneSelection = this.selection
      .selectAll("rect.zone")
      .data(maps.zones, d => d.id)
    const zoneEnter = zoneSelection
      .enter()
      .append("rect")
      .classed("zone", true)
      .attr("id", d => d.id)
      .attr("data-p", d => this.party(d, data))
      .attr("x", d => d.x * size)
      .attr("y", d => d.y * size)
      .attr("width", d => size - padding)
      .attr("height", d => size - padding)
      .style("transition", "all .2s ease-out")
      .style("transform", "translate(0, 0)scale(1)")
      .on("click", this.mapClick.bind(this))

    zoneSelection
      .merge(zoneEnter)
      .transition(t)
      .attr("fill", d => this.color(d, data))
      .attr("rx", d => this.radius(d, data))

    zoneSelection.exit().remove()

    const labelSelection = this.layers
      .get("label")
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
