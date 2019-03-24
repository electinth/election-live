import React, { useEffect, useRef, useState } from "react"
import { parties, partyLogo, partyPath } from "../models/information"
import { labelColor, DISPLAY_FONT } from "../styles"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSearch } from "@fortawesome/free-solid-svg-icons"
import { Link } from "gatsby"
import Fuse from "fuse.js"

const searcher = new Fuse(parties, {
  keys: ["codeEN", "codeTH", "name"],
})

export default ({ partyId }) => {
  const [dropdownOpen, setDropdownOpen] = useState(!partyId ? true : false)
  const [currentParty, setCurrentParty] = useState(
    partyId ? parties.find(p => p.id === partyId) : parties[0]
  )

  const [searchKeyword, setSearchKeyword] = useState("")

  const dropdownRef = useRef()

  const handleClickOutside = e => {
    if (!!dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      setDropdownOpen(false)
    }
  }
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  })

  function partyItem(p) {
    return (
      <div
        css={{
          display: "grid",
          gridTemplateColumns: "30px auto",
          textAlign: "left",
        }}
      >
        <img
          alt=""
          src={partyLogo(p.name)}
          css={{
            maxHeight: "100%",
            maxWidth: "100%",
            width: "auto",
            height: "auto",
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            margin: "auto",
          }}
        />
        <div
          css={{ fontSize: "1rem", paddingLeft: 8, fontFamily: DISPLAY_FONT }}
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
        }}
        onClick={() => setDropdownOpen(true)}
      >
        {partyItem(currentParty)}
      </div>
    )
  }

  function renderDropdown() {
    let filteredParties = parties
    if (searchKeyword.length > 0) {
      filteredParties = searcher.search(searchKeyword)
    }

    return (
      <div
        css={{
          position: "relative",
        }}
        ref={dropdownRef}
      >
        <div css={{ position: "relative" }}>
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
            placeholder="ชื่อพรรคการเมือง"
            onChange={e => {
              setSearchKeyword(e.target.value)
            }}
          />
          <div
            css={{
              top: 10,
              position: "absolute",
              right: 10,
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
          }}
        >
          <ul css={{ listStyle: "none", padding: 0 }}>
            {filteredParties.map(p => (
              <Link
                key={p.id}
                to={partyPath(p)}
                style={{ color: "black", textDecoration: "none" }}
                onClick={() => {
                  setDropdownOpen(false)
                  setCurrentParty(p)
                }}
              >
                <li
                  css={{
                    padding: "12px 0px",
                    borderBottom: "1px solid gray",
                    position: "relative",
                  }}
                >
                  {partyItem(p)}
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
        zIndex: 1,
        background: "white",
      }}
    >
      <div
        css={{
          padding: 10,
          alignItems: "center",
          position: "relative",
          boxShadow: "0 2px 4px 0 rgba(0,0,0,0.12)",
        }}
      >
        {dropdownOpen ? renderDropdown() : renderDefaultDropdown()}
      </div>
      {dropdownOpen ? null : (
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
      )}
    </div>
  )
}
