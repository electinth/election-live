import React from "react"

/**
 * @param {object} props
 * @param {string} props.componentName - Name of the component that’s unimplemented
 * @param {number} [props.height] - Height of the component
 */
export default function Unimplemented({ componentName, height }) {
  return (
    <div
      css={{
        boxSizing: "border-box",
        border: "2px solid #999",
        background: "#ddd",
        color: "#080",
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        fontFamily: "Menlo, Consolas, monospace",
        height: height,
      }}
    >
      <div
        css={{
          position: "absolute",
          background: "white",
          top: 0,
          right: "-100%",
          bottom: 0,
          left: "-100%",
          transform: "rotate(-30deg)",
        }}
      />
      <div css={{ position: "relative" }}>{`<${componentName} />`}</div>
    </div>
  )
}
