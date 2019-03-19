import React from "react"
import { media, WIDE_NAV_MIN_WIDTH } from "../styles"

export default function ContentWrapper({ children, maxWidth = 1200 }) {
  return (
    <div
      css={{
        padding: "0 16px",
        boxSizing: "border-box",
        maxWidth: maxWidth,
        margin: "0 auto",
        [media(WIDE_NAV_MIN_WIDTH)]: { padding: "0 24px" },
      }}
    >
      {children}
    </div>
  )
}
