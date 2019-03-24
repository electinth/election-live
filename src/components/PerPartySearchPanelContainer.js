import React, { useMemo } from "react"
import { DESKTOP_MIN_WIDTH, media, DISPLAY_FONT } from "../styles"
import PartyDropdown from "./PartyDropdown"
import { faQuestionCircle } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Unimplemented from "./Unimplemented"
import { numberWithCommas } from "../util/format"
import { useSummaryData } from "../models/LiveDataSubscription"
import AnimatedNumber from "./AnimatedNumber"
import Loading from "./Loading"
import { nationwidePartyStatsFromSummaryJSON } from "../models/PartyStats"

const sectionStyling = { borderBottom: "1px solid #000", padding: "10px 0" }

export default function PerPartySearchPanelContainer({ partyId }) {
  const summaryState = useSummaryData()
  const totalVote = summaryState.completed ? (
    <AnimatedNumber value={summaryState.data.partyScoreMap[partyId] || 0}>
      {v => numberWithCommas(v)}
    </AnimatedNumber>
  ) : (
    <Loading />
  )
  const partyStatsRow = useMemo(() => {
    if (!summaryState.completed) return null
    return nationwidePartyStatsFromSummaryJSON(summaryState.data).find(
      row => row.party.id === +partyId
    )
  }, [summaryState])
  const totalDistrictCouncilor = partyStatsRow ? (
    <AnimatedNumber value={partyStatsRow.constituencySeats} />
  ) : (
    <Loading />
  )
  const totalPartyListCouncilor = partyStatsRow ? (
    <AnimatedNumber value={partyStatsRow.partyListSeats} />
  ) : (
    <Loading />
  )
  return (
    <div
      css={{
        fontFamily: DISPLAY_FONT,
        margin: "20px 0 0 0",
        position: "relative",
        [media(DESKTOP_MIN_WIDTH)]: {
          display: "block",
          order: 1,
          padding: 0,
          width: "275px",
        },
      }}
    >
      <div
        css={{
          background: "red",
          position: "absolute",
          top: 0,
          width: "100%",
        }}
      >
        <PartyDropdown partyId={partyId} dropdownOpen={false} />
      </div>
      <div css={{ paddingTop: 56 }}>
        <PartyTotalVote totalVote={totalVote} />
        <PartyTotalCouncilorEstimationVisualization />
        <PartyTotalCouncilorEstimationNumber
          totalDistrictCouncilor={totalDistrictCouncilor}
          totalPartyListCouncilor={totalPartyListCouncilor}
        />
        <PartyPresidentCandidateList partyId={partyId} />
      </div>
    </div>
  )
}

function PartyTotalVote({ totalVote }) {
  return (
    <div css={{ ...sectionStyling }}>
      <div>คะแนนเสียงทั้งประเทศ</div>
      <div
        css={{ fontWeight: "bold", fontSize: "2.2em", padding: "10px 0 0 0" }}
      >
        {totalVote}
      </div>
    </div>
  )
}

// @todo #1 implement search and select with visualization of each party
function PartyTotalCouncilorEstimationVisualization() {
  return (
    <div css={{ ...sectionStyling }}>
      <div>
        จำนวนส.ส.พึงมี
        <FontAwesomeIcon css={{ marginLeft: "5px" }} icon={faQuestionCircle} />
      </div>
      <div>
        {/* @todo #1 implement estimated councoilor graph */}
        <Unimplemented componentName="PartyTotalCouncilorGraph" />
      </div>
    </div>
  )
}

function PartyTotalCouncilorEstimationNumber({
  totalDistrictCouncilor,
  totalPartyListCouncilor,
}) {
  const blockStyling = {
    display: "flex",
    width: "50%",
    position: "relative",
    padding: "15px 0 0 0",
  }

  const numberStyling = {
    position: "absolute",
    right: 0,
    fontSize: "2em",
    top: 0,
    fontWeight: "bold",
  }

  return (
    <div css={{ ...sectionStyling, display: "flex" }}>
      <div css={{ ...blockStyling, borderRight: "1px solid #000" }}>
        <div>ส.ส.เขต</div>
        <div css={{ ...numberStyling, paddingRight: "10px" }}>
          {totalDistrictCouncilor}
        </div>
      </div>
      <div css={{ ...blockStyling }}>
        <div css={{ paddingLeft: "10px" }}>ส.ส.บัญชีรายชื่อ</div>
        <div css={{ ...numberStyling }}>{totalPartyListCouncilor}</div>
      </div>
    </div>
  )
}

function PartyPresidentCandidateList({ partyId }) {
  // @todo PartyView - PartyPresidentCandidateList - bind presiddent candidate data by party id
  const mockData = [
    {
      firstName: "ชื่อ",
      lastName: "นามสกุล",
      photoSrc: require(`../styles/images/pmcan/${partyId}-s.png`),
    },
    {
      firstName: "ชื่อ",
      lastName: "นามสกุล",
      photoSrc: require(`../styles/images/pmcan/${partyId}-s.png`),
    },
    {
      firstName: "ชื่อ",
      lastName: "นามสกุล",
      photoSrc: require(`../styles/images/pmcan/${partyId}-s.png`),
    },
  ]
  const presidentCandidateList = mockData
  return (
    <div css={{ ...sectionStyling }}>
      <div>แคนดิเดตนายกฯ</div>
      <div css={{ display: "flex" }}>
        {presidentCandidateList.map(item => {
          return (
            <div css={{ padding: "10px", width: "100%" }}>
              <div>
                <img
                  src={item.photoSrc}
                  css={{
                    display: "block",
                    padding: 0,
                    margin: "auto",
                    width: "35px",
                    height: "35px",
                    borderRadius: "50%",
                  }}
                />
              </div>
              <div
                css={{
                  fontSize: "0.8em",
                  marginTop: "5px",
                  textAlign: "center",
                }}
              >
                <div>{item.firstName}</div>
                <div css={{ marginTop: "-1px" }}>{item.lastName}</div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
