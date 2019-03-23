import React from "react"
import { parties, partyPath, partyColor } from "../models/information"
import { DESKTOP_MIN_WIDTH, labelColor, media } from "../styles"
import { faSearch } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import ErrorBoundary from "./ErrorBoundary"
import ElectionMapContainer from "./ElectionMapContainer"
import { Link } from "gatsby"
import PartyDropdown from "./PartyDropdown"
import PerPartyMemberVoteResult from "./PerPartyMemberVoteResult"

export function filterParty(parties, keyword) {
  return parties.filter(party => {
    return (
      // only allow prefix search
      party.codeEN.indexOf(keyword) === 0 ||
      party.codeTH.indexOf(keyword) === 0 ||
      // but can search anywhere
      party.name.indexOf(keyword) !== -1
    )
  })
}

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
  const [searchKeyword, setSearchKeyword] = React.useState("")

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
