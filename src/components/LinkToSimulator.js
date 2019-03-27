import React from "react"
import { Link } from "gatsby"
import { WIDE_NAV_MIN_WIDTH, media } from "../styles"
import { nationwidePartyStatsFromSummaryJSON } from "../models/PartyStats"
import { useSummaryData } from "../models/LiveDataSubscription"
import createSimulatorUrl from "../util/createSimulatorUrl"
import { __ } from "./LocalizedText"

const stylesLink = {
  color: "#FFFFFF",
  opacity: "0.7",
  textDecoration: "none",
  display: "block",
  position: "relative",
  margin: "0 1rem",
  fontSize: "16px",
  paddingBottom: "8px",
  paddingTop: "8px",
  fontFamily: "The Matter",
  fontWeight: "100",
  [media(WIDE_NAV_MIN_WIDTH)]: { display: "inline-block" },
  "&[data-active]": {
    opacity: "1",
    textDecoration: "underline",
    [media(WIDE_NAV_MIN_WIDTH)]: {
      borderBottom: "3px solid white",
      textDecoration: "none",
    },
  },
}

export default function LinkToSimulator() {
  const summaryState = useSummaryData()
  if (!summaryState.completed) return null

  const summary = summaryState.data
  const partyStats = nationwidePartyStatsFromSummaryJSON(summary)
  const parties = partyStats
    .map(p => ({
      name: p.party.name,
      seats: p.constituencySeats + p.partyListSeats,
    }))
    .filter(p => p.seats > 0)
  const url = createSimulatorUrl(parties)

  return (
    <Link
      css={stylesLink}
      onClick={e => {
        e.preventDefault()
        window.open(url, "_blank")
      }}
    >
      {__("ลองตั้งรัฐบาล")}
    </Link>
  )
}
