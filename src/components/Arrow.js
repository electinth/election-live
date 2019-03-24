import React from "react"

/**
 * @param {object} props
 * @param {() => void | undefined} props.onClick
 * @param {number} props.degree
 * @param {boolean | undefined } props.hide
 */
const ArrowSign = props => (
  <span
    onClick={props.onClick}
    css={{
      padding: "5px 15px",
      cursor: props.hide ? undefined : "pointer",
    }}
  >
    <span
      css={{
        display: "inline-block",
        border: `solid ${props.hide ? "transparent" : "#212121"}`,
        borderWidth: "0 2px 2px 0",
        padding: "4px",
        transform: `rotate(${props.degree}deg)`,
        verticalAlign: "middle",
      }}
    />
  </span>
)

export const LeftArrow = props => (
  <ArrowSign onClick={props.onClick} hide={props.hide} degree={135} />
)

export const RightArrow = props => (
  <ArrowSign onClick={props.onClick} hide={props.hide} degree={-45} />
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
