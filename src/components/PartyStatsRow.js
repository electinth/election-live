import React from "react"
import { format } from "d3-format"
import VisuallyHidden from "@reach/visually-hidden"
import { DISPLAY_FONT } from "../styles"
import { partyColor, partyLogo } from "../models/information"

const formatPercent = format(".3%")

const ARTICLE_STYLE = {
  position: "relative",
  marginBottom: "0.5rem",
  padding: "0.5rem 0",
  display: "grid",
  gridTemplateColumns: "28px auto 32px",
  gridGap: "6px",
  background: "white",
}

const PARTY_NAME_STYLE = {
  margin: 0,
  fontSize: "1.5rem",
  fontFamily: DISPLAY_FONT,
  whiteSpace: "nowrap",
  textOverflow: "ellipsis",
  overflow: "hidden",
}

/**
 * @param {{ party: IParty, constituencySeats: number, partyListSeats: number, maxSeats: number, filtered: boolean }} props
 */
const PartyStatsRow = props => {
  const totalSeats = props.constituencySeats + props.partyListSeats
  const barWidth = totalSeats / props.maxSeats

  return (
    <article css={ARTICLE_STYLE}>
      <div>
        <img alt="" src={partyLogo(props.party.name)} width="28" />
      </div>
      <div css={{ overflow: "hidden" }}>
        <h3 css={PARTY_NAME_STYLE}>{props.party.name}</h3>
        <div css={{ margin: 0 }}>
          ส.ส. เขต: {props.constituencySeats}
          <VisuallyHidden> ที่นั่ง </VisuallyHidden>
          {!props.filtered && (
            <React.Fragment>
              , ส.ส. ปาร์ตี้ลิสต์: {props.partyListSeats}
              <VisuallyHidden> ที่นั่ง</VisuallyHidden>
            </React.Fragment>
          )}
        </div>
        <svg width="100%" height="5">
          <rect width="100%" height="5" fill="#ccc" />
          <rect
            width={formatPercent(barWidth)}
            height="5"
            fill={partyColor(props.party)}
          />
        </svg>
      </div>
      <div>
        <VisuallyHidden> ทั้งหมด </VisuallyHidden>
        <div
          css={{
            backgroundColor: " #eee",
            width: "2rem",
            height: "2rem",
            borderRadius: "50%",
            textAlign: "center",
          }}
        >
          <span
            css={{
              fontSize: "1rem",
              top: 4,
              position: "relative",
              fontWeight: "bold",
            }}
          >
            {totalSeats}
          </span>
        </div>
      </div>
    </article>
  )
}

export default PartyStatsRow
