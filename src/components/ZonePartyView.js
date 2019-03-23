import React from "react"
import { parties, partyPath, partyColor } from "../models/information"
import { DESKTOP_MIN_WIDTH, labelColor, media } from "../styles"
import { faSearch } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import ErrorBoundary from "../components/ErrorBoundary"
import ElectionMapContainer from "../components/ElectionMapContainer"
import { Link } from "gatsby"

export default function ZonePartyView() {
  return (
    <div>
      <div
        css={{
          margin: "0 auto",
          padding: "0 24px",
          maxWidth: "1200px",
          [media(DESKTOP_MIN_WIDTH)]: {
            display: "block",
            order: 1,
            margin: "0 auto",
            padding: 0,
            display: "flex",
          },
        }}
      >
        <ZoneSearchParty />
        <ZoneMapView />
        <ZonePartyVoteResult />
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
      <div css={{ position: "relative" }}>
        <input
          css={{
            border: `1px solid ${labelColor}`,
            width: "100%",
            boxSizing: "border-box",
            padding: 10,
            fontSize: 16,
            marginTop: 20,
            ["&:focus"]: { outline: 0 },
          }}
          placeholder="ชื่อพรรคการเมือง"
          onChange={v => {
            // @todo #1 search party: implement onChange
          }}
        />
        <div
          css={{
            top: 30,
            position: "absolute",
            right: 10,
            color: labelColor,
          }}
        >
          <FontAwesomeIcon icon={faSearch} />
        </div>
      </div>
      <div>
        <ul>
          {parties.map(p => (
            <li key={p.id}>
              <Link to={partyPath(p)} style={{ color: partyColor(p) }}>
                {p.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
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

// @todo #1 show each party vote result
function ZonePartyVoteResult() {
  return (
    <div
      css={{
        [media(DESKTOP_MIN_WIDTH)]: {
          display: "block",
          order: 3,
          margin: "0",
          padding: "16px",
          width: "320px",
        },
      }}
    >
      {/* right zone */}
      <div>ประมาณจำนวน สส. ที่ได้</div>
    </div>
  )
}
