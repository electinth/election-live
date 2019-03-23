import React from "react"
import MainLayout from "../components/MainLayout"
import PerPartyView from "../components/PerPartyView"

export default ({ pageContext }) => (
  <MainLayout activeNavBarSection="by-party">
    <PerPartyView />
  </MainLayout>
)
