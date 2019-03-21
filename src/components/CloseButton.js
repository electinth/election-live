import { faTimes } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import React from "react"
export default function CloseButton({ onClick }) {
  return (
    <button
      css={{
        position: "absolute",
        top: 0,
        right: 0,
        fontSize: 20,
        border: 0,
        background: "transparent",
        padding: "8px 12px",
        cursor: "pointer",
      }}
      onClick={onClick}
    >
      <FontAwesomeIcon icon={faTimes} />
    </button>
  )
}
