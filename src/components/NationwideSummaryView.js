import React from "react"

/** @typedef {{ loading: boolean, data?: NationwideSummary }} Props */

// @ts-check

export const NationwideSummaryView = /** @type {React.SFC<Props>} */ (props => {
  const renderContents = () => {
    if (props.loading) {
      // @todo #1 Design and implement a loading state
      return "..."
    } else {
      const data = props.data
      const percentage = Math.round(
        (data.totalVoteCount / data.eligibleVoterCount) * 100
      )
      return (
        <div>
          <p>เขตทั้งหมด {data.totalZoneCount} เขต</p>
          <p>นับเสร็จแล้ว {data.completedZoneCount} เขต</p>
          <p>
            มีผู้มาใช้สิทธิ์ {data.totalVoteCount} คน ({percentage}%)
          </p>
        </div>
      )
    }
  }

  return (
    <div>
      <h1>ทั่วประเทศ</h1>
      {renderContents()}
    </div>
  )
})
