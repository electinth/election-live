import React, { useReducer, useEffect } from "react"
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
      <PageContentOutlet />
      {children}
      <DevModeDisclaimer />
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
