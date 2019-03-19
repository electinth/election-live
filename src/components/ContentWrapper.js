import React from "react"
import { DESKTOP_MEDIA, media, WIDE_NAV_MIN_WIDTH } from "../styles"

export default function ContentWrapper({ children }) {
  return (
    <div
      css={{
        padding: "0 16px",
        boxSizing: "border-box",
        maxWidth: "1200px",
        margin: "0 auto",
        [media(WIDE_NAV_MIN_WIDTH)]: { padding: "0 24px" },
      }}
    >
      {children}
    </div>
  )
}
