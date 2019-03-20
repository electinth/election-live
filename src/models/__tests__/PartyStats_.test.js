import { partyStatsMaxSeats } from "../PartyStats"

describe("partyStatsMaxSeats", () => {
  test("when have only one party, just sum up constituencySeats + partyListSeats", () => {
    const partyStats = [
      {
        constituencySeats: 1,
        partyListSeats: 1,
      },
    ]

    expect(partyStatsMaxSeats(partyStats)).toEqual(2)
  })

  test("when have more than one, just sum only for the max of constituencySeats + partyListSeats", () => {
    const partyStats = [
      {
        constituencySeats: 15,
        partyListSeats: 10,
      },
      {
        constituencySeats: 0,
        partyListSeats: 20,
      },
    ]

    expect(partyStatsMaxSeats(partyStats)).toEqual(25)
  })
})
