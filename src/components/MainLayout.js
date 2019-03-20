import React, { useReducer } from "react"
import PageContent from "../components/PageContent"

import DesktopScoreBarContainer from "./DesktopScoreBarContainer"
import NavBar from "./NavBar"
import Footer from "./Footer"
import { Link } from "gatsby"
import { Responsive, media, WIDE_NAV_MIN_WIDTH } from "../styles"
import ContentWrapper from "./ContentWrapper"
import CompactScoreBar from "./CompactScoreBar"

export default function MainLayout({ children }) {
  const [navBarActive, toggleNavBar] = useReducer(state => !state, false)
  return (
    <PageContent>
      <ContentWrapper>
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
                <Hamburger onClick={toggleNavBar} active={navBarActive} />
              </div>
            }
          />
        </div>
      </ContentWrapper>
      <div
        data-active={navBarActive ? true : undefined}
        css={{
          display: "none",
          [media(WIDE_NAV_MIN_WIDTH)]: { display: "block" },
          "&[data-active]": { display: "block" },
        }}
      >
        <NavBar />
      </div>
      <div
        css={{
          height: 50,
          overflow: "hidden",
          borderBottom: "1px solid #eee",
          [media(WIDE_NAV_MIN_WIDTH)]: { display: "none" },
        }}
      >
        <Responsive
          breakpoint={WIDE_NAV_MIN_WIDTH}
          narrow={
            <ContentWrapper>
              <CompactScoreBar />
            </ContentWrapper>
          }
        />
      </div>
      {children}
      <Footer />
    </PageContent>
  )
}

function Logo() {
  return (
    <Link
      to="/"
      css={{
        display: "block",
        overflow: "hidden",
        width: 26,
        [media(WIDE_NAV_MIN_WIDTH)]: { width: "auto" },
      }}
    >
      <img
        src={require("../styles/images/site-logo.png")}
        alt="ELECT"
        css={{ width: 150, display: "block" }}
      />
    </Link>
  )
}

function Hamburger({ onClick, active }) {
  // @todo #1 Implement Hamburger menu according to design.

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
      background: "#212121",
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
    <button onClick={onClick}>
      {active ? (
        <div style={styles.container}>
          <div style={{ ...styles.line, ...styles.lineTop }} />
          <div style={{ ...styles.line, ...styles.lineMiddle }} />
          <div style={{ ...styles.line, ...styles.lineBottom }} />
        </div>
      ) : (
        <div style={styles.container}>
          <div style={{ ...styles.line, ...styles.lineTop }} />
          <div style={{ ...styles.line, ...styles.lineMiddle }} />
          <div style={{ ...styles.line, ...styles.lineBottom }} />
        </div>
      )}
    </button>
  )
}
