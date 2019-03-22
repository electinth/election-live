import React from "react"
import VisuallyHidden from "@reach/visually-hidden"
import { DISPLAY_FONT } from "../styles"
import { partyColor, partyLogo } from "../models/information"

/**
 * @param {{ party: IParty, constituencySeats: number, partyListSeats: number, maxSeats: number }} props
 */
const PartyStatsRow = props => {
  const totalSeats = props.constituencySeats + props.partyListSeats
  const barWidth = `${((totalSeats / props.maxSeats) * 100).toFixed(2)}%`

  return (
    <article
      css={{
        position: "relative",
        marginBottom: "0.5rem",
        padding: "0.5rem 0",
        display: "grid",
        gridTemplateColumns: "28px auto 32px",
        gridGap: "6px",
      }}
    >
      <div>
        <img alt="" src={partyLogo(props.party.name)} width="28" />
      </div>
      <div css={{ overflow: "hidden" }}>
        <h3
          css={{
            margin: 0,
            fontSize: "1.5rem",
            fontFamily: DISPLAY_FONT,
            whiteSpace: "nowrap",
            textOverflow: "ellipsis",
            overflow: "hidden",
          }}
        >
          {props.party.name}
        </h3>
        <div css={{ margin: 0 }}>
          ส.ส. เขต {props.constituencySeats}{" "}
          <VisuallyHidden> ที่นั่ง </VisuallyHidden>
          ส.ส. ปาร์ตี้ลิสต์ {props.partyListSeats}{" "}
          <VisuallyHidden> ที่นั่ง</VisuallyHidden>
        </div>
        <div
          css={{
            height: 5,
            background: partyColor(props.party),
            marginTop: "5px",
          }}
          style={{ width: barWidth }}
        />
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
