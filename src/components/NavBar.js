import React from "react"
import styled from "@emotion/styled"
import { Link } from "gatsby"

export default function Navbar() {

  const stylesLink = {
    color: "black",
    textDecoration: "none",
    display: "inline-block",
    position: "relative",
    margin: "0 1rem",
  }

  const stylesActiveLink = {
    ...stylesLink,
    borderBottom: "2px solid #ef314a",
  }

  const linkTo = (url, text) => (
    <Link
      style={stylesLink}
      activeStyle={stylesActiveLink}
      to={url}
    >
      {text}
    </Link>
  )

  const Nav = styled.nav`
    display: block;
    border: solid #4a4a4a;
    border-width: 1px 0;
    padding: 0.75rem 0;
    text-align: center;
  `

  return (
    <Nav>
      {linkTo("/", "ดูผลตามพื้นที่")}
      {linkTo("/party/", "ดูผลตามพรรค")}
      {linkTo("/overview/", "ภาพรวมผลลัพธ์")}
      {linkTo("/source/", "ข้อมูลเรามาจากไหน")}
    </Nav>
  )
}
