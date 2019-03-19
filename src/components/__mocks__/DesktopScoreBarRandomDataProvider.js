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
        const complete = state.complete ? state.complete + 0.05 : 0.3
        return {
          complete,
          data: calculateScore(complete),
        }
      })
    }, 5000)

    return () => clearInterval(interval)
  }, [])
  return state.data
}

function calculateScore(complete = 0.0) {
  return [
    {
      id: "01d",
      name: "เพือไทย",
      color: "#cf1e38",
      type: "district",
      count: (_.random(80, 150) * complete) | 0,
    },
    {
      id: "01p",
      name: "เพือไทย",
      color: "#cf1e38",
      type: "partylist",
      count: 35,
    },
    {
      id: "02d",
      name: "พลังประชารัฐ",
      color: "#3e61a8",
      type: "district",
      count: (_.random(40, 75) * complete) | 0,
    },
    {
      id: "02p",
      name: "พลังประชารัฐ",
      color: "#3e61a8",
      type: "partylist",
      count: 15,
    },
    {
      id: "03d",
      name: "ประชาธิปัตย์",
      color: "#437fba",
      type: "district",
      count: (_.random(80, 100) * complete) | 0,
    },
    {
      id: "03p",
      name: "ประชาธิปัตย์",
      color: "#437fba",
      type: "partylist",
      count: 25,
    },
    {
      id: "04d",
      name: "ภูมิใจไทย",
      color: "#102986",
      type: "district",
      count: (_.random(10, 30) * complete) | 0,
    },
    {
      id: "04p",
      name: "ภูมิใจไทย",
      color: "#102986",
      type: "partylist",
      count: 15,
    },
    {
      id: "05d",
      name: "ชาติไทยพัฒนา",
      color: "#231c72",
      type: "district",
      count: (_.random(5, 10) * complete) | 0,
    },
    {
      id: "05p",
      name: "ชาติไทยพัฒนา",
      color: "#231c72",
      type: "partylist",
      count: 3,
    },
    {
      id: "06d",
      name: "ชาติพัฒนา",
      color: "#223c88",
      type: "district",
      count: (_.random(5, 10) * complete) | 0,
    },
    {
      id: "06p",
      name: "ชาติพัฒนา",
      color: "#223c88",
      type: "partylist",
      count: 3,
    },
    {
      id: "07d",
      name: "อนาคตใหม่",
      color: "#f4792e",
      type: "district",
      count: (_.random(0, 10) * complete) | 0,
    },
    {
      id: "07p",
      name: "อนาคตใหม่",
      color: "#f4792e",
      type: "partylist",
      count: (_.random(5, 30) * complete) | 0,
    },
    {
      id: "08d",
      name: "เสรีรวมไทย",
      color: "#edd63f",
      type: "district",
      count: (_.random(0, 2) * complete) | 0,
    },
    {
      id: "08p",
      name: "เสรีรวมไทย",
      color: "#edd63f",
      type: "partylist",
      count: 5,
    },
    {
      id: "09d",
      name: "เศรษฐกิจใหม่",
      color: "#184474",
      type: "district",
      count: (_.random(0, 2) * complete) | 0,
    },
    {
      id: "09p",
      name: "เศรษฐกิจใหม่",
      color: "#184474",
      type: "partylist",
      count: 5,
    },
  ]
}
