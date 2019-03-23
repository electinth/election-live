import React from "react"
import loadingSmall from "../styles/images/loading.gif"
import loadingLarge from "../styles/images/loading-large.gif"
import { keyframes } from "@emotion/core"

const ad = "3s"
/**
 * @param {object} props
 * @param {'small' | 'large'} props.size
 */
export default function Loading({ size = "small" }) {
  if (size === "small") {
    return (
      <div style={{ textAlign: "center" }}>
        <img
          src={size === "large" ? loadingLarge : loadingSmall}
          alt="Loading"
        />
      </div>
    )
  }
  const sp = 19
  const p = (x, y) => ({ position: "absolute", top: y, left: x })
  const bar = {
    width: 3,
    height: 80,
    background: "#FA152C",
    transformOrigin: "top",
  }
  return (
    <div
      css={{ position: "relative", width: 202, height: 202, margin: "0 auto" }}
    >
      <div
        css={{
          ...p(23 + sp * 0, 59),
          ...bar,
          animation: `${a1} ${ad} linear infinite`,
        }}
      />
      <div
        css={{
          ...p(23 + sp * 1, 59),
          ...bar,
          animation: `${a2} ${ad} linear infinite`,
        }}
      />
      <div
        css={{
          ...p(23 + sp * 2, 59),
          ...bar,
          animation: `${a3} ${ad} linear infinite`,
        }}
      />
      <div
        css={{
          ...p(23 + sp * 3, 59),
          ...bar,
          animation: `${a4} ${ad} linear infinite`,
        }}
      />
      <div
        css={{
          ...p(88, 64),
          ...bar,
          height: 103,
          animation: `${a5} ${ad} linear infinite`,
        }}
      />
      <img
        src={require("../styles/images/loading-hand.png")}
        css={{
          ...p(23, 1),
          animation: `${ah} ${ad} linear infinite`,
          width: 114,
        }}
      />
    </div>
  )
}

const t = n => `${(n / 10.5) * 100}%`
const a1 = keyframes({
  [t(0)]: { transform: "scaleY(0)" },
  [t(1)]: { transform: "scaleY(1)" },
})
const a2 = keyframes({
  [t(0)]: { transform: "scaleY(0)" },
  [t(2)]: { transform: "scaleY(0)" },
  [t(3)]: { transform: "scaleY(1)" },
})
const a3 = keyframes({
  [t(0)]: { transform: "scaleY(0)" },
  [t(4)]: { transform: "scaleY(0)" },
  [t(5)]: { transform: "scaleY(1)" },
})
const a4 = keyframes({
  [t(0)]: { transform: "scaleY(0)" },
  [t(6)]: { transform: "scaleY(0)" },
  [t(7)]: { transform: "scaleY(1)" },
})
const a5 = keyframes({
  [t(0)]: { transform: "rotate(45deg) scaleY(0)" },
  [t(8)]: { transform: "rotate(45deg) scaleY(0)" },
  [t(9)]: { transform: "rotate(45deg) scaleY(1)" },
  to: { transform: "rotate(45deg) scaleY(1)" },
})

const ah = keyframes({
  [t(0)]: { transform: "translate(0px, 0px)" },
  [t(1)]: { transform: "translate(0px, 80px)" },
  [t(2)]: { transform: "translate(19px, 0px)" },
  [t(3)]: { transform: "translate(19px, 80px)" },
  [t(4)]: { transform: "translate(38px, 0px)" },
  [t(5)]: { transform: "translate(38px, 80px)" },
  [t(6)]: { transform: "translate(57px, 0px)" },
  [t(7)]: { transform: "translate(57px, 80px)" },
  [t(8)]: { transform: "translate(64px, 13px)" },
  [t(9)]: { transform: "translate(-9px, 76px)" },
  [t(10)]: { transform: "translate(0px, 0px)" },
})
