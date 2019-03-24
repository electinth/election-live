import React from "react"
import { DESKTOP_MIN_WIDTH, media } from "../styles"
import { DISPLAY_FONT } from "../styles"
import PartyDropdown from "../components/PartyDropdown"

export default function PerPartyUnselectedView() {
  return (
    <div>
      <div
        css={{
          margin: "0 auto",
          padding: "0 24px",
          maxWidth: "1200px",
          [media(DESKTOP_MIN_WIDTH)]: {
            order: 1,
            margin: "0 auto",
            padding: 0,
            display: "flex",
          },
        }}
      >
        <PartySearchContainer />
        <PartySearchInstruction />
      </div>
    </div>
  )
}

function PartySearchContainer() {
  return (
    <div
      css={{
        fontFamily: DISPLAY_FONT,
        margin: "20px 0 0 0",
        position: "relative",
        textAlign: "center",
        [media(DESKTOP_MIN_WIDTH)]: {
          display: "block",
          order: 1,
          padding: 0,
          width: "275px",
        },
      }}
    >
      <h1
        css={{
          [media(DESKTOP_MIN_WIDTH)]: {
            display: "none",
          },
        }}
      >
        เลือกพรรคการเมือง เพื่อดูจำนวน ส.ส.
      </h1>
      <PartyDropdown />
    </div>
  )
}

function PartySearchInstruction() {
  return (
    <div
      css={{
        fontFamily: DISPLAY_FONT,
        display: "none",
        textAlign: "center",
        [media(DESKTOP_MIN_WIDTH)]: {
          display: "block",
          order: 2,
          margin: "10px auto",
          padding: 0,
          width: "375px",
        },
      }}
    >
      <h1>เลือกพรรคการเมืองด้านซ้ายมือ เพื่อดูจำนวน ส.ส.</h1>
    </div>
  )
}
