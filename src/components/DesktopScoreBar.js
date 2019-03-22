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
 * @prop {number} count Number of seats.
 * @prop {"zone" | "partylist" | "all"} type
 *  Type of this row.
 *
 *  - `zone`: From election result of each district.
 *  - `partylist`: Derived from election result.
 *  - `all`: Derived from election result.
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

    this.layers.create(["score", "label", "profile"])

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

  isParty(party) {
    return party.id > 0
  }

  scoreText(party) {
    if (!this.isParty(party)) {
      const data = this.data()
      const theRest = this.options().maxValue - _.sumBy(data, "count")
      return `เหลือ ${theRest} ที่นั่ง`
    }
    return party.count
  }

  profileByParty(party) {
    return require(`../styles/images/pmcan/${party.id}-s.png`)
  }

  renderScore() {
    let cumulative = 0
    let parties = [...this.data()]

    // create hash patterns for party list rep.
    const patterns = this.svg
      .select("defs")
      .selectAll("pattern")
      .data(parties, d => d.id)

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
      id: 0,
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
    const barSelection = this.layers
      .get("score")
      .selectAll("rect.score")
      .data(parties, d => d.id)
    const bEnter = barSelection
      .enter()
      .append("rect")
      .classed("score", true)
      .attr("x", d => x(d.start))
      .attr("y", 0)
      .attr("width", d => x(d.count))
      .attr("height", height)
      .attr("fill", d => d.color)
      .attr("opacity", 1)
    barSelection
      .merge(bEnter)
      .transition(t)
      .attr("x", d => x(d.start))
      .attr("y", 0)
      .attr("width", d => x(d.count))
      .attr("height", height)
    barSelection.exit().remove()

    // update score
    const score = this.layers
      .get("score")
      .selectAll("text.score")
      .data(parties.filter(p => x(p.count) > 60), d => d.id)
    const sEnter = score
      .enter()
      .append("text")
      .classed("score", true)
      .text(d => this.scoreText(d))
      .attr("font-size", "10px")
      .attr("x", d =>
        this.isParty(d) ? x(d.start) + 40 : x(d.start) + x(d.count) - 10
      )
      .attr("y", d => height - 10)
      .style("fill", d => (this.isParty(d) ? "#ffffff" : "#999999"))
      .style("text-anchor", d => (this.isParty(d) ? "start" : "end"))
    score
      .merge(sEnter)
      .transition(t)
      .attr("x", d =>
        this.isParty(d) ? x(d.start) + 40 : x(d.start) + x(d.count) - 10
      )
      .attr("y", d => height - 10)
    score.exit().remove()

    // update text
    const text = this.layers
      .get("label")
      .selectAll("text.name")
      .data(parties.filter(p => this.isParty(p) && p.count >= 10), d => d.id)
    const tEnter = text
      .enter()
      .append("text")
      .classed("name", true)
      .text(d => d.name)
      .attr("font-size", "12px")
      .attr("x", d => x(d.start))
      .attr("y", d => height + 13)
      .style("fill", "white")
    text
      .merge(tEnter)
      .transition(t)
      .attr("x", d => x(d.start))
      .attr("y", d => height + 13)
    text.exit().remove()

    // update image
    const image = this.layers
      .get("profile")
      .selectAll("image.profile")
      .data(parties.filter(p => this.isParty(p) && p.count >= 10), d => d.id)
    const iEnter = image
      .enter()
      .append("image")
      .classed("profile", true)
      .attr("x", d => x(d.start) + 4)
      .attr("y", d => height - 24)
      .attr("width", 24)
      .attr("height", 24)
      .attr("xlink:href", (d, i) => this.profileByParty(d))
      .style("display", d => {
        return x(d.count) > 40
      })
    image
      .merge(iEnter)
      .transition(t)
      .attr("x", d => x(d.start) + 4)
      .attr("y", d => height - 24)
      .attr("opacity", d => {
        return x(d.count) > 40 ? 1 : 0
      })

    image.exit().remove()

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
