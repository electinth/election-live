import React from "react"
import { Link } from "gatsby"
import { ClassNames } from "@emotion/core"

export default function Navbar() {
  const stylesLink = {
    color: "#ccc",
    textDecoration: "none",
    display: "inline-block",
    position: "relative",
    margin: "0 1rem",
    fontSize: "18px",
    paddingBottom: "8px",
    paddingTop: "8px",
    fontFamily: "The Matter",
    fontWeight: "200",
  }

  const stylesActiveLink = {
    color: "black",
    borderBottom: "3px solid black",
  }

  const linkTo = (url, text) => (
    <ClassNames>
      {({ css }) => (
        <Link
          className={css(stylesLink)}
          activeClassName={css(stylesActiveLink)}
          to={url}
        >
          {text}
        </Link>
      )}
    </ClassNames>
  )

  return (
    <nav
      css={{
        display: "block",
        border: "solid #eee",
        borderWidth: "1px 0",
        textAlign: "center",
      }}
    >
      {linkTo("/", "ดูผลตามพื้นที่")}
      {linkTo("/party/", "ดูผลตามพรรค")}
      {linkTo("/overview/", "ภาพรวมผลลัพธ์")}
      {linkTo("/source/", "ข้อมูลเรามาจากไหน")}
    </nav>
  )
}
