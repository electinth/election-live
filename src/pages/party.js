import React from "react"
import MainLayout from "../components/MainLayout"
import PerPartyView from "../components/PerPartyView"
import PartyDropdown from "../components/PartyDropdown"

import { DISPLAY_FONT } from "../styles"

export default ({ pageContext, location }) => {
  const partyId = pageContext.partyId
  const content = partyId ? (
    <PerPartyView partyId={partyId} />
  ) : (
    <div css={{ padding: 20, color: "#616161", textAlign: "center" }}>
      <h1 css={{ fontFamily: DISPLAY_FONT }}>
        เลือกพรรคการเมือง เพื่อดูจำนวน ส.ส.
      </h1>
      <PartyDropdown />
    </div>
  )

  return <MainLayout activeNavBarSection="by-party">{content}</MainLayout>
}
