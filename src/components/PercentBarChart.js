import React from "react"
import { format } from "d3-format"

const formatPercent = format(".3%")

export default function PercentBarChart({
  width = "100%",
  height = 5,
  percent,
  color,
}) {
  return (
    <svg width={width} height={height}>
      <rect width="100%" height={height} fill="#ddd" />
      <rect width={formatPercent(percent)} height={height} fill={color} />
    </svg>
  )
}
