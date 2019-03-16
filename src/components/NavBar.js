import React from "react"
import { Link } from "gatsby"
import { ClassNames } from "@emotion/core"

export default function Navbar() {
  const stylesLink = {
    color: "black",
    textDecoration: "none",
    display: "inline-block",
    position: "relative",
    margin: "0 1rem",
  }

  const stylesActiveLink = {
    borderBottom: "2px solid #ef314a",
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
        border: "solid #4a4a4a",
        borderWidth: "1px 0",
        padding: "0.75rem 0",
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
