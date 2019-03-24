/* eslint-disable no-magic-numbers */
import { transition as d3Transition } from "d3"
import { scaleBand, scaleLinear } from "d3-scale"
import { SvgChart, helper } from "d3kit"
import _ from "lodash"
import { TOTAL_REPRESENTATIVE } from "../models/rules"
import { createComponent } from "react-d3kit"
import onlyPassThroughPropsWhilePageIsVisible from "./onlyPassThroughPropsWhilePageIsVisible"

const partyTable = require("../models/information/_parties.json")
const partyNameShort = _.zipObject(
  partyTable.map(p => p.id),
  partyTable.map(p => p.codeTH)
)

const BAR_SEAT_THRESHOLD = 30
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

  nameText(party) {
    if (party.id >= 999) {
      return party.name
    }
    return partyNameShort[party.id]
  }

  titleText(party) {
    return party.name
  }

  scoreText(party, x) {
    if (!this.isParty(party)) {
      const data = this.data()
      const theRest = this.options().maxValue - _.sumBy(data, "count")
      const width = x(party.count)
      if (width > 85) return `เหลือ ${theRest} ที่นั่ง`
      if (width > 60) return `เหลือ ${theRest}`
    }
    return party.count
  }

  profileByParty(party) {
    if (party.id === 1000) {
      // See DesktopScoreBarContainer
      return require("../styles/images/pmcan/83-s.png")
    } else if (party.id === 1002) {
      return require("../styles/images/pmcan/109-s.png")
    }

    try {
      return require(`../styles/images/pmcan/${party.id}-s.png`)
    } catch (err) {
      return
    }
  }

  onClick(x, height) {
    return party => {
      if (typeof this.options().onClick === "function") {
        const bound = this.svg.node().getBoundingClientRect()
        const data = {
          party,
          width: bound.width,
          height: bound.height,
          page: {
            x: bound.x + x(party.start),
            y: bound.y + height,
          },
          position: {
            x: x(party.start),
            y: height,
          },
        }
        this.options().onClick(data)
      }
    }
  }

  onTooltipOpen(x, height) {
    return party => {
      // console.log("mouse enter bar :", d)
      if (typeof this.options().onTooltipOpen === "function") {
        const bound = this.svg.node().getBoundingClientRect()
        const data = {
          party,
          width: bound.width,
          height: bound.height,
          page: {
            x: bound.x + x(party.start),
            y: bound.y + height + 13,
          },
          position: {
            x: x(party.start),
            y: height + 13,
          },
        }
        this.options().onTooltipOpen(data)
      }
    }
  }

  onTooltipClose(x, height) {
    return party => {
      // console.log("mouse enter bar :", d)
      if (typeof this.options().onTooltipClose === "function") {
        this.options().onTooltipClose()
      }
    }
  }

  renderScore() {
    let cumulative = 0
    let inputParties = this.data()
    // prepare dimension and scales
    const margin = this.options().margin
    const width = this.getInnerWidth()
    const height = this.options().height - margin.top - margin.bottom

    // create hash patterns for party list rep.
    const patterns = this.svg
      .select("defs")
      .selectAll("pattern")
      .data(inputParties, d => d.id)

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
    const partyCount = _.mapValues(_.groupBy(inputParties, "name"), groups =>
      _.sumBy(groups, "count")
    )
    inputParties = _.orderBy(inputParties, [p => partyCount[p.name]], ["desc"])

    // bundle small parties
    let bundledParty = null
    const totalSeatCount = this.options().maxValue
    // how many pixels width per 1 seat
    const pixelSeat = width / totalSeatCount
    const seatThreshold = Math.floor(BAR_SEAT_THRESHOLD / pixelSeat)
    let bundleIndex = -1
    inputParties.forEach((party, i) => {
      if (bundleIndex === -1 && party.count < seatThreshold) {
        bundleIndex = i
      }
    })
    if (bundleIndex >= 0) {
      const bundledPartyList = inputParties.slice(bundleIndex)
      const bundledCount = _.sumBy(bundledPartyList, "count")
      bundledParty = {
        color: "#aaaaaa",
        count: bundledCount,
        id: 999,
        name: "อื่นๆ",
        type: inputParties[0].type,
        bundle: {
          data: bundledPartyList,
          party: bundledPartyList.length,
          count: bundledCount,
        },
      }
    }

    let parties
    if (bundleIndex >= 0) {
      parties = _.compact([...inputParties.slice(0, bundleIndex), bundledParty])
    } else {
      parties = inputParties
    }
    parties = parties.map(p => {
      const p2 = { ...p, start: cumulative }
      cumulative += p.count
      return p2
    })

    // the rest
    const totalCount = _.sum(_.values(partyCount))
    const theRestParty = {
      id: 0,
      name: "ยังไม่ทราบผล",
      color: "#eeeeee",
      type: "none",
      count: this.options().maxValue - totalCount,
      start: totalCount,
    }
    parties.push(theRestParty)

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
      .on("click", this.onClick(x, height))
      .on("mouseenter", this.onTooltipOpen(x, height).bind(this))
      .on("mouseleave", this.onTooltipClose(x, height).bind(this))
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
      .data(parties.filter(p => x(p.count) > 30), d => d.id)
    const sEnter = score
      .enter()
      .append("text")
      .classed("score", true)
      .text(d => this.scoreText(d, x))
      .attr("font-size", "14px")
      .attr("font-weight", "bold")
      .attr("x", d =>
        this.isParty(d) ? x(d.start) + 10 : x(d.start) + x(d.count)
      )
      .attr("y", d => height - 10)
      .style("fill", d => (this.isParty(d) ? "#ffffff" : "#999999"))
      .style("text-anchor", d => (this.isParty(d) ? "start" : "end"))
      .on("click", this.onClick(x, height))
      .on("mouseenter", this.onTooltipOpen(x, height).bind(this))
      .on("mouseleave", this.onTooltipClose(x, height).bind(this))
    score
      .merge(sEnter)
      .transition(t)
      .text(d => this.scoreText(d, x))
      .attr("x", d =>
        this.isParty(d) ? x(d.start) + 10 : x(d.start) + x(d.count) - 10
      )
      .attr("y", d => height - 10)
    score.exit().remove()

    // update text
    const text = this.layers
      .get("label")
      .selectAll("text.name")
      .data(parties.filter(p => this.isParty(p) && x(p.count) >= 30), d => d.id)
    const tEnter = text
      .enter()
      .append("text")
      .classed("name", true)
      .text(d => this.nameText(d))
      .attr("font-size", "12px")
      .attr("x", d => x(d.start))
      .attr("y", d => height + 13)
      .style("fill", "white")
    tEnter.append("title").text(d => this.titleText(d))

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
      .data(parties.filter(p => this.isParty(p) && x(p.count) > 70), d => d.id)
    const iEnter = image
      .enter()
      .append("image")
      .classed("profile", true)
      .attr("x", d =>
        this.isParty(d) ? x(d.start) + 32 : x(d.start) + x(d.count) - 10
      )
      .attr("y", d => height - 30)
      .attr("width", 30)
      .attr("height", 30)
      .attr("xlink:href", (d, i) => this.profileByParty(d))
      .style("display", d => {
        return x(d.count) > 40
      })
      .on("click", this.onClick(x, height))
      .on("mouseenter", this.onTooltipOpen(x, height).bind(this))
      .on("mouseleave", this.onTooltipClose(x, height).bind(this))
    image
      .merge(iEnter)
      .transition(t)
      .attr("x", d =>
        this.isParty(d) ? x(d.start) + 32 : x(d.start) + x(d.count) - 10
      )
      .attr("y", d => height - 30)
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

export default /** @type {React.FunctionComponent<Props>} */ (onlyPassThroughPropsWhilePageIsVisible(
  createComponent(DesktopScoreBar)
))
