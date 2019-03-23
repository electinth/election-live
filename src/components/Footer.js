import React from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faGithub } from "@fortawesome/fontawesome-free-brands"

export default function Footer() {
  // @todo #1 Polish the footer
  return (
    <footer css={{ textAlign: "center", padding: "0.5rem", marginTop: "1rem" }}>
      <a
        href="https://github.com/codeforthailand/election-live"
        target="_blank"
      >
        <FontAwesomeIcon icon={faGithub} /> โค๊ด
      </a>
    </footer>
  )
}
