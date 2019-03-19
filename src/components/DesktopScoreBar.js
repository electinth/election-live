/* eslint-disable no-magic-numbers */
import { transition as d3Transition } from "d3"
import { scaleBand, scaleLinear } from "d3-scale"
import { SvgChart, helper } from "d3kit"
import _ from "lodash"
import { TOTAL_REPRESENTATIVE } from "../models/rules"
import { createComponent } from "react-d3kit"

/**
 * @typedef {object} Props
 * @prop {Row[]} data
 */

/**
 * @typedef {object} Row
 * @prop {string} id A unique ID for this row.
 * @prop {string} name Party name.
 * @prop {string} color Color representing the party.
 * @prop {"district" | "partylist" | "other"} type
 *  Type of this row.
 *
 *  - `district`: From election result of each district.
 *  - `partylist`: Derived from election result.
 *    See: https://github.com/Cleverse/thailand-party-list-calculator
 *  - `other`: Grouped from other fields.
 */

class DesktopScoreBar extends SvgChart {
  static getDefaultOptions() {
    return helper.deepExtend(super.getDefaultOptions(), {
      maxValue: TOTAL_REPRESENTATIVE,
      height: 50,
      margin: {
        top: 0,
        bottom: 20,
        left: 0,
        right: 0,
      },
    })
  }

  static getCustomEventNames() {
    return []
  }

  constructor(element, options) {
    super(element, options)

    this.layers.create(["score", "label"])

    this.visualize = this.visualize.bind(this)
    this.on("data", this.visualize)
    this.on("options", this.visualize)
    this.on("resize", this.visualize)
    this.margin(this.options().margin)

    // defs for patterns
    this.svg.append("defs")
  }

  visualize() {
    if (!this.hasData() || !this.hasNonZeroArea()) return
    this.renderScore()
  }

  renderScore() {
    let cumulative = 0
    let parties = [...this.data()]

    // create hash patterns for party list rep.
    const patterns = this.svg
      .select("defs")
      .selectAll("pattern")
      .data(parties.filter(p => p.type === "district"), d => d.id)
    patterns
      .enter()
      .append("pattern")
      .attr("id", d => "hash-" + d.name)
      .attr("width", "3")
      .attr("height", "3")
      .attr("patternUnits", "userSpaceOnUse")
      .attr("patternTransform", "rotate(60)")
      .append("rect")
      .attr("width", "2")
      .attr("height", "8")
      .attr("transform", "translate(0,0)")
      .attr("fill", d => d.color)

    // sort by most aggregated count of each party
    const partyCount = _.mapValues(_.groupBy(parties, "name"), groups =>
      _.sumBy(groups, "count")
    )
    parties = _.orderBy(parties, [p => partyCount[p.name]], ["desc"]).map(p => {
      const p2 = { ...p, start: cumulative }
      cumulative += p.count
      return p2
    })
    const totalCount = _.sum(_.values(partyCount))
    parties.push({
      id: "none",
      name: "ยังไม่ทราบผล",
      color: "#eeeeee",
      type: "none",
      count: this.options().maxValue - totalCount,
      start: totalCount,
    })

    // prepare dimension and scales
    const margin = this.options().margin
    const width = this.getInnerWidth()
    const height = this.options().height - margin.top - margin.bottom

    const y = scaleBand()
      .rangeRound([0, height])
      .paddingInner(0.05)
      .align(0.1)

    const x = scaleLinear()
      .domain([0, this.options().maxValue])
      .nice()
      .rangeRound([margin.left, width, 0])

    const t = d3Transition().duration(1000)

    // update bar
    const selection = this.layers
      .get("score")
      .selectAll("rect.score")
      .data(parties, d => d.id)

    const sEnter = selection
      .enter()
      .append("rect")
      .classed("score", true)

      .attr("x", d => x(d.start))
      .attr("y", 0)
      .attr("width", d => x(d.count))
      .attr("height", y.bandwidth())
      .attr("fill", d =>
        d.type === "partylist" ? `url(#hash-${d.name})` : d.color
      )
      .attr("opacity", 1)

    selection
      .merge(sEnter)
      .transition(t)
      .attr("x", d => x(d.start))
      .attr("y", 0)
      .attr("width", d => x(d.count))
      .attr("height", y.bandwidth())

    selection.exit().remove()

    // update text
    const text = this.layers
      .get("label")
      .selectAll("text.score")
      .data(
        parties.filter(p => p.type === "district" && p.count >= 10),
        d => d.id
      )

    const tEnter = text
      .enter()
      .append("text")
      .classed("score", true)
      .text(d => d.name)
      .attr("font-size", "10px")
      .attr("x", d => x(d.start))
      .attr("y", d => height + 10)

    text
      .merge(tEnter)
      .transition(t)
      .attr("x", d => x(d.start))
      .attr("y", d => height + 10)

    text.exit().remove()

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
  DesktopScoreBar
))
