import React from "react"
import TestRenderer from "react-test-renderer"
import NavBar from "../NavBar"
import { Link } from "gatsby"

// example test. might not need.
describe("Navbar", () => {
  let renderer

  beforeEach(() => {
    renderer = TestRenderer.create(<NavBar />)
  })

  test("should have 4 Links, but 3 for now", () => {
    const root = renderer.root
    const links = root.findAll(el => el.type === Link)
    expect(links).toHaveLength(3)
  })
})
