import React from "react"
import { DESKTOP_MIN_WIDTH, media } from "../styles"
import ErrorBoundary from "./ErrorBoundary"
import PerPartyMemberVoteResult from "./PerPartyMemberVoteResult"
import PerPartySearchPanelContainer from "./PerPartySearchPanelContainer"
import PerPartyMapContainer from "./PerPartyMapContainer"

export default function PerPartyView({ partyId }) {
  return (
    <div>
      <div
        css={{
          margin: "0 auto",
          padding: "0 24px",
          maxWidth: "1200px",
          [media(DESKTOP_MIN_WIDTH)]: {
            order: 1,
            margin: "0 auto",
            padding: 0,
            display: "flex",
          },
        }}
      >
        <PerPartySearchPanelContainer partyId={partyId} />
        <PerPartyMapView partyId={partyId} />
        <ZoneStats partyId={partyId} />
      </div>
    </div>
  )
}

function PerPartyMapView({ partyId }) {
  return (
    <div
      css={{
        [media(DESKTOP_MIN_WIDTH)]: {
          display: "block",
          order: 2,
          margin: "10px auto",
          padding: 0,
          width: "375px",
        },
      }}
    >
      {/* map zone */}
      <div
        css={{
          display: "block",
          margin: "10px auto",
          width: 375,
          [media(DESKTOP_MIN_WIDTH)]: {
            display: "block",
            order: 2,
          },
        }}
      >
        <ErrorBoundary name="ElectionMap">
          <PerPartyMapContainer partyId={partyId} />
        </ErrorBoundary>
      </div>
    </div>
  )
}

function ZoneStats({ partyId }) {
  return <PerPartyMemberVoteResult partyId={partyId} />
}
