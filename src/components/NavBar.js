import React from "react"
import { Link } from "gatsby"
import { WIDE_NAV_MIN_WIDTH, media } from "../styles"
import _ from "lodash"
import LinkToSimulator from "./LinkToSimulator"
import { __ } from "./LocalizedText"

const menues = [
  {
    name: "by-area",
    route: "/",
    label: __("ดูผลตามพื้นที่", "View by Area"),
  },
  {
    name: "by-party",
    route: "/party",
    label: __("ดูผลตามพรรค", "View by Party"),
  },
  // {
  //   name: "overview",
  //   route: "/overview",
  //   label: "ภาพรวมผลลัพธ์",
  // },
  {
    name: "about",
    route: "/about",
    label: __("เกี่ยวกับ ELECT Live", "About ELECT Live!"),
  },
]

export const menuMapping = _(menues)
  .keyBy("name")
  .value()

/**
 * @typedef {'by-area' | 'by-party' | 'overview' | 'about'} NavBarSectionName
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
      textDecoration: "underline",
      [media(WIDE_NAV_MIN_WIDTH)]: {
        borderBottom: "3px solid white",
        textDecoration: "none",
      },
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
        textAlign: "right",
        backgroundColor: "#212121",
        [media(WIDE_NAV_MIN_WIDTH)]: {
          textAlign: "center",
        },
      }}
    >
      {menues
        .slice(0, menues.length - 1)
        .map(m => linkTo(m["name"], m["route"], m["label"]))}
      <LinkToSimulator />
      {menues
        .slice(menues.length - 1)
        .map(m => linkTo(m["name"], m["route"], m["label"]))}
    </nav>
  )
}
