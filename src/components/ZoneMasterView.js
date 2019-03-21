import { faSearch } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import React, { useCallback, useState } from "react"
import {
  buttonStyle,
  DESKTOP_MIN_WIDTH,
  labelColor,
  media,
  Responsive,
} from "../styles"
import ContentWrapper from "./ContentWrapper"
import ElectionMap from "./ElectionMap"
import { ZoneFilterPanel, ZoneFilterContext } from "./ZoneFilterPanel"
import { ZoneSearchPanel } from "./ZoneSearchPanel"
import { filters } from "../models/information"
import CloseButton from "./CloseButton"
import { keyframes } from "@emotion/core"

/**
 * @param {object} props
 * @param {React.ReactNode} props.contentHeader
 * @param {React.ReactNode} props.contentBody
 * @param {React.ReactNode} props.popup
 */
export default function ZoneMasterView({ contentHeader, contentBody, popup }) {
  const hideOnDesktop = { [media(DESKTOP_MIN_WIDTH)]: { display: "none" } }
  const [activeSidebar, setActiveSidebar] = useState(
    /** @type {'filter' | 'search' | null} */ (null)
  )
  const clearActiveSidebar = useCallback(
    () => setActiveSidebar(null),
    setActiveSidebar
  )

  return (
    <div>
      <ContentWrapper>
        <div
          data-hidden={popup ? true : undefined}
          css={{
            position: "fixed",
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 2,
            transition: "0.5s transform",
            "&[data-hidden]": {
              transform: "translateY(120%)",
            },
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
              [media(DESKTOP_MIN_WIDTH)]: {
                order: 3,
                width: 320,
                margin: 0,
                padding: 16,
              },
            }}
          >
            {popup ? <Popup>{popup}</Popup> : null}

            <div css={{ margin: "10px 0", ...hideOnDesktop }}>
              {renderMobileZoneFilterAndSearch()}
            </div>

            <div css={{ position: "relative" }}>
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

          {/* Filters panel */}
          <div
            css={{
              display: "none",
              [media(DESKTOP_MIN_WIDTH)]: {
                display: "block",
                order: 1,
                margin: "0 0 10px",
                padding: 0,
              },
            }}
          >
            <div css={{ marginTop: 10 }}>
              {
                // @todo #1 Implement and style search button on desktop.
              }
              <button
                css={{ float: "right" }}
                onClick={() => setActiveSidebar("search")}
              >
                Search
              </button>
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
        <Responsive
          breakpoint={DESKTOP_MIN_WIDTH}
          narrow={renderMobileSidebar()}
          wide={renderMobileSidebar()}
        />
      </ContentWrapper>
    </div>
  )

  function renderMobileZoneFilterAndSearch() {
    const boxHeight = 56
    return (
      <div css={{ display: "flex", height: boxHeight, padding: "0 10px" }}>
        <button
          css={{
            ...buttonStyle,
            flex: 1,
            height: boxHeight,
          }}
          onClick={() => setActiveSidebar("filter")}
        >
          <div css={{ padding: "0 15px" }}>
            <div css={{ color: labelColor, fontSize: 12 }}>แสดงผล</div>
            <ZoneFilterContext.Consumer>
              {currentFilterName => {
                const name = filters[currentFilterName].name.th
                return <div css={{ fontSize: 16, fontWeight: 600 }}>{name}</div>
              }}
            </ZoneFilterContext.Consumer>
          </div>
        </button>
        <div css={{ flex: "none", marginLeft: 16, width: boxHeight }}>
          <button
            css={{
              ...buttonStyle,
              width: boxHeight,
              height: boxHeight,
              verticalAlign: "middle",
              textAlign: "center",
              lineHeight: `${boxHeight}px`,
            }}
            onClick={() => setActiveSidebar("search")}
          >
            <span role="img" aria-label="mobile zone search">
              <FontAwesomeIcon icon={faSearch} />
            </span>
          </button>
        </div>
      </div>
    )
  }

  function renderMobileSidebar() {
    return (
      <React.Fragment>
        <MobileSidebar
          title="ค้นหาเขตเลือกตั้ง"
          active={activeSidebar === "search"}
          onClose={clearActiveSidebar}
          width={300}
        >
          <ZoneSearchPanel
            autoFocus={activeSidebar === "search"}
            onSearchCompleted={clearActiveSidebar}
          />
        </MobileSidebar>
        <MobileSidebar
          title="ตัวเลือกแสดงผล"
          active={activeSidebar === "filter"}
          onClose={clearActiveSidebar}
        >
          <ZoneFilterPanel
            autoFocus={activeSidebar === "filter"}
            onFilterSelect={clearActiveSidebar}
          />
        </MobileSidebar>
      </React.Fragment>
    )
  }

  function renderMobileTabs() {
    const menuStyle = {
      width: "50%",
      display: "inline-block",
      verticalAlign: "middle",
      lineHeight: "48px",
    }

    return (
      <div
        css={{
          background: "white",
          textAlign: "center",
          fontSize: 16,
          borderTop: "1px solid #eee",
          height: 48,
          fontWeight: "bold",
        }}
      >
        <span
          css={{ ...menuStyle, borderTop: true ? "2px solid black" : "0px" }}
        >
          สรุปข้อมูล
        </span>
        <span
          css={{ ...menuStyle, borderTop: false ? "2px solid black" : "0px" }}
        >
          แผนที่
        </span>
      </div>
    )
  }
}

function MobileSidebar({ title, children, active, onClose, width = 200 }) {
  return (
    <div
      data-active={active ? true : undefined}
      css={{
        background: "white",
        boxShadow: "1px 0 1px rgba(0,0,0,0.25)",
        position: "fixed",
        top: 0,
        left: 0,
        bottom: 0,
        width: width,
        zIndex: 10,
        padding: "0 16px",
        transform: "translateX(-120%)",
        transition: "0.5s transform",
        overflowX: "hidden",
        overflowY: "auto",
        WebkitOverflowScrolling: "touch",
        "&[data-active]": {
          transform: "translateX(0%)",
        },
      }}
    >
      <CloseButton onClick={onClose} />
      <div css={{ marginTop: 10 }}>
        <div css={{ color: labelColor, fontWeight: 600 }}>{title}</div>
        {children}
      </div>
    </div>
  )
}

function Popup({ children }) {
  return (
    <div
      css={{
        position: "fixed",
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        zIndex: 20,
        background: "#eee",
        animation: `${popup} 0.7s`,
        [media(DESKTOP_MIN_WIDTH)]: {
          position: "absolute",
          animation: "none",
        },
      }}
    >
      {children}
    </div>
  )
}

const popup = keyframes({
  from: {
    transform: "translateY(100%) scale(0.5)",
  },
  "50%": {
    transform: "scale(0.5)",
  },
  to: {
    transform: "translateY(0%)",
  },
})
