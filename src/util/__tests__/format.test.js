import { numberWithCommas } from "../format"

describe("format", () => {
  describe(".numberWithCommas", () => {
    test("number < 1,000", () => {
      expect(numberWithCommas(0)).toEqual("0")
      expect(numberWithCommas(999)).toEqual("999")
    })

    test("1,000", () => {
      expect(numberWithCommas(1000)).toEqual("1,000")
    })

    test("1,000,000", () => {
      expect(numberWithCommas(1000000)).toEqual("1,000,000")
    })
  })
})
