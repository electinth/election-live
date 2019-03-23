import React, { useMemo } from "react"
import { zones, parties } from "../models/information"
export default function ElectionMapTooltip({ positionId, positions }) {
  const memo = useMemo(() => {
    const position = positions.find(p => p.id == positionId)
    const party = parties.find(p => p.id == position.partyId)
    const matchZone = positionId.match(/^(\d+)-(\d+)$/)
    if (matchZone) {
      return {
        zone: zones.find(
          z => z.provinceId == matchZone[1] && z.no == matchZone[2]
        ),
        party: party ? `พรรค${party.name}` : null,
      }
    } else {
      const matchSeat = positionId.match(/^pl-(\d+)$/)
      return {
        seat: {
          no: matchSeat[1],
        },
        party: party ? `พรรค${party.name}` : null,
      }
    }
  },[positionId])

  return (
    <div>
      {memo.zone && (
        <div>
          <div>เขตเลือกตั้งที่ {memo.zone.no}</div>
          <div>{memo.party}</div>
          <div>
            <small>{memo.zone.details}</small>
          </div>
        </div>
      )}
      {memo.seat && (
        <div>
          <div>ส.ส. บัญชีรายชื่ออันดับที่ {memo.seat.no}</div>
          <div>{memo.party}</div>
        </div>
      )}
    </div>
  )
}
