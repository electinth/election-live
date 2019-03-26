import React from "react"
import { numberWithCommas } from "../util/format"
import PercentBarChart from "./PercentBarChart"

/**
 * @param {object} props
 * @param {string} props.partyName
 * @param {string} props.partyColor
 * @param {string} props.candidateName
 * @param {number} props.candidateNumber
 * @param {number} props.rank Ranking in list. 1 for highest score, and so on.
 * @param {number} props.score Total number of votes this candidate received.
 * @param {number} props.percentage Proportion of votes as percentage from 0~100
 * @param {boolean} props.overridden If the announced winner is different
 */
export default function CandidateStatsRow(props) {
  return (
    <div css={{ display: "flex", marginBottom: 15 }}>
      <div
        css={{
          background: props.rank == 1 ? "black" : "gray",
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
          <span
            css={{
              position: "absolute",
              right: 0,
              top: 0,
              color: props.overridden ? "#D0021B" : "#413F3F",
            }}
          >
            {!!props.overridden && "*"}
            <b css={{ color: props.overridden ? "inherit" : "black" }}>
              {numberWithCommas(props.score)}
            </b>{" "}
            - {props.percentage}%
          </span>
        </div>
        <div>
          {// If "no votes", no text.
          props.candidateName || props.candidateNumber ? (
            `${props.candidateName}, เบอร์ ${props.candidateNumber}`
          ) : (
            <span>&nbsp;</span>
          )}
        </div>
        <PercentBarChart
          percent={props.percentage / 100}
          color={props.partyColor}
        />
        {!!props.overridden && (
          <div
            css={{
              background: "#D0021B",
              color: "white",
              fontSize: "0.7rem",
              padding: 4,
            }}
          >
            *{" "}
            <a
              href="https://www.facebook.com/Pr.Ect.Thailand/posts/1249405225217547"
              target="_blank"
              css={{ color: "inherit" }}
            >
              กกต. ประกาศให้เป็นผู้ได้คะแนนสูงสุดในเขตนี้
            </a>{" "}
            แต่ ELECT Live ยังไม่ได้รับคะแนนล่าสุดของเขตนี้จาก กกต.
          </div>
        )}
      </div>
    </div>
  )
}
