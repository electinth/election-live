import React from "react"
import { Link } from "gatsby"
import { ClassNames } from "@emotion/core"
import { WIDE_NAV_MIN_WIDTH, media } from "../styles"

export default function Navbar() {
  const stylesLink = {
    color: "#ccc",
    textDecoration: "none",
    display: "block",
    position: "relative",
    margin: "0 1rem",
    fontSize: "18px",
    paddingBottom: "8px",
    paddingTop: "8px",
    fontFamily: "The Matter",
    fontWeight: "200",
    [media(WIDE_NAV_MIN_WIDTH)]: { display: "inline-block" },
  }

  const stylesActiveLink = {
    color: "black",
    [media(WIDE_NAV_MIN_WIDTH)]: { borderBottom: "3px solid black" },
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
