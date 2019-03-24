import React from "react"

const LeftArrow = props => (
  <div
    onClick={props.onClick}
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
)

const RightArrow = props => (
  <div
    onClick={props.onClick}
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
)

/**
 * @param {{ onLeftArrowClick?: () => void, onRightArrowClick?: () => void }} props
 */
const Arrow = props => (
  <React.Fragment>
    <LeftArrow onClick={props.onLeftArrowClick} />
    {props.children}
    <RightArrow onClick={props.onRightArrowClick} />
  </React.Fragment>
)

export default Arrow
