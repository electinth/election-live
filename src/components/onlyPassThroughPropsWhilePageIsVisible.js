import React from "react"

export default function onlyPassThroughPropsWhilePageIsVisible(BaseComponent) {
  return class UpdateBlocker extends React.Component {
    componentWillUnmount() {
      if (this.listener) {
        const Visibility = require("visibilityjs")
        Visibility.unbind(this.listener)
      }
    }
    shouldComponentUpdate() {
      const Visibility = require("visibilityjs")
      if (Visibility.isSupported() && Visibility.hidden()) {
        if (!this.listener) {
          this.listener = Visibility.onVisible(() => {
            requestAnimationFrame(() => {
              this.forceUpdate()
              if (this.listener) {
                Visibility.unbind(this.listener)
              }
              this.listener = null
            })
          })
        }
        return false
      } else {
        return true
      }
    }
    render() {
      return <BaseComponent {...this.props} />
    }
  }
}
