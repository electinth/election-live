import React from "react"
import Visibility from "visibilityjs"

export default function onlyPassThroughPropsWhilePageIsVisible(BaseComponent) {
  return class UpdateBlocker extends React.PureComponent {
    componentWillUnmount() {
      if (this.listener) {
        Visibility.unbind(this.listener)
      }
    }
    shouldComponentUpdate() {
      if (Visibility.isSupported() && Visibility.hidden()) {
        if (!this.listener) {
          this.listener = Visibility.onVisible(() => {
            requestAnimationFrame(() => {
              console.log("Ok resuming updates")
              this.forceUpdate()
              if (this.listener) {
                Visibility.unbind(this.listener)
              }
              this.listener = null
            })
          })
        }
        console.log("Update blocked because page is not visible naja")
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
