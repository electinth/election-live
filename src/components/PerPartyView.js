import React from "react"
import { DESKTOP_MIN_WIDTH, media } from "../styles"
import ErrorBoundary from "./ErrorBoundary"
import ElectionMapContainer from "./ElectionMapContainer"
import PerPartyMemberVoteResult from "./PerPartyMemberVoteResult"
import PartyDropdown from "./PartyDropdown"

export default function PerPartyView() {
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
        <ZoneSearchParty />
        <ZoneMapView />
        <PerPartyMemberVoteResult />
      </div>
    </div>
  )
}

// @todo #1 implement search and select with visualization of each party
function ZoneSearchParty() {
  return (
    <div
      css={{
        [media(DESKTOP_MIN_WIDTH)]: {
          display: "block",
          order: 1,
          margin: "0 0 10px",
          padding: 0,
        },
      }}
    >
      {/* left zone full mobile*/}
      <PartyDropdown open={true} />
    </div>
  )
}

// @todo #1 visualize data in country map when select a party
function ZoneMapView() {
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
          // display: currentMobileTab === "map" ? "block" : "none",
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
          <ElectionMapContainer />
        </ErrorBoundary>
      </div>
    </div>
  )
}
