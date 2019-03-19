import React from "react"

/**
 * @param {object} props
 * @param {number} [props.height] - Height of the component
 * @param {boolean} [props.fill] - Fill full height of parent
 */
export default function Placeholder({ children, height, fill }) {
  return (
    <div
      css={{
        boxSizing: "border-box",
        border: "1px dashed #999",
        background: "#ddd",
        color: "#666",
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        height: height,
        ...(fill ? { height: "100%" } : {}),
      }}
    >
      <div>{children}</div>
    </div>
  )
}
