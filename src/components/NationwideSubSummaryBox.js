import React from "react"
import { LABEL_FONT } from "../styles"
import { numberWithCommas } from "../util/format"
import AnimatedNumber from "./AnimatedNumber"

export default function NationWideSubSummaryBox(props) {
  const { label, stat, idx } = props

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
          <AnimatedNumber value={stat} initialValue={0}>
            {count => numberWithCommas(count)}
          </AnimatedNumber>
        </span>
        <div css={{ clear: "both" }} />
      </div>
    </span>
  )
}
