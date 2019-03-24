// parties = [{name: 'partyname', seats: 12}, ...]

const BASE = "https://elect.in.th/election-simulator/"

export default function generateSimulatorUrl(parties) {
  const hash = parties.reduce((acc, curr) => {
    acc[curr.name] = curr.seats

    return acc
  }, {})
  const param = encodeURIComponent(JSON.stringify(hash))
  return `${BASE}?election=${param}`
}
