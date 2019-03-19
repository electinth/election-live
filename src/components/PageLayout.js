import React, { useState, useReducer, useEffect } from "react"
import GlobalPanel from "./GlobalPanel"
import NavBar from "./NavBar"
import Footer from "./Footer"
import { PageContentContextProvider, PageContentOutlet } from "./PageContent"
import { GlobalStyle } from "../styles"
import { Link } from "gatsby"

// @todo #1 Implement responsive layout and navigation

// @todo #1 Add page title using Helmet
//  (see: https://www.gatsbyjs.org/docs/add-page-metadata)

export default function PageLayout({ children }) {
  return (
    <PageContentContextProvider>
      <GlobalStyle />
      <DevModeDisclaimer />
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
      <PageContentOutlet />
      {children}
      <Footer />
    </PageContentContextProvider>
  )
}

function DevModeDisclaimer() {
  const [disclaimerHidden, hideDisclaimer] = useReducer(() => true, false)
  useEffect(() => {
    const t = setTimeout(() => hideDisclaimer(), 2000)
    return () => clearTimeout(t)
  }, [])
  return (
    <div
      data-show-disclaimer={disclaimerHidden ? undefined : true}
      css={{
        position: "absolute",
        background: "#F0324B",
        color: "#fff",
        top: 5,
        left: 5,
        transform: "rotate(-10deg)",
        padding: "5px 10px",
        opacity: 0,
        transition: "0.5s opacity",
        "&:hover, &[data-show-disclaimer]": {
          opacity: 1,
        },
      }}
    >
      <strong>In development</strong>
      <br />
      Using mock data
      <br />
      <Link
        to="/dev/kitchen-sink"
        css={{ color: "#ff0", textDecoration: "none" }}
      >
        &rarr; Go to kitchen sink!
      </Link>
    </div>
  )
}
