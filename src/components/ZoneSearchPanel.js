import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import React, { useState, useRef, useLayoutEffect } from "react"
import { zonesForSearch } from "../models/information"
import { labelColor } from "../styles"

export function ZoneSearchPanel({ autoFocus }) {
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
    <div>
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
          top: 80,
          position: "absolute",
          right: 30,
          color: labelColor,
        }}
      >
        <FontAwesomeIcon icon="search" />
      </div>

      {state.isSearchOpen && (
        <ul css={{ listStyle: "none", padding: 0 }}>
          {zonesForSearch
            .filter(z => {
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
                  onClick={() =>
                    // @todo link to zone page
                    alert(` go to zone page ${z.zoneKey}`)
                  }
                >
                  <div css={{ fontSize: 16 }}>
                    <b>
                      {z.province.name} เขตเลือกตั้งที่ {z.zone.no}
                    </b>
                  </div>
                  <div>{z.zone.details}</div>
                </li>
              )
            })}
        </ul>
      )}
    </div>
  )
}
