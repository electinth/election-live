import React from "react"
import PageContent from "../components/PageContent"

import GlobalPanel from "./GlobalPanel"
import NavBar from "./NavBar"
import Footer from "./Footer"

export default ({ children }) => (
  <PageContent>
    <div css={{ margin: "13px 16px" }}>
      <img
        src={require("../styles/images/site-logo.png")}
        alt="ELECT"
        css={{ maxWidth: 150, width: "100%", display: "block" }}
      />
      <p
        css={{
          margin: "10px 0",
          fontSize: "0.75rem",
          color: "#4a4a4a",
          lineHeight: "1.2",
        }}
      >
        In VOTE We TRUST
      </p>
    </div>
    <GlobalPanel />
    <div css={{ margin: "16px" }}>
      <NavBar />
    </div>
    {children}
    <Footer />
  </PageContent>
)
