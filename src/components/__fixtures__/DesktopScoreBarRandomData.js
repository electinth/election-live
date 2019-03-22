import { useState, useEffect } from "react"
import _ from "lodash"

let initialState = {
  complete: 0,
  data: [],
}

export function useRandomScoreBarData() {
  const [state, setState] = useState(initialState)
  useEffect(() => {
    const interval = setInterval(() => {
      setState(state => {
        const complete = state.complete
          ? Math.min(state.complete + 0.05, 1)
          : 0.3
        return {
          complete,
          data: getRandomScoreBarData(complete),
        }
      })
    }, 15000)

    return () => clearInterval(interval)
  }, [])
  return state.data
}

export function getRandomScoreBarData(complete = 0.0) {
  return [
    {
      id: 8,
      type: "zone",
      name: "เพือไทย",
      color: "#cf1e38",
      count: (_.random(80, 150) * complete) | 0,
    },
    {
      id: 83,
      type: "zone",
      name: "พลังประชารัฐ",
      color: "#3e61a8",
      count: (_.random(40, 75) * complete) | 0,
    },
    {
      id: 1,
      type: "zone",
      name: "ประชาธิปัตย์",
      color: "#437fba",
      count: (_.random(80, 100) * complete) | 0,
    },
    {
      id: 15,
      type: "zone",
      name: "ภูมิใจไทย",
      color: "#102986",
      count: (_.random(10, 30) * complete) | 0,
    },
    {
      id: 12,
      type: "zone",
      name: "ชาติไทยพัฒนา",
      color: "#231c72",
      count: (_.random(5, 10) * complete) | 0,
    },
    {
      id: 10,
      type: "zone",
      name: "ชาติพัฒนา",
      color: "#223c88",
      count: (_.random(5, 10) * complete) | 0,
    },
    {
      id: 68,
      type: "zone",
      name: "อนาคตใหม่",
      color: "#f4792e",
      count: (_.random(0, 10) * complete) | 0,
    },
    {
      id: 39,
      type: "zone",
      name: "เสรีรวมไทย",
      color: "#edd63f",
      count: (_.random(0, 2) * complete) | 0,
    },
    {
      id: 84,
      type: "zone",
      name: "เศรษฐกิจใหม่",
      color: "#184474",
      count: (_.random(0, 2) * complete) | 0,
    },
  ]
}
