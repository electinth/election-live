import React from "react"
import { PartyStatsRow } from "./PartyStatsRow"
import { CandidateStatsRow } from "./CandidateStatsRow"
import { NationwideSummaryView } from "./NationwideSummaryView"

export function KitchenSink() {
  return (
    <section>
      <h1>Kitchen Sink</h1>

      <Gallery title="NationwideSummaryView">
        <Example title="Loading" maxWidth={320}>
          <NationwideSummaryView loading={true} />
        </Example>
        <Example title="320px" maxWidth={320}>
          <NationwideSummaryView
            loading={false}
            data={require("../models/mockData/NationwideSummary1.json")}
          />
        </Example>
        <Example title="375px" maxWidth={375}>
          <NationwideSummaryView
            loading={false}
            data={require("../models/mockData/NationwideSummary1.json")}
          />
        </Example>
      </Gallery>

      <Gallery title="PartyStatsRow">
        <Example maxWidth={375}>
          <PartyStatsRow />
        </Example>
      </Gallery>

      <Gallery title="CandidateStatsRow">
        <Example maxWidth={375}>
          <CandidateStatsRow />
        </Example>
      </Gallery>
    </section>
  )
}

function Gallery({ title, children }) {
  return (
    <div>
      <h2 css={{ padding: "0 1rem" }}>{title}</h2>
      <div
        css={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "top",
          justifyContent: "center",
          background: "#ccc",
          padding: "4px 0",
        }}
      >
        {children}
      </div>
    </div>
  )
}

function Example({ title, maxWidth, children }) {
  const borderWidth = 4
  return (
    <div
      css={{
        display: "flex",
        flex: `${maxWidth + 2 * borderWidth}px 0 1`,
        padding: `${borderWidth}px 0`,
        justifyContent: "center",
      }}
    >
      <div css={{ background: "white", flex: 1, maxWidth: maxWidth }}>
        <h3 css={{ margin: 0, background: "#ddd" }}>{title}</h3>
        <div>{children}</div>
      </div>
    </div>
  )
}
