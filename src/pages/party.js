import React from "react"
import MainLayout from "../components/MainLayout"
import {
  parties,
  partyPath,
  getPartyById,
  partyColor,
} from "../models/information"
import { Link } from "gatsby"
import {
  buttonStyle,
  DESKTOP_MIN_WIDTH,
  labelColor,
  media,
  Responsive,
} from "../styles"
import ZonePartyView from "../components/ZonePartyView"

export default ({ pageContext }) => (
  <MainLayout activeNavBarSection="by-party">
    <ZonePartyView />
  </MainLayout>
)

function PartyList({ pageContext }) {
  return (
    <div>
      <h1>Party View</h1>
      {pageContext.partyId ? (
        <h2>{getPartyById(pageContext.partyId).name}</h2>
      ) : (
        <h2>All parties</h2>
      )}

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
  )
}
