import React from "react"
import VisuallyHidden from "@reach/visually-hidden"
import PropTypes from "prop-types"

const PartyStatsRow = function(props) {
  // @todo #12 Make <PartyStatsRow /> accept props and display values based on props.

  // @todo #14 Implement score bar in <PartyStatsRow />.

  return (
    <article css={{ position: "relative", height: 96, padding: "0.5rem" }}>
      <h3 css={{ margin: 0, fontSize: "1.5rem" }}>{props.partyName}</h3>
      <p css={{ margin: 0 }}>
        <VisuallyHidden> ทั้งหมด </VisuallyHidden>
        <div
          css={{
            backgroundColor: " #eee",
            width: "2rem",
            height: "2rem",
            borderRadius: "50%",
            position: "absolute",
            right: "0.5rem",
            top: 10,
            textAlign: "center",
          }}
        >
          <span css={{ fontSize: "1rem", top: 4, position: "relative" }}>
            {props.totalVotes}
          </span>
        </div>
      </p>
      <p css={{ margin: 0 }}>
        สส.เขต 20 <VisuallyHidden> ที่นั่ง </VisuallyHidden>
        สส.ปาร์ตี้ลิสต์ 50 <VisuallyHidden> ที่นั่ง</VisuallyHidden>
      </p>
    </article>
  )
}

PartyStatsRow.propTypes = {
  partyName: PropTypes.string,
  totalVotes: PropTypes.number,
}

export default PartyStatsRow
