import React from "react"
import CandidateStatsRow from "../../components/CandidateStatsRow"
import NationwideSummaryView from "../../components/NationwideSummaryView"
import ElectionMap from "../../components/ElectionMap"
import { getPartyById } from "../../models/information"
import { once } from "lodash"
import PageContent from "../../components/PageContent"

const getNationwideSummaryData = once(() =>
  require("../../models/mockData/NationwideSummary1.json")
)

const getPartyStatsNationwide = once(() =>
  require("../../models/mockData/PartyStatsNationwide.json").map(f => ({
    ...f,
    party: getPartyById(f._partyId),
  }))
)

export default () => {
  return (
    <PageContent>
      <h1>Kitchen Sink</h1>

      <Gallery title="ElectionMap">
        <Example title="Blank Election Map" maxWidth={375}>
          <ElectionMap />
        </Example>
      </Gallery>

      <Gallery title="NationwideSummaryView">
        <Example title="Loading" maxWidth={320}>
          <NationwideSummaryView loading={true} />
        </Example>
        <Example title="320px" maxWidth={320}>
          <NationwideSummaryView
            loading={false}
            headerData={getNationwideSummaryData()}
            partyStats={getPartyStatsNationwide()}
          />
        </Example>
        <Example title="375px" maxWidth={375}>
          <NationwideSummaryView
            loading={false}
            headerData={getNationwideSummaryData()}
            partyStats={getPartyStatsNationwide()}
          />
        </Example>
      </Gallery>

      <Gallery title="CandidateStatsRow">
        <Example maxWidth={375}>
          <CandidateStatsRow />
        </Example>
      </Gallery>
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
