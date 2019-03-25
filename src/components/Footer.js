import React from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faGithub } from "@fortawesome/fontawesome-free-brands"
import { labelColor, DESKTOP_MIN_WIDTH, media } from "../styles"
import { appVersion } from "../util/appVersion"
import { TimeMachine } from "./TimeMachine"
import ContentWrapper from "./ContentWrapper"

export default function Footer() {
  // @todo #1 Polish the footer
  return (
    <footer
      css={{
        textAlign: "center",
        padding: "2rem 0.5rem 4rem",
        marginTop: "1rem",
        color: labelColor,
      }}
    >
      <ContentWrapper>
        <TimeMachine />
      </ContentWrapper>
      <div
        css={{
          width: 300,
          margin: "1rem auto 0",
          [media(DESKTOP_MIN_WIDTH)]: {
            width: "100%",
          },
        }}
      >
        © {new Date().getFullYear()} ELECT - All Rights Reserved - View this
        project on{" "}
        <a
          href="https://github.com/codeforthailand/election-live"
          target="_blank"
        >
          <FontAwesomeIcon icon={faGithub} /> Github
        </a>
        <br />v{appVersion}
      </div>
    </footer>
  )
}
