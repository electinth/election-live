import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import React, { useState, useRef, useLayoutEffect } from "react"
import { zonesForSearch, zonePath } from "../models/information"
import { labelColor } from "../styles"
import { Link } from "gatsby"
import { faSearch } from "@fortawesome/free-solid-svg-icons"

export function ZoneSearchPanel({ autoFocus, onSearchCompleted }) {
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
          {zonesForSearch
            .filter(z => {
              // @todo #1 Update zone filtering logic to allow searching
              //  by postal code and province name.
              return z.inclusionAreas.indexOf(state.zoneQuery) > -1
            })
            .map(z => {
              return (
                <li
                  key={`${z.zone.provinceId}-${z.zone.no}`}
                  css={{
                    padding: "20px 10px",
                    borderBottom: "1px solid black",
                  }}
                >
                  <Link
                    to={zonePath(z.zone)}
                    onClick={onSearchCompleted}
                    css={{
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
                    <div>{z.zone.details}</div>
                  </Link>
                </li>
              )
            })}
        </ul>
      )}
    </div>
  )
}
