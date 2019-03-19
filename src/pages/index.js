import React from "react"
import MainLayout from "../components/MainLayout"
import ZoneMasterView from "../components/ZoneMasterView"
import Placeholder from "../components/Placeholder"

export default ({ pageContext }) => (
  <MainLayout>
    <ZoneMasterView
      contentHeader={<Placeholder height={120}>contentHeader</Placeholder>}
      contentBody={<Placeholder height={800}>contentBody</Placeholder>}
    />
  </MainLayout>
)
