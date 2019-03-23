import React, { useReducer, useState, useEffect } from "react"
import _ from "lodash"

import DesktopScoreBarContainer from "./DesktopScoreBarContainer"
import NavBar, { menuMapping } from "./NavBar"
import Footer from "./Footer"
import { Link } from "gatsby"
import { Responsive, media, WIDE_NAV_MIN_WIDTH, DISPLAY_FONT } from "../styles"
import ContentWrapper from "./ContentWrapper"
import VoteCounter from "./VoteCounter"
import { Location } from "@reach/router"
import { useSummaryData } from "../models/LiveDataSubscription"
import moment from "moment"
import { DeveloperPanel, useLocalStorageFlag } from "../models/DeveloperOptions"
import Placeholder from "./Placeholder"

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
            alignItems: "top",
          }}
        >
          <div
            css={{
              flex: "none",
              paddingTop: 24,
              paddingBottom: 20,
            }}
          >
            <Logo />
          </div>
          <div
            css={{
              flex: "1",
              marginLeft: "8px",
              height: 76,
              overflow: "hidden",
              [media(WIDE_NAV_MIN_WIDTH)]: {
                marginLeft: "24px",
              },
            }}
          >
            <DesktopScoreBarContainer />
          </div>
          <div
            css={{
              position: "absolute",
              top: 0,
              right: "16px",
              width: "70px",
              [media(WIDE_NAV_MIN_WIDTH)]: {
                position: "relative",
                top: 0,
                right: 0,
                width: "180px",
              },
            }}
          >
            <VoteCounterContainer />
          </div>
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
                  {menuMapping[activeNavBarSection]
                    ? menuMapping[activeNavBarSection].label
                    : "Menu"}
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
      {children}
      <Location>
        {props => <CountdownCurtain location={props.location} />}
      </Location>
      <DeveloperPanel />
      <Footer />
    </div>
  )
}

function LatestDataIndicator() {
  const summaryState = useSummaryData()
  if (!summaryState.completed) return null
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

function VoteCounterContainer() {
  const summaryState = useSummaryData()
  if (!summaryState.completed) return null
  const progressArray = _(summaryState.data.zoneStatsMap)
    .values()
    .flatMap(x => _.values(x).map(z => z.progress))
    .value()
  console.log(progressArray)
  const currentDate = new Date()
  const currentTime = `${currentDate.getHours()}:${currentDate.getMinutes()}`
  return (
    <VoteCounter
      percentage={Math.round(_.sum(progressArray) / progressArray.length)}
      lastUpdate={currentTime}
    />
  )
}

function Countdown() {
  const [date, setDate] = useState(new Date())
  const end = new Date("2019-03-24T18:00:00+07:00")
  const difference = end.getTime() - date.getTime()

  if (difference <= 0) {
    return false
  } else {
    useEffect(() => {
      const timerID = setInterval(() => setDate(new Date()), 1000)

      return function cleanup() {
        clearInterval(timerID)
      }
    })

    let seconds = Math.floor(difference / 1000)
    let minutes = Math.floor(seconds / 60)
    let hours = Math.floor(minutes / 60)

    const countdown = {
      hours: `${(hours %= 24)}`.padStart(2, "0"),
      minutes: `${(minutes %= 60)}`.padStart(2, "0"),
      seconds: `${(seconds %= 60)}`.padStart(2, "0"),
    }

    return (
      <div style={{ marginTop: "1em" }}>
        {countdown.hours} : {countdown.minutes} : {countdown.seconds}
      </div>
    )
  }
}

function CountdownCurtain({ location }) {
  const [skip] = useLocalStorageFlag("ELECT_DISABLE_CURTAIN")
  const ready = /^\/dev/.test(location.pathname) || skip
  if (!ready) {
    return (
      <div
        css={{
          background: "rgba(0,0,0,0.85)",
          color: "#fff",
          font: `30px ${DISPLAY_FONT}`,
          position: "fixed",
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
          zIndex: 998,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
        }}
      >
        <div>
          {
            // @todo #1 CountdownCurtain: Add image
          }
          รอลุ้นผลการเลือกตั้งแบบเรียลไทม์ไปพร้อมกัน
          <br />
          พรุ่งนี้นะๆ ^_^
          <br />
          <Countdown />
          {(location.hostname === "localhost" ||
            location.hostname === "127.0.0.1") && (
            <div style={{ marginTop: "1em" }}>
              <Placeholder>
                <div style={{ padding: 10 }}>
                  Hey developer! To disable this curtain, go to{" "}
                  <Link to="/dev">/dev</Link>
                </div>
              </Placeholder>
            </div>
          )}
        </div>
      </div>
    )
  }
  return null
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
