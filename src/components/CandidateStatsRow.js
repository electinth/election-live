import React from "react"
import { numberWithCommas } from "../util/format"

/**
 * @param {object} props
 * @param {string} props.partyName
 * @param {string} props.partyColor
 * @param {string} props.candidateName
 * @param {number} props.candidateNumber
 * @param {number} props.rank Ranking in list. 1 for highest score, and so on.
 * @param {number} props.score Total number of votes this candidate received.
 * @param {number} props.percentage Proportion of votes as percentage from 0~100
 */
export default function CandidateStatsRow(props) {
  return (
    <div css={{ display: "flex", marginBottom: 15 }}>
      <div
        css={{
          background: "black",
          color: "white",
          marginRight: 10,
          width: 30,
          height: 30,
          textAlign: "center",
          borderRadius: "50%",
          lineHeight: "30px",
          flex: "none",
        }}
      >
        {props.rank}
      </div>
      <div css={{ width: "100%" }}>
        <div css={{ position: "relative", fontSize: "1.2rem" }}>
          <b>{props.partyName}</b>
          <span css={{ position: "absolute", right: 0, top: 0 }}>
            <b>{numberWithCommas(props.score)}</b> - {props.percentage}%
          </span>
        </div>
        <div>
          {props.candidateName}, เบอร์ {props.candidateNumber}
        </div>
        <div
          css={{
            height: 5,
            width: `${props.percentage}%`,
            background: props.partyColor,
          }}
        />
      </div>
    </div>
  )
}
