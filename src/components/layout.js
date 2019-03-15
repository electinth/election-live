import React from "react"
import "../styles/global.css"

export default function Layout({ children }) {
  return (
    <React.Fragment>
      <div style={{ margin: "13px 16px" }}>
        <img
          src={require("../styles/images/site-logo.png")}
          alt="ELECT"
          style={{ maxWidth: 150, width: "100%", display: "block" }}
        />
        <p
          style={{
            margin: "10px 0",
            fontSize: "0.75rem",
            color: "#4a4a4a",
            lineHeight: "1.2",
          }}
        >
          In VOTE We TRUST
        </p>
      </div>
      <div style={{ margin: `3rem auto`, maxWidth: 650, padding: `0 1rem` }}>
        {children}
      </div>
    </React.Fragment>
  )
}
