import React from "react"
import { Link } from "gatsby"
import styles from "./NavBar.module.css"

export default function NavBar() {
  const linkTo = (url, text) => (
    <Link className={styles.link} activeClassName={styles.activeLink} to={url}>
      {text}
    </Link>
  )
  return (
    <nav className={styles.nav}>
      {linkTo("/", "ดูผลตามพื้นที่")}
      {linkTo("/party/", "ดูผลตามพรรค")}
      {linkTo("/overview/", "ภาพรวมผลลัพธ์")}
      {linkTo("/source/", "ข้อมูลเรามาจากไหน")}
    </nav>
  )
}
