import React from "react"
import styled from "@emotion/styled"
import { Link } from "gatsby"
import { css } from "@emotion/core"
import { Location } from '@reach/router'

const Navbar = ({ location }) => {

  const stylesLink = css`
    color: black;
    text-decoration: none;
    display: inline-block;
    position: relative;
    margin: 0 1rem;
  `

  const stylesActiveLink = css`
    ${stylesLink}
    border-bottom: 2px solid #ef314a;
  `

  const linkTo = (url, text) => (
    <Link
      css={location.pathname === url ? stylesActiveLink : stylesLink}
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

export default props => (
  <Location>
    {locationProps => <Navbar {...locationProps} {...props} />}
  </Location>
);
