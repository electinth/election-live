import React from "react"

/**
 * @param {object} props
 * @param {string} props.componentName - Name of the component that’s unimplemented
 */
export default function Unimplemented({ componentName: name }) {
  return (
    <div
      css={{
        border: "2px solid #999",
        background: "#ddd",
        color: "#080",
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        fontFamily: "Menlo, Consolas, monospace",
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
      <div css={{ position: "relative" }}>{`<${name} />`}</div>
    </div>
  )
}
