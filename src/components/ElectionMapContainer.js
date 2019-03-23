import React, { useCallback, useContext, useMemo, useState } from "react"
import {
  checkFilter,
  filters,
  zones,
  zonePath,
  getZoneByProvinceIdAndZoneNo,
} from "../models/information"
import { useSummaryData } from "../models/LiveDataSubscription"
import {
  partyStatsFromSummaryJSON,
  isZoneFinished,
  shouldDisplayZoneData,
} from "../models/PartyStats"
import ElectionMap from "./ElectionMap"
import ElectionMapTooltip from "./ElectionMapTooltip"
import { ZoneFilterContext } from "./ZoneFilterPanel"
import { navigate } from "gatsby"
import { trackEvent } from "../util/analytics"

/**
 *
 * @param {import('../models/LiveDataSubscription').DataState<ElectionDataSource.SummaryJSON>} summaryState
 * @param {IZoneFilter} filter
 */
function getMapData(summaryState, filter) {
  if (!summaryState.completed) {
    const partylist = []
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
        return {
          id: `${zone.provinceId}-${zone.no}`,
          partyId: "nope",
          complete: false,
          show: false,
        }
      }),
      ...partylist,
    ]
  } else {
    /** @type {ElectionDataSource.SummaryJSON} */
    const summary = summaryState.data
    const partyStats = partyStatsFromSummaryJSON(summary)
    const partylist = []
    for (const row of partyStats) {
      for (let i = 0; i < row.partyListSeats; i++) {
        partylist.push({
          id: `pl-${partylist.length + 1}`,
          partyId: row.party.id,
          complete: true,
          show: true,
        })
      }
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
        const winningCandidate = (summary.zoneWinningCandidateMap[
          zone.provinceId
        ] || {})[zone.no]
        const stats = (summary.zoneStatsMap[zone.provinceId] || {})[zone.no]
        const candidate =
          shouldDisplayZoneData(stats) &&
          winningCandidate &&
          winningCandidate.score > stats.noVotes
            ? winningCandidate
            : null
        return {
          id: `${zone.provinceId}-${zone.no}`,
          partyId: candidate ? candidate.partyId : "nope",
          complete: isZoneFinished(stats),
          show: checkFilter(filter, zone),
        }
      }),
      ...partylist,
    ]
  }
}

export default function ElectionMapContainer() {
  const summaryState = useSummaryData()
  const currentFilterName = useContext(ZoneFilterContext)
  const currentFilter = filters[currentFilterName]
  const [mapTip, setMapTip] = useState(null)
  const mapZones = useMemo(() => getMapData(summaryState, currentFilter), [
    summaryState,
    currentFilter,
  ])

  const onInit = useCallback(map => {}, [])
  const onZoneMouseenter = useCallback((zone, mouseEvent) => {
    setMapTip({ zone, mouseEvent })
  }, [])
  const onZoneMousemove = useCallback((zone, mouseEvent) => {
    setMapTip({ zone, mouseEvent })
  }, [])
  const onZoneMouseleave = useCallback((zone, mouseEvent) => {
    setMapTip(null)
  }, [])
  const onZoneClick = useCallback(zone => {
    const match = zone.data.id.match(/^(\d+)-(\d+)$/)
    if (match) {
      trackEvent("View zone", { via: "Map" })
      navigate(zonePath(getZoneByProvinceIdAndZoneNo(+match[1], +match[2])))
    }
  }, [])
  return (
    <div>
      {mapTip && (
        <div
          css={{
            position: "absolute",
            zIndex: 10,
            padding: 6,
            backgroundColor: "#fff",
            pointerEvents: "none",
            maxWidth: 200,
            boxShadow: "0 0 4px 0 rgba(0, 0, 0, 0.3)",
            top: mapTip.mouseEvent.clientY + 10,
            left: mapTip.mouseEvent.clientX + 10,
          }}
        >
          <ElectionMapTooltip
            positionId={mapTip.zone.data.id}
            positions={mapZones}
          />
        </div>
      )}
      <ElectionMap
        data={mapZones}
        onInit={onInit}
        onZoneMouseenter={onZoneMouseenter}
        onZoneMousemove={onZoneMousemove}
        onZoneMouseleave={onZoneMouseleave}
        onZoneClick={onZoneClick}
      />
    </div>
  )
}
