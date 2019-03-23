import React from "react"
import { DESKTOP_MIN_WIDTH, media, DISPLAY_FONT } from "../styles"
import PartyDropdown from "./PartyDropdown"
import { faQuestionCircle } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Unimplemented from "./Unimplemented"

const sectionStyling = { borderBottom: "1px solid #000", padding: "10px 0" }

// @todo #1 implement search and select with visualization of each party
export default function PerPartySearchPanelContainer({
  totalVote = "16123223",
  totalDistrictCouncilor = 10,
  totalPartyListCouncilor = 5,
}) {
  return (
    <div
      css={{
        fontFamily: DISPLAY_FONT,
        [media(DESKTOP_MIN_WIDTH)]: {
          display: "block",
          order: 1,
          margin: "20px 0 0 0",
          padding: 0,
          width: "275px",
        },
      }}
    >
      <PartyDropdown dropdownOpen={false} />
      <PartyTotalVote totalVote={totalVote} />
      <PartyTotalCouncilorEstimationVisualization />
      <PartyTotalCouncilorEstimationNumber
        totalDistrictCouncilor={totalDistrictCouncilor}
        totalPartyListCouncilor={totalPartyListCouncilor}
      />
      <PartyPresidentCandidateList />
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
        {totalVote.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")}
      </div>
    </div>
  )
}

// @todo #1 implement search and select with visualization of each party
function PartyTotalCouncilorEstimationVisualization() {
  return (
    <div css={{ ...sectionStyling }}>
      <div>
        จำนวนสส.พึงมี
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
        <div>สส.เขต</div>
        <div css={{ ...numberStyling, paddingRight: "10px" }}>
          {totalDistrictCouncilor}
        </div>
      </div>
      <div css={{ ...blockStyling }}>
        <div css={{ paddingLeft: "10px" }}>สส.บัญชีรายชื่อ</div>
        <div css={{ ...numberStyling }}>{totalPartyListCouncilor}</div>
      </div>
    </div>
  )
}

function PartyPresidentCandidateList() {
  return (
    <div css={{ ...sectionStyling }}>
      <div>แคนดิเดตนายกฯ</div>
      <div>{/* @todo #1 implement president candidate list */}</div>
    </div>
  )
}
