import { faSearch, faTimes } from "@fortawesome/free-solid-svg-icons"
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
import { ZoneFilterPanel } from "./ZoneFilterPanel"
import { ZoneSearchPanel } from "./ZoneSearchPanel"

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

            <div css={{ marginTop: 10, position: "relative" }}>
              {popup ? <Popup>{popup}</Popup> : null}
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
              <ZoneFilterPanel triggerSearch={activeSidebar === "search"} />
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
        />
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
          onClick={() => setActiveSidebar("filter")}
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
            onClick={() => setActiveSidebar("search")}
          >
            <span role="img" aria-label="mobile zone search">
              <FontAwesomeIcon icon={faSearch} />
            </span>
          </div>
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
          <ZoneSearchPanel autoFocus={activeSidebar === "search"} />
        </MobileSidebar>
        <MobileSidebar
          title="ตัวเลือกแสดงผล"
          active={activeSidebar === "filter"}
          onClose={clearActiveSidebar}
        >
          <ZoneFilterPanel />
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
      <button
        css={{
          position: "absolute",
          top: 0,
          right: 0,
          fontSize: 20,
          border: 0,
          background: "transparent",
          padding: "8px 12px",
          cursor: "pointer",
        }}
        onClick={onClose}
      >
        <FontAwesomeIcon icon={faTimes} />
      </button>
      <div css={{ marginTop: 10 }}>
        <div css={{ color: labelColor, fontWeight: 600 }}>{title}</div>
        {children}
      </div>
    </div>
  )
}

function Popup() {
  return <div>neiw</div>
}
