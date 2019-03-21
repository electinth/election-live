import "./global.css"
import React, { useLayoutEffect, useState } from "react"
import { Global } from "@emotion/core"

import { library } from "@fortawesome/fontawesome-svg-core"
import { faSearch, faTimes } from "@fortawesome/free-solid-svg-icons"

library.add(faSearch, faTimes)

export const BODY_FONT = "Noto Sans, Noto Sans Thai, Bai Jamjuree, sans-serif"
export const DISPLAY_FONT = "Libre Baskerville, The Matter, serif"

// Note: Do not use `max-width`.
// Instead, go mobile first and use `min-width` to enhance experience for desktop only.
export const DESKTOP_MIN_WIDTH = 1152

/** Breakpoint to display navigation as wide. */
export const WIDE_NAV_MIN_WIDTH = 720

export function media(minWidth) {
  return `@media (min-width: ${minWidth}px)`
}

export const labelColor = "#888888"

export const buttonStyle = {
  cursor: "pointer",
  border: "1px solid #EEEEEE",
  boxShadow: "0 2px 4px 0 rgba(0,0,0,0.12)",
}

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

/**
 * @param {object} props
 * @param {number} props.breakpoint
 *  The breakpoint to switch between `wide` and `narrow`
 * @param {React.ReactNode} props.prerender
 *  Thing to prerender to static HTML
 * @param {React.ReactNode} props.wide
 *  Thing to display when window width ≥ breakpoint
 * @param {React.ReactNode} props.narrow
 *  Thing to display when window width < breakpoint
 */
export function Responsive({
  breakpoint = DESKTOP_MIN_WIDTH,
  wide = null,
  narrow = null,
  prerender = null,
}) {
  const width = useWindowWidth()
  return width == null ? prerender : width >= breakpoint ? wide : narrow
}

function useWindowWidth() {
  const [width, setWidth] = useState(null)
  useLayoutEffect(() => {
    const listener = () => setWidth(window.innerWidth)
    window.addEventListener("resize", listener)
    listener()
    return () => window.removeEventListener("resize", listener)
  }, [])
  return width
}
