import React from "react"
import { LABEL_FONT } from "../styles"
import { numberWithCommas } from "../util/format"

// @ts-check

/**
 * @param {object} props
 * @param {boolean} props.loading
 * @param {React.ReactNode} props.title
 * @param {number} props.totalZoneCount
 * @param {number} [props.completedZoneCount]
 * @param {number} [props.totalVoteCount]
 * @param {number} [props.eligibleVoterCount]
 */
export default function NationwideSummaryHeader(props) {
  const { title } = props

  if (props.loading) {
    return render(props.totalZoneCount, "...", "...", "0")
  } else {
    const percentage = Math.round(
      (props.totalVoteCount / props.eligibleVoterCount) * 100
    )
    return render(
      props.totalZoneCount,
      props.completedZoneCount,
      props.totalVoteCount,
      percentage
    )
  }

  // @todo #1 Polish design of NationwideSummaryHeader according to the design.
  function render(
    totalZoneCount,
    completedZoneCount,
    totalVoteCount,
    percentage
  ) {
    return (
      <div css={{ textAlign: "center", marginBottom: 10 }}>
        <h1
          css={{
            fontFamily: LABEL_FONT,
            borderBottom: "1px solid",
            paddingBottom: 10,
            margin: 0,
          }}
        >
          {title}
        </h1>
        <div css={{ borderBottom: "1px solid", paddingTop: 5 }}>
          {buildNationwideSubSummaryHeader("เขตทั้งหมด", totalZoneCount, 0)}
          {buildNationwideSubSummaryHeader(
            "นับเสร็จแล้ว",
            completedZoneCount,
            1
          )}
        </div>
        <div
          css={{
            textAlign: "left",
            color: "black",
            fontSize: "1.1em",
            borderBottom: "1px solid black",
            paddingBottom: 5,
            paddingTop: 5,
          }}
        >
          มีผู้มาใช้สิทธิ์
          <span
            css={{
              fontSize: "1.5rem",
              fontFamily: LABEL_FONT,
              marginLeft: 30,
              marginRight: 10,
              color: "black",
            }}
          >
            {numberWithCommas(totalVoteCount)}
          </span>
          คน
          <span
            css={{
              fontSize: "1.5rem",
              fontFamily: LABEL_FONT,
              position: "absolute",
              right: 0,
              color: "black",
            }}
          >
            {percentage}%
          </span>
        </div>
      </div>
    )
  }

  function buildNationwideSubSummaryHeader(label, stat, idx) {
    return (
      <span
        css={{
          width: "49%",
          display: "inline-block",
        }}
      >
        <div
          css={{
            paddingRight: idx === 0 ? "0.5rem" : 0,
            paddingLeft: idx === 1 ? "0.5rem" : 0,
            borderRight: idx === 0 ? "1px solid black" : "none",
          }}
        >
          <span
            css={{
              fontSize: "1.1em",
              color: "black",
              float: "left",
              marginTop: ".5em",
            }}
          >
            {" "}
            {label}
          </span>
          <span
            css={{
              fontFamily: LABEL_FONT,
              fontSize: "1.5rem",
              float: "right",
            }}
          >
            {stat}
          </span>
          <div css={{ clear: "both" }} />
        </div>
      </span>
    )
  }
}
