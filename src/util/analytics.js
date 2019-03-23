import amplitude from "amplitude-js"

export function trackEvent(eventName, eventProperties) {
  amplitude.getInstance().logEvent(eventName, eventProperties)
}
