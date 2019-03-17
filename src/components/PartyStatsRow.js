import React from "react"
import VisuallyHidden from "@reach/visually-hidden"
export function PartyStatsRow() {
  // @todo #12 Make <PartyStatsRow /> accept props and display values based on props.

  // @todo #14 Implement score bar in <PartyStatsRow />.

  return (
    <article css={{ position: "relative", height: 96, padding: "0.5rem" }}>
      <h3 css={{ margin: 0, fontSize: "1.5rem" }}>ชื่อพรรค</h3>
      <p css={{ margin: 0 }}>
        <VisuallyHidden>ทั้งหมด </VisuallyHidden>
        <span
          css={{
            position: "absolute",
            right: "0.5rem",
            top: 0,
            fontSize: "2rem",
          }}
        >
          70
        </span>
        <VisuallyHidden> ที่นั่ง (</VisuallyHidden>
        <span css={{ position: "absolute", right: "0.5rem", top: 45 }}>
          14%
        </span>
        <VisuallyHidden>) </VisuallyHidden>
      </p>
      <p css={{ margin: 0 }}>ต้องการอีก 50 เพื่อเป็นอันดับหนึ่ง</p>
      <p css={{ margin: 0 }}>
        สส.เขต 20 <VisuallyHidden> ที่นั่ง </VisuallyHidden>
        สส.ปาร์ตี้ลิสต์ 50 <VisuallyHidden> ที่นั่ง</VisuallyHidden>
      </p>
    </article>
  )
}
