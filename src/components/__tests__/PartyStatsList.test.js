import React from "react"
import TestRenderer from "react-test-renderer"
import PartyStatsRow from "../PartyStatsRow"
import PartyStatsList from "../PartyStatsList"

describe("Party Stats List", () => {
  test("should have 2 party stats row with property from party stats", () => {
    const partyStats = [
      {
        party: {
          id: 1,
          name: "Thanos",
          codeTH: "ธานอส",
          codeEN: "TN",
        },
        constituencySeats: 1,
        partyListSeats: 1,
      },
      {
        party: {
          id: 2,
          name: "Konoha",
          codeTH: "โคโนฮะ",
          codeEN: "KH",
        },
        constituencySeats: 20,
        partyListSeats: 30,
      },
    ]
    const renderer = TestRenderer.create(
      <PartyStatsList partyStats={partyStats} />
    )
    const root = renderer.root
    const partyStatsRow = root.findAll(el => el.type === PartyStatsRow)
    expect(partyStatsRow).toHaveLength(2)
    expect(partyStatsRow[0].props.maxSeats).toEqual(50)
    expect(partyStatsRow[0].props.party).toEqual(
      expect.objectContaining({
        id: 1,
        name: "Thanos",
        codeTH: "ธานอส",
        codeEN: "TN",
      })
    )
    expect(partyStatsRow[0].props.constituencySeats).toEqual(1)
    expect(partyStatsRow[0].props.partyListSeats).toEqual(1)

    expect(partyStatsRow[1].props.maxSeats).toEqual(50)
    expect(partyStatsRow[1].props.party).toEqual(
      expect.objectContaining({
        id: 2,
        name: "Konoha",
        codeTH: "โคโนฮะ",
        codeEN: "KH",
      })
    )
    expect(partyStatsRow[1].props.constituencySeats).toEqual(20)
    expect(partyStatsRow[1].props.partyListSeats).toEqual(30)
  })
})
