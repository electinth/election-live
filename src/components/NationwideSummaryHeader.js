import React from "react"

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
      <div>
        <h1>{title}</h1>
        <p>เขตทั้งหมด {totalZoneCount} เขต</p>
        <p>นับเสร็จแล้ว {completedZoneCount} เขต</p>
        <p>
          มีผู้มาใช้สิทธิ์ {totalVoteCount} คน ({percentage}%)
        </p>
      </div>
    )
  }
}
