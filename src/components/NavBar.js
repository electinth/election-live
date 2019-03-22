import React from "react"
import { Link } from "gatsby"
import { WIDE_NAV_MIN_WIDTH, media } from "../styles"
import _ from "lodash"

const menues = [
  {
    name: "by-area",
    route: "/",
    label: "ดูผลตามพื้นที่",
  },
  {
    name: "by-party",
    route: "/party",
    label: "ดูผลตามพรรค",
  },
  {
    name: "overview",
    route: "/overview",
    label: "ภาพรวมผลลัพธ์",
  },
  {
    name: "source",
    route: "/source",
    label: "ข้อมูลเรามาจากไหน",
  },
]

export const menuMapping = _(menues)
  .keyBy("name")
  .value()

/**
 * @typedef {'by-area' | 'by-party' | 'overview' | 'source'} NavBarSectionName
 */

/**
 * @param {object} props
 * @param {NavBarSectionName} props.activeNavBarSection
 */
export default function Navbar(props) {
  const stylesLink = {
    color: "#FFFFFF",
    opacity: "0.7",
    textDecoration: "none",
    display: "block",
    position: "relative",
    margin: "0 1rem",
    fontSize: "16px",
    paddingBottom: "8px",
    paddingTop: "8px",
    fontFamily: "The Matter",
    fontWeight: "100",
    [media(WIDE_NAV_MIN_WIDTH)]: { display: "inline-block" },
    "&[data-active]": {
      opacity: "1",
      [media(WIDE_NAV_MIN_WIDTH)]: { borderBottom: "3px solid white" },
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
        textAlign: "center",
        backgroundColor: "#212121;",
      }}
    >
      {menues.map(m => linkTo(m["name"], m["route"], m["label"]))}
    </nav>
  )
}
