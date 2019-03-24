import React, { useEffect, useRef, useState } from "react"
import { provinces, filterPath } from "../models/information"
import { labelColor, DISPLAY_FONT } from "../styles"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSearch } from "@fortawesome/free-solid-svg-icons"
import { Link } from "gatsby"
import Fuse from "fuse.js"
import _ from "lodash"

const searcher = new Fuse(provinces, {
  keys: ["name"],
})

export default ({ onProvinceSelect }) => {
  const defaultProvinceState = {
    id: 0,
    name: "จังหวัด",
  }
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [currentProvince, setCurrentProvince] = useState(defaultProvinceState)

  const [searchKeyword, setSearchKeyword] = useState("")

  const dropdownRef = useRef()

  const handleClickOutside = e => {
    if (
      !!dropdownRef.current &&
      !dropdownRef.current.contains(e.target) &&
      !!currentProvince
    ) {
      setDropdownOpen(false)
    }
  }
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  })

  function provinceItem(p) {
    return (
      <div
        css={{
          display: "grid",
          gridTemplateColumns: "30px auto",
          textAlign: "left",
        }}
      >
        <div
          css={{
            fontSize: "1rem",
            paddingLeft: 8,
            fontFamily: DISPLAY_FONT,
            color: "#888888",
          }}
        >
          <b>{p.name}</b>
        </div>
      </div>
    )
  }

  function renderDefaultDropdown() {
    return (
      <div
        css={{
          cursor: "pointer",
          alignItems: "center",
          position: "relative",
          padding: 10,
          alignItems: "center",
          boxShadow: "0 2px 4px 0 rgba(0,0,0,0.12)",
        }}
        onClick={() => setDropdownOpen(true)}
      >
        {provinceItem(currentProvince)}
        <div
          css={{
            position: "absolute",
            right: 20,
            top: "calc(50% - 10px)",
            border: "solid #212121",
            borderWidth: "0 2px 2px 0",
            padding: 4,
            transform: "rotate(45deg)",
          }}
        />
      </div>
    )
  }

  function renderDropdown() {
    let filteredProvinces = provinces
    if (searchKeyword.length > 0) {
      filteredProvinces = searcher.search(searchKeyword)
    }

    return (
      <div
        css={{
          position: "absolute",
          zIndex: 1,
          background: "white",
          width: "inherit",
          boxShadow: "0 2px 4px 0 rgba(0,0,0,0.12)",
        }}
        ref={dropdownRef}
      >
        <div css={{ position: "relative", padding: 10 }}>
          <input
            autoFocus
            css={{
              border: `1px solid ${labelColor}`,
              width: "100%",
              boxSizing: "border-box",
              padding: 10,
              fontSize: 16,
              "&:focus": { outline: 0 },
            }}
            value={searchKeyword}
            placeholder="ชื่อจังหวัด"
            onChange={e => {
              setSearchKeyword(e.target.value)
            }}
          />
          <div
            css={{
              top: 20,
              position: "absolute",
              right: 20,
              color: labelColor,
            }}
          >
            <FontAwesomeIcon icon={faSearch} />
          </div>
        </div>
        <div
          css={{
            height: "calc(70vh - 200px)",
            overflowX: "hidden",
            overflowY: "auto",
            WebkitOverflowScrolling: "touch",
            padding: 10,
          }}
        >
          <ul css={{ listStyle: "none", padding: 0 }}>
            {filteredProvinces.map(p => (
              <Link
                key={p.id}
                to={filterPath(p.name)}
                style={{ color: "black", textDecoration: "none" }}
                onClick={() => {
                  setDropdownOpen(false)
                  setCurrentProvince(p)
                  onProvinceSelect && onProvinceSelect()
                }}
              >
                <li
                  css={{
                    padding: "12px 0px",
                    borderBottom: "1px solid gray",
                    position: "relative",
                  }}
                >
                  {provinceItem(p)}
                </li>
              </Link>
            ))}
          </ul>
        </div>
      </div>
    )
  }

  return (
    <div
      css={{
        position: "relative",
        background: "white",
        width: "inherit",
        marginBottom: 15,
      }}
    >
      {dropdownOpen ? renderDropdown() : null}
      {renderDefaultDropdown()}
    </div>
  )
}
