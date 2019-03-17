import React from "react"
import { PartyStatsRow } from "./PartyStatsRow"
import { CandidateStatsRow } from "./CandidateStatsRow"

export function KitchenSink() {
  return (
    <section>
      <h1>Kitchen Sink</h1>
      <h2>PartyStatsRow</h2>
      <Example maxWidth={375}>
        <PartyStatsRow />
      </Example>
      <h2>CandidateStatsRow</h2>
      <Example maxWidth={375}>
        <CandidateStatsRow />
      </Example>
    </section>
  )
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
