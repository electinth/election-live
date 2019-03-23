import React from "react"
import { parties, partyLogo, partyPath } from "../models/information"
import { labelColor, DISPLAY_FONT } from "../styles"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSearch } from "@fortawesome/free-solid-svg-icons"
import { Link } from "gatsby"
import Fuse from "fuse.js"

const searcher = new Fuse(parties, {
  keys: ["codeEN", "codeTH", "name"],
})
export default ({ open }) => {
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
          css={{ fontSize: "1rem", paddingLeft: 15, fontFamily: DISPLAY_FONT }}
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
        // @todo #1 toggle open dropdown
        onClick={() => {
          // open = true
        }}
      >
        {partyItem(parties[0])}
      </div>
    )
  }

  function renderDropdown() {
    const [searchKeyword, setSearchKeyword] = React.useState("")

    let filteredParties = parties
    if (searchKeyword.length > 0) {
      filteredParties = searcher.search(searchKeyword)
    }

    return (
      <div
        css={{
          position: "relative",
        }}
      >
        <div css={{ position: "relative" }}>
          <input
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
              <li
                key={p.id}
                css={{
                  padding: "12px 0px",
                  borderBottom: "1px solid gray",
                  position: "relative",
                }}
              >
                <Link
                  to={partyPath(p)}
                  style={{ color: "black", textDecoration: "none" }}
                >
                  {partyItem(p)}
                </Link>
              </li>
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
        margin: "0 auto",
        width: "285px",
        marginTop: 30,
      }}
    >
      <div
        css={{
          padding: "10px",
          alignItems: "center",
          position: "relative",
        }}
      >
        {open ? renderDropdown() : renderDefaultDropdown()}
      </div>
      {open ? null : (
        <div
          css={{
            position: "absolute",
            right: "4px",
            top: "calc(50% - 3px)",
            border: "solid #212121",
            borderWidth: "0 2px 2px 0",
            padding: "4px",
            transform: "rotate(45deg)",
          }}
        />
      )}
    </div>
  )
}
