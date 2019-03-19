import "./global.css"
import React from "react"
import { Global } from "@emotion/core"

export const BODY_FONT = "Noto Sans, Noto Sans Thai, Bai Jamjuree, sans-serif"
export const DISPLAY_FONT = "Libre Baskerville, The Matter, serif"

export function GlobalStyle() {
  return (
    <Global
      styles={{
        body: {
          background: "#fff",
          fontFamily: BODY_FONT,
          color: "#212121",
          fontSize: "14px",
          lineHeight: "1.5",
        },
        a: {
          /**
           * @todo #1 Add default link style
           *  - Maybe make it a different color and remove the underline.
           *  - Make sure it is keyboard accessible.
           */
        },
      }}
    />
  )
}
