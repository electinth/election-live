import React from "react"
import { LABEL_FONT } from "../styles"
import NationwideSubSummaryBox from "./NationwideSubSummaryBox"
import TotalVoterSummary from "./TotalVoterSummary"

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
          <NationwideSubSummaryBox
            label="เขตทั้งหมด"
            stat={totalZoneCount}
            idx={0}
          />
          <NationwideSubSummaryBox
            label="นับเสร็จแล้ว"
            stat={totalZoneCount}
            idx={1}
          />
        </div>
        <TotalVoterSummary
          totalVoteCount={totalVoteCount}
          totalVotePercentage={percentage}
        />
      </div>
    )
  }
}
