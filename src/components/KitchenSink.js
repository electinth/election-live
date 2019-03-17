import React from "react"

export function KitchenSink() {
  return (
    <section>
      <h1>Kitchen Sink</h1>
      <h2>Vote</h2>
      <Example maxWidth={375}>
        <PartyStatsRow />
      </Example>
    </section>
  )
}

function PartyStatsRow() {
  // @todo #1 Implement <PartyStatsRow /> component
  return "..."
}

function Example({ maxWidth, children }) {
  return (
    <div
      css={{
        display: "flex",
        width: "100%",
        maxWidth: maxWidth + 8,
        padding: "4px 0",
        justifyContent: "center",
        background: "#ccc",
        verticalAlign: "top",
      }}
    >
      <div css={{ background: "white", flex: 1, maxWidth: maxWidth }}>
        {children}
      </div>
    </div>
  )
}
