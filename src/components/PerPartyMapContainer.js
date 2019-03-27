import _ from "lodash"
import React, { useCallback, useMemo } from "react"
import { getSeatDisplayModel } from "../models/ConstituencySeat"
import { zones } from "../models/information"
import { useSummaryData } from "../models/LiveDataSubscription"
import {
  isZoneFinished,
  nationwidePartyStatsFromSummaryJSON,
} from "../models/PartyStats"
import { media, WIDE_NAV_MIN_WIDTH } from "../styles"
import ElectionMap, { electionMapLoadingData } from "./ElectionMap"

/**
 * @param {import('../models/LiveDataSubscription').DataState<ElectionDataSource.SummaryJSON>} summaryState
 */
function getMapData(summaryState, partyId) {
  if (!summaryState.completed) {
    return electionMapLoadingData
  } else {
    /** @type {ElectionDataSource.SummaryJSON} */
    const summary = summaryState.data
    const row = _.find(
      nationwidePartyStatsFromSummaryJSON(summaryState.data),
      row => row.party.id === +partyId
    )
    if (!row) return electionMapLoadingData
    const partylist = []
    for (let i = 0; i < row.partyListSeats; i++) {
      partylist.push({
        id: `pl-${partylist.length + 1}`,
        partyId: row.party.id,
        complete: true,
        show: true,
      })
    }
    while (partylist.length < 150) {
      partylist.push({
        id: `pl-${partylist.length + 1}`,
        partyId: "nope",
        complete: true,
        show: false,
      })
    }
    return [
      ...zones.map((zone, i) => {
        const { candidate, zoneStats } = getSeatDisplayModel(summary, zone)
        const onMap = candidate && candidate.partyId === partyId
        return {
          id: `${zone.provinceId}-${zone.no}`,
          partyId: onMap ? candidate.partyId : "nope",
          complete: onMap && isZoneFinished(zoneStats),
          show: true,
        }
      }),
      ...partylist,
    ]
  }
}

export default function PerPartyMapContainer({ partyId }) {
  const summaryState = useSummaryData()
  const mapData = useMemo(
    () => ({ zones: getMapData(summaryState, partyId) }),
    [summaryState, partyId]
  )

  const onInit = useCallback(map => {}, [])
  const onZoneMouseenter = useCallback((zone, mouseEvent) => {}, [])
  const onZoneMousemove = useCallback((zone, mouseEvent) => {}, [])
  const onZoneMouseleave = useCallback((zone, mouseEvent) => {}, [])
  const onZoneClick = useCallback(zone => {}, [])

  return (
    <div
      css={{
        margin: "0 -16px",
        pointerEvents: "none",
        [media(WIDE_NAV_MIN_WIDTH)]: {
          marginLeft: "0 0",
        },
      }}
    >
      <ElectionMap
        data={mapData}
        onInit={onInit}
        onZoneMouseenter={onZoneMouseenter}
        onZoneMousemove={onZoneMousemove}
        onZoneMouseleave={onZoneMouseleave}
        onZoneClick={onZoneClick}
      />
    </div>
  )
}
