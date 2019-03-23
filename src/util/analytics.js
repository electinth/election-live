import { Debug } from "./Debug"

const debug = Debug("elect:analytics")

export function trackEvent(eventName, eventProperties) {
  if (process.env.NODE_ENV === "production") {
    try {
      const amplitude = require("amplitude-js")
      amplitude.getInstance().logEvent(eventName, eventProperties)
    } catch (e) {
      debug(eventName, eventProperties)
      debug("Failed to send event to Amplitude", e)
    }
  } else {
    debug(eventName, eventProperties)
  }
}
