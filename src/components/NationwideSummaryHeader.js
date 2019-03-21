import React from "react"
import { DISPLAY_FONT, labelColor } from "../styles"

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
      <div css={{ textAlign: "center" }}>
        <h1 css={{ fontFamily: DISPLAY_FONT, borderBottom: "1px solid" }}>
          {title}
        </h1>
        <div css={{ borderBottom: "1px solid", paddingBottom: 10 }}>
          {buildNationwideSubSummaryHeader("เขตทั้งหมด", totalZoneCount, 0)}
          {buildNationwideSubSummaryHeader(
            "นับเสร็จแล้ว",
            completedZoneCount,
            1
          )}
        </div>
        <p
          css={{
            textAlign: "left",
            color: labelColor,
            fontSize: "1.1em",
            borderBottom: "1px solid black",
            paddingBottom: 10,
          }}
        >
          มีผู้มาใช้สิทธิ์
          <span
            css={{
              fontSize: "1.5rem",
              fontFamily: DISPLAY_FONT,
              marginLeft: 30,
              marginRight: 10,
              color: "black",
            }}
          >
            {totalVoteCount}
          </span>
          คน
          <span
            css={{
              fontSize: "1.5rem",
              fontFamily: DISPLAY_FONT,
              position: "absolute",
              right: 0,
              color: "black",
            }}
          >
            {percentage}%
          </span>
        </p>
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
            paddingRight: idx == 0 ? "0.5rem" : 0,
            paddingLeft: idx == 1 ? "0.5rem" : 0,
            borderRight: idx == 0 ? "1px solid black" : "none",
          }}
        >
          <span
            css={{
              fontSize: "1.1em",
              color: labelColor,
              float: "left",
              marginTop: ".5em",
            }}
          >
            {" "}
            {label}
          </span>
          <span
            css={{
              fontFamily: DISPLAY_FONT,
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
