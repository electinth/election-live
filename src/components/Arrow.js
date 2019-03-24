import React from "react"

const LeftArrow = props =>
  props.hide ? null : (
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

const RightArrow = props =>
  props.hide ? null : (
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
 * @param {object} props
 * @param {() => void | undefined} props.onLeftArrowClick
 * @param {() => void | undefined} props.onRightArrowClick
 * @param {boolean | undefined} props.hideLeftArrow
 * @param {boolean | undefined} props.hideRightArrow
 */
const Arrow = props => (
  <React.Fragment>
    <LeftArrow onClick={props.onLeftArrowClick} hide={props.hideLeftArrow} />
    {props.children}
    <RightArrow onClick={props.onRightArrowClick} hide={props.hideRightArrow} />
  </React.Fragment>
)

export default Arrow
