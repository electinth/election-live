import React, { useReducer, useEffect } from "react"
import { Link } from "gatsby"

import DocumentHead from "./DocumentHead"
import { GlobalStyle } from "../styles"

export default function PageLayout({ children }) {
  return (
    <React.Fragment>
      <DocumentHead />
      <GlobalStyle />
      {children}
      <DevModeDisclaimer />
    </React.Fragment>
  )
}

function DevModeDisclaimer() {
  const [disclaimerHidden, hideDisclaimer] = useReducer(() => true, false)
  useEffect(() => {
    const t = setTimeout(() => hideDisclaimer(), 3000)
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
        opacity: 0.75,
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
