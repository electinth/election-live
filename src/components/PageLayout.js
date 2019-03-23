import React from "react"

import DocumentHead from "./DocumentHead"
import { GlobalStyle } from "../styles"
import ErrorBoundary from "./ErrorBoundary"

export default function PageLayout({ children }) {
  return (
    <ErrorBoundary name="Web page">
      <DocumentHead />
      <GlobalStyle />
      {children}
      {
        // @todo #1 Allow a way for us to display a banner to tell users
        //  to refresh the browser. Our app may contain bugs and
        //  we might need users to refresh our website to get the new code.
      }
    </ErrorBoundary>
  )
}
