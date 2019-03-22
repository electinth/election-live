import React from "react"
import { numberWithCommas } from "../util/format"
import AnimatedNumber from "./AnimatedNumber"
import { LABEL_FONT } from "../styles"

export default function TotalVoterSummary(props) {
  const { totalVoteCount, totalVotePercentage } = props

  return render()

  function render() {
    return (
      <div
        css={{
          textAlign: "left",
          color: "black",
          fontSize: "1.1em",
          borderBottom: "1px solid black",
          paddingBottom: 5,
          paddingTop: 5,
          position: "relative",
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
          <AnimatedNumber value={totalVoteCount} initialValue={0}>
            {count => numberWithCommas(count)}
          </AnimatedNumber>
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
          <AnimatedNumber value={totalVotePercentage} initialValue={0} />%
        </span>
      </div>
    )
  }
}
