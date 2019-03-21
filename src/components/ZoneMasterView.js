import { faSearch, faTimes } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import React, { useState } from "react"
import { buttonStyle, DESKTOP_MIN_WIDTH, labelColor, media } from "../styles"
import ContentWrapper from "./ContentWrapper"
import ElectionMap from "./ElectionMap"
import Placeholder from "./Placeholder"
import Unimplemented from "./Unimplemented"
import { ZoneFilterPanel } from "./ZoneFilterPanel"

export default function ZoneMasterView({ contentHeader, contentBody, popup }) {
  const hideOnDesktop = { [media(DESKTOP_MIN_WIDTH)]: { display: "none" } }
  const [state, setState] = useState({
    isSearchOpen: false,
    isFilterOpen: false,
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
              <FontAwesomeIcon icon={faSearch} />
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
            <FontAwesomeIcon icon={faTimes} />
          </div>

          <div
            css={{
              display: state.isSearchOpen ? "block" : "none",
            }}
          >
            <div css={{ color: labelColor, fontWeight: 600 }}>
              ค้นหาเขตเลือกตั้ง
            </div>
          </div>
        </div>
      </div>
    )
  }
}
