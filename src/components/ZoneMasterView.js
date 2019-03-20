import React from "react"
import Placeholder from "./Placeholder"
import ContentWrapper from "./ContentWrapper"
import { media, DESKTOP_MIN_WIDTH } from "../styles"
import ElectionMap from "./ElectionMap"
import Unimplemented from "./Unimplemented"

export default function ZoneMasterView({ contentHeader, contentBody, popup }) {
  const hideOnDesktop = { [media(DESKTOP_MIN_WIDTH)]: { display: "none" } }
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
              maxWidth: 288,
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
              {
                // @todo #1 Create a 1st version of ZoneFilterPanel component
                //  in place of the Placeholder. May be a dummy component.
              }
              <Unimplemented componentName="ZoneFilterPanel" height={400} />
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
    // @todo #42 Height and margins for mobile zone filter and search?
    return (
      <div css={{ display: "flex", height: 50 }}>
        <div css={{ flex: 1 }}>
          <Placeholder height="100%">แสดงผล: ทั่วประเทศ</Placeholder>
        </div>
        <div css={{ flex: "none", marginLeft: 10, width: 50 }}>
          <Placeholder height="100%">
            <span role="img" aria-label="mobile zone search">
              🔍
            </span>
          </Placeholder>
        </div>
      </div>
    )
  }

  function renderMobileTabs() {
    // @todo #42 Implement the first version of mobile tabs
    //  May be a dummy component that looks like the real one.
    return <Placeholder height={40}>สรุปข้อมูล | แผนที่</Placeholder>
  }
}
