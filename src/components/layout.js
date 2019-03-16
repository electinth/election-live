import React from "react"
import "../styles/global.css"
import NavBar from "./NavBar"

export default function Layout({ children }) {
  return (
    <React.Fragment>
      <div css={{ margin: "13px 16px" }}>
        <img
          src={require("../styles/images/site-logo.png")}
          alt="ELECT"
          css={{ maxWidth: 150, width: "100%", display: "block" }}
        />
        <p
          css={{
            margin: "10px 0",
            fontSize: "0.75rem",
            color: "#4a4a4a",
            lineHeight: "1.2",
          }}
        >
          In VOTE We TRUST
        </p>
      </div>
      <div css={{ margin: "16px" }}>
        <NavBar />
      </div>
      <div css={{ margin: `3rem auto`, maxWidth: 650, padding: `0 1rem` }}>
        {children}
      </div>
    </React.Fragment>
  )
}
