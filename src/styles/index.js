import "./global.css"
import React from "react"
import { Global } from "@emotion/core"

export function GlobalStyle() {
  return (
    <Global
      styles={{
        body: {
          background: "#fff",
          fontFamily: "Noto Sans, Noto Sans Thai, Bai Jamjuree, sans-serif",
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
