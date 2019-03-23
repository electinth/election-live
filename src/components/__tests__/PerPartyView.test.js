import { filterParty } from "../PerPartyView"
import { parties } from "../../models/information"

describe("filterParty", () => {
  test("should be able to filter by English short code", () => {
    expect(filterParty(parties, "FNT")).toEqual([
      {
        codeEN: "FNTP",
        codeTH: "พนท",
        color: "#0c327a",
        id: 7,
        name: "เครือข่ายชาวนาแห่งประเทศไทย",
        partylist: 9,
      },
    ])
  })

  test("should be able to filter by English short code prefix only", () => {
    expect(filterParty(parties, "NTP")).toEqual([])
  })

  test("should be able to filter by Thai short code", () => {
    expect(filterParty(parties, "คว")).toEqual([
      {
        codeEN: "NAP",
        codeTH: "ควม",
        color: "#e6b750",
        id: 6,
        name: "ความหวังใหม่",
        partylist: 13,
      },
    ])
  })

  test("should be able to filter by Thai short code prefix only", () => {
    expect(filterParty(parties, "ผดท")).toEqual([])
  })

  test("should be able to filter by party name", () => {
    expect(filterParty(parties, "ใหม่")).toEqual([
      {
        codeEN: "NAP",
        codeTH: "ควม",
        color: "#e6b750",
        id: 6,
        name: "ความหวังใหม่",
        partylist: 13,
      },
      {
        codeEN: "NDP",
        codeTH: "ปธม",
        color: "#eb4138",
        id: 24,
        name: "ประชาธิปไตยใหม่",
        partylist: 41,
      },
      {
        codeEN: "PCM",
        codeTH: "พชม",
        color: "#aa6a9b",
        id: 50,
        name: "เพื่อชีวิตใหม่",
        partylist: 3,
      },
      {
        codeEN: "NEWA",
        codeTH: "ทลม",
        color: "#026aec",
        id: 61,
        name: "ทางเลือกใหม่",
        partylist: 13,
      },
      {
        codeEN: "NPD",
        codeTH: "พธม",
        color: "#e9b54a",
        id: 66,
        name: "พลังธรรมใหม่",
        partylist: 24,
      },
      {
        codeEN: "FWP",
        codeTH: "อนค",
        color: "#f4792e",
        id: 68,
        name: "อนาคตใหม่",
        partylist: 124,
      },
      {
        codeEN: "NEP",
        codeTH: "ศม",
        color: "#184474",
        id: 84,
        name: "เศรษฐกิจใหม่",
        partylist: 81,
      },
    ])
  })
})
