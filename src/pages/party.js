import React from "react"
import { DESKTOP_MIN_WIDTH, media } from "../styles"
import MainLayout from "../components/MainLayout"
import PerPartyView from "../components/PerPartyView"
import PerPartyUnselectedView from "../components/PerPartyUnselectedView"

export default ({ pageContext, location }) => {
  const partyId = pageContext.partyId
  const content = partyId ? (
    <PerPartyView partyId={partyId} />
  ) : (
    <PerPartyUnselectedView />
  )

  return <MainLayout activeNavBarSection="by-party">{content}</MainLayout>
}
