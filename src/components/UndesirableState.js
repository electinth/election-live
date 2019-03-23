import React from "react"
import { DISPLAY_FONT } from "../styles"

export default function UndesirableState({ heading, children }) {
  return (
    <div css={{ color: "black", opacity: 0.38, textAlign: "center" }}>
      <div css={{ font: `24px/40px ${DISPLAY_FONT}` }}>{heading}</div>
      {children}
    </div>
  )
}
