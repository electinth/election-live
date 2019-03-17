import React from "react"
export function PartyStatsRow() {
  // @todo #12 Make <PartyStatsRow /> accept props and display values based on props.

  // @todo #12 Adjust <PartyStatsRow /> styling according to design.

  return (
    <article css={{ display: "flex" }}>
      <h3>ชื่อพรรค</h3>
      <p>
        ทั้งหมด 70 ที่นั่ง (14%) สส.เขต 20 ที่นั่ง สส.ปาร์ตี้ลิสต์ 50 ที่นั่ง
      </p>
      <p>ต้องการอีก 50 เพื่อเป็นอันดับหนึ่ง</p>
    </article>
  )
}
