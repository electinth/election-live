import React, { useState } from "react"
import { zones } from "../models/information"
export default function ElectionMapTooltip(props) {
  const { zoneId } = props
  const [state, setState] = useState({})

  if (state && zoneId != state.zoneId) {
    const matchZone = zoneId.match(/^(\d+)-(\d+)$/)
    if (matchZone) {
      setState({
        zoneId,
        zone: zones.filter(z => `${z.provinceId}-${z.no}` == zoneId)[0],
      })
    } else {
      const matchSeat = zoneId.match(/^pl-(\d+)$/)
      setState({
        zoneId,
        seat: {
          no: matchSeat[1],
        },
      })
    }
  }

  return (
    <div>
      {state.zone && (
        <div>
          <div>เขตเลือกตั้งที่ {state.zone.no}</div>
          <div>
            <small>{state.zone.details}</small>
          </div>
        </div>
      )}
      {state.seat && (
        <div>
          <div>ส.ส. บัญชีรายชื่ออันดับที่ {state.seat.no}</div>
          <div>
            <small />
          </div>
        </div>
      )}
    </div>
  )
}
