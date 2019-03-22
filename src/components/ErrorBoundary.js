import React from "react"
import Placeholder from "./Placeholder"

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true, errorMessage: String(error) }
  }

  componentDidCatch(error, info) {
    // You can also log the error to an error reporting service
    // logErrorToMyService(error, info)
  }

  render() {
    if (this.state.hasError) {
      return (
        <Placeholder>
          <strong css={{ color: "red" }}>
            {this.props.name} failed to render:
          </strong>
          <br />
          {this.state.errorMessage}
          <br />
          <button onClick={() => this.setState({ hasError: false })}>
            Retry
          </button>
        </Placeholder>
      )
    }

    return this.props.children
  }
}
