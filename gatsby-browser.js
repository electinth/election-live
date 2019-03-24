import React from "react"
import { config as fontAwesomeConfig } from "@fortawesome/fontawesome-svg-core"
import * as Sentry from "@sentry/browser"
import amplitude from "amplitude-js"
import { appVersion } from "./src/util/appVersion"

Sentry.init({
  dsn: "https://baff68252abf4a82ac4dbb49b28b7bd0@sentry.io/1422325",
  environment: process.env.NODE_ENV,
  enabled: (() =>
    ["production", "stage"].indexOf(process.env.NODE_ENV) !== -1)(),
  release: appVersion,
})

Sentry.configureScope(scope => {
  scope.setTag("commit", process.env.ELECT_LIVE_SHA)
})

amplitude.getInstance().init("4cac840317d8c141fff5beb87b423d59")

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
