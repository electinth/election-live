import React from "react"
import CandidateStatsRow from "../../components/CandidateStatsRow"
import NationwideSummaryView from "../../components/NationwideSummaryView"
import ElectionMap from "../../components/ElectionMap"
import { getPartyById } from "../../models/information"
import { once } from "lodash"
import PageContent from "../../components/PageContent"

function kitchenSink(gallery, example) {
  gallery("ElectionMap", () => {
    example("Blank Election Map", { maxWidth: 375 }, () => <ElectionMap />)
  })
  gallery("NationwideSummaryView", () => {
    const headerData = require("../../models/mockData/NationwideSummary1.json")
    const partyStats = require("../../models/mockData/PartyStatsNationwide.json").map(
      basePartyStatRow => ({
        ...basePartyStatRow,
        party: getPartyById(basePartyStatRow._partyId),
      })
    )
    example("Loading", { maxWidth: 320 }, () => (
      <NationwideSummaryView loading={true} />
    ))
    example("Loaded", { maxWidth: 320 }, () => (
      <NationwideSummaryView
        loading={false}
        headerData={headerData}
        partyStats={partyStats}
      />
    ))
  })

  gallery("CandidateStatsRow", () => {
    example("Basic example", { maxWidth: 320 }, () => <CandidateStatsRow />)
  })
}

export default () => {
  const sections = []
  let currentSection
  kitchenSink(
    (title, f) => {
      const section = { title, examples: [] }
      sections.push(section)
      currentSection = section
      try {
        f()
      } finally {
        currentSection = null
      }
    },
    (title, options, render) => {
      currentSection.examples.push({ title, render, options })
    }
  )
  return (
    <PageContent>
      <h1>Kitchen Sink</h1>
      {sections.map(s => (
        <Gallery key={s.title} title={s.title}>
          {s.examples.map((ex, i) => (
            <Example
              key={i}
              title="Blank Election Map"
              maxWidth={ex.options.maxWidth}
            >
              {ex.render()}
            </Example>
          ))}
        </Gallery>
      ))}
    </PageContent>
  )
}

function Gallery({ title, children }) {
  return (
    <div>
      <h2
        id={title}
        css={{
          margin: 0,
          padding: "1rem",
          background: "#F0324B",
          color: "white",
        }}
      >
        {title}
      </h2>
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
