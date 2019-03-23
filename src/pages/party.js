import React from "react"
import MainLayout from "../components/MainLayout"
import ZonePartyView from "../components/ZonePartyView"

export default ({ pageContext }) => (
  <MainLayout activeNavBarSection="by-party">
    <ZonePartyView />
  </MainLayout>
)
