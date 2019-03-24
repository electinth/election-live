import React from "react"

/**
 * @param {{ onLeftArrowClick?: () => void, onRightArrowClick?: () => void }} props
 */
const Arrow = props => (
  <React.Fragment>
    <div
      onClick={props.onLeftArrowClick}
      css={{
        display: "inline-block",
        border: "solid #212121",
        borderWidth: "0 2px 2px 0",
        padding: "4px",
        transform: "rotate(135deg)",
        verticalAlign: "middle",
        marginRight: "12px",
        cursor: "pointer",
      }}
    />
    {props.children}
    <div
      onClick={props.onRightArrowClick}
      css={{
        display: "inline-block",
        border: "solid #212121",
        borderWidth: "0 2px 2px 0",
        padding: "4px",
        transform: "rotate(-45deg)",
        verticalAlign: "middle",
        marginLeft: "12px",
        cursor: "pointer",
      }}
    />
  </React.Fragment>
)

export default Arrow
