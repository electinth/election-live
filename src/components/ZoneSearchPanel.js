import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import React, { useState, useRef, useLayoutEffect } from "react"
import { zonesForSearch, zonePath } from "../models/information"
import { labelColor } from "../styles"
import { Link } from "gatsby"
import { faSearch } from "@fortawesome/free-solid-svg-icons"
import Fuse from 'fuse.js'


const fuse = new Fuse(zonesForSearch, {
  keys: ['inclusionAreas', 'province.name']
})

export function ZoneSearchPanel({ autoFocus, onSearchCompleted }) {
  // @todo #1 [UI polish] Polish the spacing in ZoneSearchPanel to match the design.
  const [state, setState] = useState({
    isSearchOpen: false,
    zoneQuery: null,
  })
  const inputRef = useRef(/** @type {HTMLInputElement} */ (null))
  useLayoutEffect(() => {
    if (autoFocus && inputRef.current) {
      inputRef.current.focus()
    }
  }, [autoFocus])
  return (
    <div css={{ position: "relative" }}>
      <input
        ref={inputRef}
        css={{
          border: `1px solid ${labelColor}`,
          width: "100%",
          boxSizing: "border-box",
          padding: 10,
          fontSize: 16,
          marginTop: 20,
        }}
        placeholder="ค้นหาจาก ชื่อ ตำบล อำเภอ หรือ จังหวัด"
        onChange={v => {
          const query = v.target.value
          setState({ zoneQuery: query, isSearchOpen: query.length > 2 })
        }}
        value={state.zoneQuery}
      />
      <div
        css={{
          top: 30,
          position: "absolute",
          right: 10,
          color: labelColor,
        }}
      >
        <FontAwesomeIcon icon={faSearch} />
      </div>

      {state.isSearchOpen && (
        <ul css={{ listStyle: "none", padding: 0 }}>
          { // @todo #1 Update zone filtering logic to allow searching by postal code
            fuse.search(state.zoneQuery)
            .map(z => {
              return (
                <li
                  key={`${z.zone.provinceId}-${z.zone.no}`}
                  css={{
                    padding: "12px 0px",
                    borderBottom: "1px solid gray",
                    position: "relative",
                  }}
                >
                  <Link
                    to={zonePath(z.zone)}
                    onClick={onSearchCompleted}
                    css={{
                      width: "calc(100% - 24px)",
                      display: "block",
                      color: "inherit",
                      textDecoration: "none",
                    }}
                  >
                    <div css={{ fontSize: 16 }}>
                      <b>
                        {z.province.name} เขตเลือกตั้งที่ {z.zone.no}
                      </b>
                    </div>
                    <div
                      css={{
                        color: "gray",
                      }}
                    >
                      {z.zone.details}
                    </div>
                  </Link>
                  <div
                    css={{
                      position: "absolute",
                      right: "4px",
                      top: "calc(50% - 3px)",
                      border: "solid #212121",
                      borderWidth: "0 2px 2px 0",
                      // display: 'inline-block',
                      padding: "4px",
                      transform: "rotate(-45deg)",
                    }}
                  />
                </li>
              )
            })}
        </ul>
      )}
    </div>
  )
}
