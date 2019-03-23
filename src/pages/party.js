import React from "react"
import MainLayout from "../components/MainLayout"
import {
  parties,
  partyPath,
  getPartyById,
  partyColor,
} from "../models/information"

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
