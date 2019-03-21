import React, { useState } from "react"
import Placeholder from "./Placeholder"
import ContentWrapper from "./ContentWrapper"
import { media, DESKTOP_MIN_WIDTH, buttonStyle, labelColor } from "../styles"
import ElectionMap from "./ElectionMap"
import Unimplemented from "./Unimplemented"
import { ZoneFilterPanel } from "./ZoneFilterPanel"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { applyMiddleware } from "redux"

import { faCheckCircle, faCircle } from "@fortawesome/free-regular-svg-icons"

import { zonesForSearch, filters as areaFilters } from "../models/information"

export default function ZoneMasterView({ contentHeader, contentBody, popup }) {
  const hideOnDesktop = { [media(DESKTOP_MIN_WIDTH)]: { display: "none" } }
  const [state, setState] = useState({
    isSearchOpen: false,
    isFilterOpen: true,
    zoneQuery: null,
  })

  return (
    <div>
      <ContentWrapper>
        {renderSearchAndFilterPanel()}
        <div
          css={{
            position: "fixed",
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 2,
            ...hideOnDesktop,
          }}
        >
          {renderMobileTabs()}
        </div>
        <div
          css={{
            [media(DESKTOP_MIN_WIDTH)]: { display: "flex" },
          }}
        >
          {/* Main content */}
          <div
            css={{
              position: "relative",
              zIndex: 1,
              margin: "0 auto",
              [media(DESKTOP_MIN_WIDTH)]: { order: 3, width: 288, margin: 0 },
            }}
          >
            <div css={{ marginTop: 10, ...hideOnDesktop }}>
              {renderMobileZoneFilterAndSearch()}
            </div>

            <div css={{ marginTop: 10 }}>
              {contentHeader}
              <div
                css={{
                  [media(DESKTOP_MIN_WIDTH)]: {
                    height: 440,
                    overflowX: "hidden",
                    overflowY: "auto",
                    WebkitOverflowScrolling: "touch",
                  },
                }}
              >
                {contentBody}
              </div>
            </div>
          </div>

          {/* Filters */}
          <div
            css={{
              display: "none",
              [media(DESKTOP_MIN_WIDTH)]: {
                display: "block",
                order: 1,
                width: 200,
                margin: "0 0 10px",
              },
            }}
          >
            <div css={{ marginTop: 10 }}>
              {
                // @todo #1 Create a 1st version of ZoneSearchField component
                //  in place of the Placeholder. May be a dummy component.
              }
              <Unimplemented componentName="ZoneSearchField" height={40} />
            </div>
            <div css={{ marginTop: 10 }}>
              <ZoneFilterPanel />
            </div>
          </div>

          {/* Election map */}
          <div
            css={{
              display: "none",
              [media(DESKTOP_MIN_WIDTH)]: {
                display: "block",
                order: 2,
                width: 375,
                margin: "10px auto",
              },
            }}
          >
            <ElectionMap />
          </div>
        </div>
      </ContentWrapper>
    </div>
  )

  function renderMobileZoneFilterAndSearch() {
    const boxHeight = 56
    // @todo #42 Height and margins for mobile zone filter and search?
    return (
      <div css={{ display: "flex", height: boxHeight, padding: "0 10px" }}>
        <div
          css={{
            flex: 1,
            height: boxHeight,
            ...buttonStyle,
          }}
          onClick={() => setState({ isFilterOpen: true })}
        >
          <div css={{ paddingLeft: 15, paddingTop: 5 }}>
            <div css={{ color: labelColor, fontSize: 12 }}>แสดงผล</div>
            <div css={{ fontSize: 16, fontWeight: 600 }}>ทั่วประเทศ</div>
          </div>
        </div>
        <div css={{ flex: "none", marginLeft: 10, width: boxHeight }}>
          <div
            css={{
              width: boxHeight,
              height: boxHeight,
              verticalAlign: "middle",
              textAlign: "center",
              lineHeight: `${boxHeight}px`,
              ...buttonStyle,
            }}
            onClick={() => setState({ isSearchOpen: true })}
          >
            <span role="img" aria-label="mobile zone search">
              <FontAwesomeIcon icon="search" />
            </span>
          </div>
        </div>
      </div>
    )
  }

  function renderMobileTabs() {
    // @todo #42 Implement the first version of mobile tabs
    //  May be a dummy component that looks like the real one.
    return <Placeholder height={40}>สรุปข้อมูล | แผนที่</Placeholder>
  }

  function renderSearchAndFilterPanel() {
    return (
      <div
        css={{
          position: "absolute",
          display: state.isSearchOpen || state.isFilterOpen ? "block" : "none",
          left: 0,
          top: 0,
          width: "100%",
          height: "100%",
          background: "white",
          zIndex: 1000,
          minHeight: "100vh",
        }}
      >
        <div css={{ padding: 20 }}>
          <div
            css={{ float: "right", fontSize: 20 }}
            onClick={() =>
              setState({
                isSearchOpen: false,
                isFilterOpen: false,
                zoneQuery: "",
              })
            }
          >
            <FontAwesomeIcon icon="times" />
          </div>

          <div
            css={{
              display: state.isSearchOpen ? "block" : "none",
            }}
          >
            <div css={{ color: labelColor, fontWeight: 600 }}>
              ค้นหาเขตเลือกตั้ง
            </div>
            <div>
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
                  ref={component => {
                    if (component) {
                      component.focus()
                    }
                  }}
                  placeholder="ค้นหาจาก ชื่อ ตำบล อำเภอ หรือ จังหวัด"
                  onChange={v => {
                    const query = v.target.value
                    if (query && query.length > 2) {
                      setState({ zoneQuery: query, isSearchOpen: true })
                    }
                  }}
                  value={state.zoneQuery}
                />
              </div>
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
            </div>

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
                        alert(`TODO: go to zone page ${z.zoneKey}`)
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
          </div>
          <div
            css={{
              display: state.isFilterOpen ? "relative" : "none",
            }}
          >
            <div css={{ color: labelColor, fontWeight: 600 }}>
              ตัวเลือกแสดงผล
            </div>
            <div
              css={{
                borderBottom: "1px solid black",
                marginBottom: 10,
                marginTop: 10,
              }}
            >
              <div css={{ fontSize: 20, fontWeight: "bold" }}>เขตพื้นที่</div>
              <ul css={{ padding: 0, listStyle: "none" }}>
                {["all", "northern", "northeastern", "central", "southern"].map(
                  a => {
                    return (
                      <li key={a} css={{ paddingTop: 10, paddingBottom: 10 }}>
                        <span css={{ marginRight: 10 }}>
                          <FontAwesomeIcon icon={faCheckCircle} />
                          <FontAwesomeIcon icon={faCircle} />
                        </span>
                        {areaFilters[a].name.th}
                      </li>
                    )
                  }
                )}
              </ul>
            </div>
            <div>
              <div css={{ fontSize: 20, fontWeight: "bold" }}>
                ตัวเลือกพิเศษ
              </div>
              <ul css={{ padding: 0, listStyle: "none" }}>
                {["rural", "gerrymandering", "swing"].map(a => {
                  return (
                    <li key={a} css={{ paddingTop: 10, paddingBottom: 10 }}>
                      <span css={{ marginRight: 10 }}>
                        <FontAwesomeIcon icon={faCheckCircle} />
                        <FontAwesomeIcon icon={faCircle} />
                      </span>
                      {areaFilters[a].name.th}
                    </li>
                  )
                })}
              </ul>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
