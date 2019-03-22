import React from "react"
import { config as fontAwesomeConfig } from "@fortawesome/fontawesome-svg-core"

/**
 * Replaces the component renderer in a way that,
 * as long as we are on the same page, the component will
 * not be unmounted and remounted.
 */
export function replaceComponentRenderer({ props, loader }) {
  const Component = props.pageResources.component
  return <Component {...props} pathContext={props.pageContext} />
}

// CSS is added in `src/styles/global.css`
fontAwesomeConfig.autoAddCss = false
