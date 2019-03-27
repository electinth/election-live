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
      <div css={{ fontSize: 20, fontWeight: "bold" }}>เขตพื้นที่</div>
      <ul css={{ padding: 0, listStyle: "none" }}>
        {renderFilter("all")}
        {renderFilter("northern")}
        {renderFilter("northeastern")}
        {renderFilter("central")}
        {renderFilter("southern")}
        {renderFilterSearch()}
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
              <div
                css={{
                  marginLeft: 10,
                }}
              >
                <input
                  disabled={!current}
                  ref={inputRef}
                  css={{
                    border: `1px solid`,
                    borderColor: state.provinceError ? "#FF0000" : "#999999",
                    width: "200px",
                    boxSizing: "border-box",
                    padding: 10,
                    fontSize: 16,
                  }}
                  onChange={e => {
                    // @todo #223 show dropdown or "autocomplete" for province name?
                    const { value } = e.target
                    setState({ ...state, value: value, provinceError: false })
                  }}
                  onBlur={e => {
                    if (!state.noOnBlur) {
                      setState({ ...state, value: state.query })
                    } else {
                      setState({
                        ...state,
                        noOnBlur: false,
                        provinceError: false,
                      })
                    }
                  }}
                  onKeyPress={e => {
                    const { value } = state
                    if (e.key == "Enter") {
                      if (isProvinceExist(state.value)) {
                        trackEvent("Search for province")
                        setState(
                          { ...state, query: state.value },
                          navigate(filterPath(state.value))
                        )
                      } else {
                        setState({
                          ...state,
                          value: value,
                          noOnBlur: true,
                          provinceError: true,
                        })
                      }
                    }
                  }}
                  value={state.value}
                />
                <span
                  css={{
                    display: state.provinceError ? "block" : "none",
                    color: "#FF0000",
                    width: "100%",
                  }}
                >
                  ไม่พบจังหวัดที่ท่านระบุ
                </span>
              </div>
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
                    {label.length > 0 ? label : areaFilters[filterName].name.th}
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
