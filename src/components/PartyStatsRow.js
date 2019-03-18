import React from "react"
import VisuallyHidden from "@reach/visually-hidden"

/**
 * @param {{ party: IParty, constituencySeats: number, partyListSeats: number, maxSeats: number }} props
 */
export function PartyStatsRow(props) {
  const totalSeats = props.constituencySeats + props.partyListSeats
  const barWidth = `${((totalSeats / props.maxSeats) * 100).toFixed(2)}%`
  // @todo #14 Implement score bar in <PartyStatsRow />.

  // @todo #14 Update <PartyStatsRow /> according to design.

  return (
    <article>
      <h3>{props.party.name}</h3>
      <p>
        <VisuallyHidden>ทั้งหมด </VisuallyHidden>
        {totalSeats}
        <VisuallyHidden> ที่นั่ง</VisuallyHidden>
      </p>
      <p css={{ margin: 0 }}>
        สส.เขต {props.constituencySeats}
        <VisuallyHidden> ที่นั่ง,</VisuallyHidden> สส.ปาร์ตี้ลิสต์{" "}
        {props.partyListSeats}
        <VisuallyHidden> ที่นั่ง</VisuallyHidden>
      </p>
      <div
        css={{ height: 5, background: "#890" }}
        style={{ width: barWidth }}
      />
    </article>
  )
}
