import React from "react"
import styled from "@emotion/styled"
import { Link } from "gatsby"
import { css } from "@emotion/core"

export default function NavBar() {

  const stylesLink = css`
    color: inherit;
    text-decoration: none;
    display: inline-block;
    position: relative;
    margin: 0 1rem;
    &:active::before {
      content: "";
      display: block;
      position: absolute;
      right: 0;
      bottom: -2px;
      height: 2px;
      left: 0;
      background: #ef314a;
    }
  `

  const linkTo = (url, text) => (
    <Link
      css={stylesLink}
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
