import React from "react"
import { Link } from "gatsby"
import { WIDE_NAV_MIN_WIDTH, media } from "../styles"

/**
 * @typedef {'by-area' | 'by-party' | 'overview' | 'source'} NavBarSectionName
 */

/**
 * @param {object} props
 * @param {NavBarSectionName} props.activeNavBarSection
 */
export default function Navbar(props) {
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
    "&[data-active]": {
      color: "black",
      [media(WIDE_NAV_MIN_WIDTH)]: { borderBottom: "3px solid black" },
    },
  }

  /**
   * @param {NavBarSectionName} sectionName
   * @param {string} url
   * @param {React.ReactNode} text
   */
  const linkTo = (sectionName, url, text) => (
    <Link
      css={stylesLink}
      data-active={sectionName === props.activeNavBarSection ? true : undefined}
      to={url}
    >
      {text}
    </Link>
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
      {linkTo("by-area", "/", "ดูผลตามพื้นที่")}
      {linkTo("by-party", "/party/", "ดูผลตามพรรค")}
      {linkTo("overview", "/overview/", "ภาพรวมผลลัพธ์")}
      {linkTo("source", "/source/", "ข้อมูลเรามาจากไหน")}
    </nav>
  )
}
