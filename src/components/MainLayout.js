import React from "react"
import PageContent from "../components/PageContent"

import DesktopScoreBarContainer from "./DesktopScoreBarContainer"
import NavBar from "./NavBar"
import Footer from "./Footer"
import { Link } from "gatsby"

const DESKTOP = "@media (min-width: 1152px)"

export default ({ children }) => (
  <PageContent>
    <div css={{ margin: "13px 16px" }}>
      <Logo />
    </div>
    <DesktopScoreBarContainer />
    <div css={{ margin: "16px" }}>
      <NavBar />
    </div>
    {children}
    <Footer />
  </PageContent>
)

function Logo() {
  return (
    <Link
      to="/"
      css={{
        display: "block",
        overflow: "hidden",
        width: 26,
        [DESKTOP]: { width: "auto" },
      }}
    >
      <img
        src={require("../styles/images/site-logo.png")}
        alt="ELECT"
        css={{ width: 150, display: "block" }}
      />
    </Link>
  )
}
