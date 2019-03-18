import React from "react"
import PartyStatsRow from "./PartyStatsRow"
import { CandidateStatsRow } from "./CandidateStatsRow"

// @todo #24 implement <PartyStatsList> for <PartyStatsrow /> .

export function KitchenSink() {
  return (
    <section>
      <h1>Kitchen Sink</h1>
      <h2>PartyStatsRow</h2>
      <Example maxWidth={375}>
        <PartyStatsRow partyName="เพื่อเธอ" totalVotes={20} />
      </Example>
      <h2>CandidateStatsRow</h2>
      <Example maxWidth={375}>
        <CandidateStatsRow />
      </Example>
    </section>
  )
}

function Example({ maxWidth, children }) {
  const borderWidth = 4
  return (
    <div
      css={{
        display: "flex",
        width: "100%",
        // This weird technique allows horizontal borders to disappear
        // when viewing on device with smaller screens.
        maxWidth: maxWidth + 2 * borderWidth,
        padding: `${borderWidth}px 0`,
        justifyContent: "center",
        background: "#ccc",
      }}
    >
      <div css={{ background: "white", flex: 1, maxWidth: maxWidth }}>
        {children}
      </div>
    </div>
  )
}
