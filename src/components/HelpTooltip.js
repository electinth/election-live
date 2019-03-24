import React, { useState, useEffect } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faQuestionCircle } from "@fortawesome/free-solid-svg-icons"

export default function HelpTooltip({
  description,
  dir = "top right",
  tooltipStyle = {},
}) {
  const [active, setActive] = useState(false)
  useEffect(() => {
    const closeTooltip = e => setActive(false)
    document.body.addEventListener("click", closeTooltip, false)
    return () => {
      document.body.removeEventListener("click", closeTooltip)
    }
  })

  const onClick = e => setActive(!active)
  const onMouseEnter = e => setActive(true)
  const onMouseLeave = e => setActive(false)

  let dirPosition
  switch (dir) {
    case "bottom right":
      dirPosition = {
        top: "calc(100% - 10px)",
        left: "calc(100% + 10px)",
      }
      break
    case "bottom center":
      dirPosition = {
        top: "100%",
        left: "50%",
        transform: "translate(-50%, 0px)",
        maxWidth: "70vw",
        width: "240px",
      }
      break
    case "top right":
    default:
      dirPosition = {
        bottom: "calc(100% - 10px)",
        left: "calc(100% + 10px)",
      }
      break
  }

  return (
    <span
      css={{
        position: "relative",
        paddingLeft: "5px",
      }}
    >
      <span
        onClick={onClick}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        <FontAwesomeIcon icon={faQuestionCircle} />
      </span>
      {description ? (
        <div
          css={{
            position: "absolute",
            width: "160px",
            ...dirPosition,
            ...tooltipStyle,
            zIndex: "1000",
            padding: "8px",
            color: "#000000",
            fontSize: "12px",
            border: "1px solid #eeeeee",
            borderRadius: "2px",
            backgroundColor: "#ffffff",
            boxShadow: "0 5px 8px rgba(0,0,0,0.12)",
          }}
          style={{
            display: active ? "block" : "none",
          }}
        >
          <div>{description}</div>
        </div>
      ) : null}
    </span>
  )
}
