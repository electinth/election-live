import { faCheckCircle, faCircle } from "@fortawesome/free-regular-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Link } from "gatsby"
import { navigate } from "@reach/router"
import React, { createContext, useRef, useLayoutEffect, useState } from "react"
import {
  filterPath,
  filters as areaFilters,
  isProvinceExist,
} from "../models/information"
import { trackEvent } from "../util/analytics"
import HelpTooltip from "./HelpTooltip"
import { __, LocalizedText } from "./LocalizedText"

export const ZoneFilterContext = createContext(
  /** @type {ZoneFilterName} */ ("all")
)

export function ZoneFilterPanel({ onFilterSelect, autoFocus }) {
  const currentLinkRef = useRef(/** @type {HTMLAnchorElement} */ (null))
  useLayoutEffect(() => {
    if (autoFocus && currentLinkRef.current) {
      currentLinkRef.current.focus()
    }
  }, [autoFocus])

  return (
    <div>
      <div css={{ fontSize: 20, fontWeight: "bold" }}>{__("เขตพื้นที่")}</div>
      <ul css={{ padding: 0, listStyle: "none" }}>
        {renderFilter("all")}
        {renderFilter("northern")}
        {renderFilter("northeastern")}
        {renderFilter("central")}
        {renderFilter("southern")}
        {renderFilterSearch()}
      </ul>
      <div css={{ fontSize: 20, fontWeight: "bold" }}>
        {__("ตัวเลือกพิเศษ")}
      </div>
      <ul css={{ padding: 0, listStyle: "none" }}>
        {renderFilter("urban")}
        {renderFilter("rural")}
        {renderFilter("gerrymandering")}
        {renderFilter("swing")}
      </ul>
    </div>
  )

  function renderFilterSearch() {
    const [state, setState] = useState({
      query: "กรุงเทพมหานคร",
      value: "กรุงเทพมหานคร",
    })
    const inputRef = useRef(/** @type {HTMLInputElement} */ (null))
    useLayoutEffect(() => {
      if (autoFocus && inputRef.current) {
        inputRef.current.focus()
      }
    }, [autoFocus])
    return (
      <div css={{ display: "flex", flexDirection: "row" }}>
        {renderFilter(state.query, "จังหวัด")}
        <ZoneFilterContext.Consumer>
          {currentFilterName => {
            const current = currentFilterName === state.query
            return (
              <input
                disabled={!current}
                ref={inputRef}
                css={{
                  border: `1px solid "#999999"`,
                  width: "200px",
                  boxSizing: "border-box",
                  padding: 10,
                  fontSize: 16,
                  marginLeft: 10,
                }}
                onChange={e => {
                  const { value } = e.target
                  setState({ ...state, value: value })
                }}
                onBlur={e => {
                  setState({ ...state, value: state.query })
                }}
                onKeyPress={e => {
                  if (e.key == "Enter" && isProvinceExist(state.value)) {
                    trackEvent("Search for province")
                    setState(
                      { ...state, query: state.value },
                      navigate(filterPath(state.value))
                    )
                  }
                }}
                value={state.value}
              />
            )
          }}
        </ZoneFilterContext.Consumer>
      </div>
    )
  }

  /**
   * @param {ZoneFilterName} filterName
   * @param {string} label
   */
  function renderFilter(filterName, label = "") {
    return (
      <div>
        <ZoneFilterContext.Consumer>
          {currentFilterName => {
            const current = currentFilterName === filterName
            return (
              <li css={{ paddingTop: 10, paddingBottom: 10 }}>
                <Link
                  to={filterPath(filterName)}
                  onClick={() => {
                    trackEvent("Select zone filter", {
                      filter: filterName,
                    })
                    if (onFilterSelect) onFilterSelect(filterName)
                  }}
                  ref={current ? currentLinkRef : undefined}
                  css={{
                    display: "block",
                    textDecoration: "none",
                    color: current ? "#000000" : "#999999",
                  }}
                >
                  <span css={{ marginRight: 10 }}>
                    {current && <FontAwesomeIcon icon={faCheckCircle} />}
                    {!current && <FontAwesomeIcon icon={faCircle} />}
                  </span>
                  <span>
                    {label.length > 0 ? (
                      label
                    ) : (
                      <LocalizedText
                        thai={areaFilters[filterName].name.th}
                        english={areaFilters[filterName].name.en}
                      />
                    )}
                  </span>
                  {areaFilters[filterName].description ? (
                    <HelpTooltip
                      description={areaFilters[filterName].description.th}
                    />
                  ) : null}
                </Link>
              </li>
            )
          }}
        </ZoneFilterContext.Consumer>
      </div>
    )
  }
}
