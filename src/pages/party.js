import React from "react"
import Layout from "../components/layout"
import { parties, partyPath, getPartyById } from "../data/information"
import { Link } from "gatsby"

export default ({ pageContext }) => (
  <Layout>
    <h1>Party View</h1>
    {pageContext.partyId ? (
      <h2>{getPartyById(pageContext.partyId).name}</h2>
    ) : (
      <h2>All parties</h2>
    )}

    <ul>
      {parties.map(p => (
        <li key={p.id}>
          <Link to={partyPath(p)}>{p.name}</Link>
        </li>
      ))}
    </ul>
  </Layout>
)
