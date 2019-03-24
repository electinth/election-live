import React from "react"
import { uniqueId } from "lodash"

const STYLE = { display: "inline-block", marginLeft: 4, marginRight: 4 }

export default function ZoneMark({ isCompleted, color }) {
  const id = uniqueId(`dLines-${color.replace("#", "")}`)

  return (
    <svg width="10" height="10" style={STYLE}>
      {!isCompleted && (
        <defs>
          <pattern id={id} width="4" height="4" patternUnits="userSpaceOnUse">
            <path
              d="M 0,4 l 4,-4 M -1,1 l 2,-2 M 3,5 l 2,-2"
              stroke={color}
              stroke-width="1"
              stroke-linecap="square"
              shape-rendering="auto"
            />
          </pattern>
        </defs>
      )}
      <rect
        width="10"
        height="10"
        fill={isCompleted ? color : `url(#${id})`}
        stroke={color}
        rx="2"
      />
    </svg>
  )
}
