import amplitude from "amplitude-js"
import { Debug } from "./Debug"

const debug = Debug("elect:analytics")

export function trackEvent(eventName, eventProperties) {
  if (process.env.NODE_ENV === "production") {
    amplitude.getInstance().logEvent(eventName, eventProperties)
  } else {
    debug(eventName, eventProperties)
  }
}
