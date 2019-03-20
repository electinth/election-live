import React from "react"

/**
 * Replaces the component renderer in a way that,
 * as long as we are on the same page, the component will
 * not be unmounted and remounted.
 */
export function replaceComponentRenderer({ props, loader }) {
  const Component = props.pageResources.component
  return <Component {...props} pathContext={props.pageContext} />
}
