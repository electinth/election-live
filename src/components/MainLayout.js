import React, { useReducer, useEffect } from "react"

import DesktopScoreBarContainer from "./DesktopScoreBarContainer"
import NavBar, { menuMapping } from "./NavBar"
import Footer from "./Footer"
import { Link } from "gatsby"
import { Responsive, media, WIDE_NAV_MIN_WIDTH, DISPLAY_FONT } from "../styles"
import ContentWrapper from "./ContentWrapper"
import CompactScoreBar from "./CompactScoreBar"
import { Location } from "@reach/router"
import { useSummaryData } from "../models/LiveDataSubscription"
import moment from "moment"

// @todo #1 Change the style to match the design
//  check out here! https://projects.invisionapp.com/d/main/default/#/console/17016173/352732955/inspect

/**
 * @param {object} props
 * @param {import('./NavBar').NavBarSectionName} props.activeNavBarSection
 */
export default function MainLayout({ children, activeNavBarSection }) {
  const [navBarActive, toggleNavBar] = useReducer(state => !state, false)

  return (
    <div>
      <ContentWrapper background="black">
        <div
          css={{
            display: "flex",
            paddingTop: 24,
            alignItems: "top",
          }}
        >
          <div css={{ flex: "none", paddingBottom: 20 }}>
            <Logo />
          </div>
          <Responsive
            breakpoint={WIDE_NAV_MIN_WIDTH}
            wide={
              <div
                css={{
                  flex: "1",
                  marginLeft: "24px",
                  height: 50,
                  overflow: "hidden",
                }}
              >
                <DesktopScoreBarContainer />
              </div>
            }
            narrow={
              <div css={{ marginLeft: "auto" }}>
                <CompactScoreBar />
              </div>
            }
          />
        </div>
      </ContentWrapper>
      <div
        css={{
          height: 50,
          overflow: "hidden",
          [media(WIDE_NAV_MIN_WIDTH)]: { display: "none" },
        }}
      >
        <Responsive
          breakpoint={WIDE_NAV_MIN_WIDTH}
          narrow={
            <ContentWrapper background="#212121">
              <LatestDataIndicator />
              <div css={{ height: 40, color: "white", paddingTop: 10 }}>
                <div css={{ float: "right" }}>
                  <Hamburger onClick={toggleNavBar} active={navBarActive} />
                </div>
                <div
                  css={{
                    float: "right",
                    fontFamily: DISPLAY_FONT,
                    fontSize: "1.2rem",
                    marginRight: 10,
                  }}
                >
                  {menuMapping[activeNavBarSection].label}
                </div>
              </div>
            </ContentWrapper>
          }
        />
      </div>
      <div
        data-active={navBarActive ? true : undefined}
        css={{
          display: "none",
          [media(WIDE_NAV_MIN_WIDTH)]: { display: "block" },
          "&[data-active]": { display: "block" },
        }}
      >
        <NavBar activeNavBarSection={activeNavBarSection} />
      </div>
      <Location>
        {({ location }) => (
          <HomePageRedirector location={location}>
            {children}
          </HomePageRedirector>
        )}
      </Location>
      <Footer />
    </div>
  )
}

function LatestDataIndicator() {
  const summaryState = useSummaryData()
  if (summaryState.loading) return null
  const updatedAt = moment(summaryState.data.updatedAt).format(
    "YYYY/DD/MM hh:mm"
  )

  return (
    <div
      css={{
        float: "left",
        color: "white",
        fontSize: "0.7rem",
        marginTop: 5,
        opacity: 0.8,
      }}
    >
      ข้อมูลล่าสุด <br />
      {updatedAt}
    </div>
  )
}

function HomePageRedirector({ location, children }) {
  const notReady =
    !/^\/dev/.test(location.pathname) &&
    location.hostname === "elect.thematter.co" &&
    (typeof window !== "undefined" && !window.localStorage.SKIP_ELECT_REDIRECT)
  useEffect(() => {
    if (notReady) {
      window.location.replace("https://elect.in.th/")
    }
  }, [notReady])
  if (notReady) {
    return (
      <h1
        css={{ padding: "3rem", textAlign: "center", fontFamily: DISPLAY_FONT }}
      >
        Coming soon!
      </h1>
    )
  }
  return children
}

function Logo() {
  return (
    <Link
      to="/"
      css={{
        display: "block",
        overflow: "hidden",
        width: 35,
        [media(WIDE_NAV_MIN_WIDTH)]: { width: "auto" },
      }}
    >
      <div
        alt="ELECT"
        css={{
          width: 35,
          height: 24,
          display: "block",
          backgroundSize: "cover",
          backgroundImage: `url(${require("../styles/images/site-logo-square.png")})`,
          [media(WIDE_NAV_MIN_WIDTH)]: {
            backgroundImage: `url(${require("../styles/images/site-logo.png")})`,
            width: 140,
            height: 32,
          },
        }}
      />
    </Link>
  )
}

function Hamburger({ onClick, active }) {
  // Hamburger from Codepen @naturalclar
  // https://codepen.io/naturalclar/pen/zEwvbg
  const styles = {
    container: {
      height: "20px",
      width: "20px",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      cursor: "pointer",
      paddingTop: "6px",
    },
    line: {
      height: "2px",
      width: "20px",
      background: "#FFF",
      transition: "all 0.2s ease",
    },
    lineTop: {
      transform: active ? "rotate(45deg)" : "none",
      transformOrigin: "top left",
      marginBottom: "5px",
    },
    lineMiddle: {
      opacity: active ? 0 : 1,
      transform: active ? "translateX(-16px)" : "none",
    },
    lineBottom: {
      transform: active ? "translateX(-1px) rotate(-45deg)" : "none",
      transformOrigin: "top left",
      marginTop: "5px",
    },
  }
  return (
    <div onClick={onClick}>
      {
        <div style={styles.container}>
          <div style={{ ...styles.line, ...styles.lineTop }} />
          <div style={{ ...styles.line, ...styles.lineMiddle }} />
          <div style={{ ...styles.line, ...styles.lineBottom }} />
        </div>
      }
    </div>
  )
}
