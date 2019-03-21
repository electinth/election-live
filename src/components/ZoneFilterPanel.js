import { faCheckCircle, faCircle } from "@fortawesome/free-regular-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Link } from "gatsby"
import React, { createContext, useState } from "react"
import {
  zonesForSearch,
  filterPath,
  filters as areaFilters,
} from "../models/information"
import { labelColor } from "../styles"

const ZoneFilterContext = createContext(/** @type {ZoneFilterName} */ ("all"))

export const ZoneFilterContextProvider = ZoneFilterContext.Provider

const styles = {
  label: { color: labelColor, fontWeight: 600 },
}

export function ZoneFilterPanel() {
  return (
    <div>
      <div css={styles.label}> ค้นหาเขตเลือกตั้ง</div>
      <ZoneSearch />
      <div css={styles.label}>ตัวเลือกแสดงผล</div>
      <div css={{ fontSize: 20, fontWeight: "bold" }}>เขตพื้นที่</div>
      <ul css={{ padding: 0, listStyle: "none" }}>
        {renderFilter("all")}
        {renderFilter("northern")}
        {renderFilter("northeastern")}
        {renderFilter("central")}
        {renderFilter("southern")}
      </ul>
      <div css={{ fontSize: 20, fontWeight: "bold" }}>ตัวเลือกพิเศษ</div>
      <ul css={{ padding: 0, listStyle: "none" }}>
        {renderFilter("urban")}
        {renderFilter("rural")}
        {renderFilter("gerrymandering")}
        {renderFilter("swing")}
      </ul>
    </div>
  )

  /**
   * @param {ZoneFilterName} filterName
   */
  function renderFilter(filterName) {
    return (
      <div>
        <ZoneFilterContext.Consumer>
          {currentFilterName => {
            const current = currentFilterName === filterName
            return (
              <li css={{ paddingTop: 10, paddingBottom: 10 }}>
                <Link
                  to={filterPath(filterName)}
                  css={{
                    opacity: current ? 1 : 0.62,
                    display: "block",
                    textDecoration: "none",
                    color: "inherit",
                  }}
                >
                  <span css={{ marginRight: 10 }}>
                    {current && <FontAwesomeIcon icon={faCheckCircle} />}
                    {!current && <FontAwesomeIcon icon={faCircle} />}
                  </span>
                  <span>{areaFilters[filterName].name.th}</span>
                </Link>
              </li>
            )
          }}
        </ZoneFilterContext.Consumer>
      </div>
    )
  }
}

function ZoneSearch() {
  const [state, setState] = useState({
    isSearchOpen: false,
    isFilterOpen: false,
    zoneQuery: null,
  })
  return (
    <div>
      <input
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
