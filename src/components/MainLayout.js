import { keyframes } from "@emotion/core"
import { Location } from "@reach/router"
import axios from "axios"
import { Link } from "gatsby"
import _ from "lodash"
import moment from "moment"
import React, { useEffect, useReducer, useRef, useState } from "react"
import semver from "semver"
import { DeveloperPanel, useLocalStorageFlag } from "../models/DeveloperOptions"
import {
  useLockedState,
  useStatus as useStatusAlertText,
  useSummaryData,
} from "../models/LiveDataSubscription"
import { DISPLAY_FONT, media, Responsive, WIDE_NAV_MIN_WIDTH } from "../styles"
import logo from "../styles/images/site-logo.png"
import { Debug } from "../util/Debug"
import ContentWrapper from "./ContentWrapper"
import DesktopScoreBarContainer from "./DesktopScoreBarContainer"
import Footer from "./Footer"
import Loading from "./Loading"
import NavBar, { menuMapping } from "./NavBar"
import Placeholder from "./Placeholder"
import VoteCounter from "./VoteCounter"

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
      <StatusAlert />
      <NewVersionAlert />
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
  const currentDate = new Date()
  const currentTime = `${("0" + currentDate.getHours()).slice(-2)}:${(
    "0" + currentDate.getMinutes()
  ).slice(-2)}`
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
  const locked = useLockedState()
  const ready = /^\/dev/.test(location.pathname) || skip || !locked
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
          animation: `3s ${curtainAnimation} linear`,
        }}
      >
        <div>
          <Loading size="large" />
          <img
            src={logo}
            width={250}
            css={{
              margin: "0 auto 15px auto",
              display: "block",
            }}
          />
          รอลุ้นผลการเลือกตั้งแบบเรียลไทม์ไปพร้อมกัน
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

function StatusAlert() {
  const status = useStatusAlertText()
  if (!status) return null
  return (
    <div
      css={{
        position: "absolute",
        top: 0,
        left: "50%",
        transform: "translateX(-50%)",
        padding: "4px 8px",
        background: "#F0324B",
        color: "white",
        fontSize: "20px",
        zIndex: 997,
      }}
    >
      {status}
    </div>
  )
}

function NewVersionAlert() {
  const [showAlert, setShowAlert] = useState(false)
  const debugRef = useRef()
  const debug = debugRef.current || Debug("elect:NewVersionAlert")
  useEffect(() => {
    let currentVersion = (debugRef.current = debug)
    const checkVersion = async () => {
      debug("Checking version...")
      try {
        const response = await axios.get("/version.info.json")
        if (semver.gt(response.data.version, currentVersion)) {
          debug(
            "Latest app version %s > %s",
            response.data.version,
            currentVersion
          )
          setShowAlert(true)
          currentVersion = response.data.version
        } else {
          debug(
            "Latest app version %s <= %s",
            response.data.version,
            currentVersion
          )
        }
      } catch (e) {
        debug("Failed to check version...", e)
      }
    }
    const timeout = setTimeout(checkVersion, 5000)
    const interval = setInterval(checkVersion, 90000)
    return () => {
      clearTimeout(timeout)
      clearInterval(interval)
    }
  }, [])
  if (!showAlert) return null
  return (
    <div
      css={{
        position: "absolute",
        top: 0,
        left: "50%",
        transform: "translateX(-50%)",
        padding: "4px 8px",
        background: "#F0324B",
        color: "white",
        fontSize: "20px",
        zIndex: 997,
      }}
    >
      เว็บนี้มีการอัพเดต{" "}
      <a css={{ color: "inherit" }} href="javascript:void(location.reload())">
        กรุณารีเฟรช
      </a>
    </div>
  )
}

const curtainAnimation = keyframes({
  "0%": { transform: "translateY(-120%)" },
  "100%": { transform: "translateY(0%)" },
})

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
