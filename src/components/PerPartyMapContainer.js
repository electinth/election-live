import _ from "lodash"
import React, { useCallback, useMemo } from "react"
import { getSeatDisplayModel } from "../models/ConstituencySeat"
import { zones, getPartyById } from "../models/information"
import { useSummaryData, usePerPartyData } from "../models/LiveDataSubscription"
import {
  isZoneFinished,
  nationwidePartyStatsFromSummaryJSON,
} from "../models/PartyStats"
import { media, WIDE_NAV_MIN_WIDTH } from "../styles"
import ElectionMap, { electionMapLoadingData } from "./ElectionMap"
import ZoneMark from "./ZoneMark"

/**
 * @param {ElectionDataSource.SummaryJSON | null} summary
 * @param {string} partyId
 * @param {ReturnType<typeof computePartyCandidateModel>} perPartyModel
 */
function getMapData(summary, partyId, perPartyModel) {
  if (!summary) {
    return electionMapLoadingData
  } else {
    const row = _.find(
      nationwidePartyStatsFromSummaryJSON(summary),
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
        const { candidate: winningCandidate, zoneStats } = getSeatDisplayModel(
          summary,
          zone
        )
        const win = winningCandidate && +winningCandidate.partyId === +partyId
        const sentCandidate = perPartyModel.getCandidate(
          zone.provinceId,
          zone.no
        )
        let opacity = 1
        let winningPartyId = "nope"
        let complete = false
        const interpolate = (value, min = 0, max = 1) =>
          Math.min(1, Math.max(0, (value - min) / (max - min)))
        if (win) {
          complete = true
          winningPartyId = winningCandidate.partyId
          opacity =
            0.5 +
            0.5 *
              interpolate(
                winningCandidate.score / zoneStats.votesTotal,
                1 / 3,
                1 / 2
              )
        } else if (sentCandidate && winningCandidate) {
          winningPartyId = sentCandidate.partyId
          opacity = interpolate(sentCandidate.score / winningCandidate.score)
        }
        return {
          id: `${zone.provinceId}-${zone.no}`,
          partyId: winningPartyId,
          complete: complete,
          opacity: opacity,
          show: true,
        }
      }),
      ...partylist,
    ]
  }
}

/**
 * @param {ElectionDataSource.PerPartyJSON | null} perPartyData
 */
function computePartyCandidateModel(perPartyData) {
  const lookupTable = new Map(
    perPartyData
      ? perPartyData.constituencyCandidates.map(candidate => [
          `${candidate.provinceId}-${candidate.zone}`,
          candidate,
        ])
      : []
  )
  return {
    /**
     * @param {number} provinceId
     * @param {number} zoneNo
     * @return {ElectionDataSource.PerPartyCandidate | undefined}
     */
    getCandidate(provinceId, zoneNo) {
      return lookupTable.get(`${provinceId}-${zoneNo}`)
    },
  }
}

export default function PerPartyMapContainer({ partyId }) {
  const summaryState = useSummaryData()
  const perPartyState = usePerPartyData(partyId)
  const party = getPartyById(partyId)
  const partyCandidateModel = useMemo(
    () => computePartyCandidateModel(perPartyState.data),
    [perPartyState.data]
  )
  const mapData = useMemo(
    () => ({
      zones: getMapData(summaryState.data, partyId, partyCandidateModel),
    }),
    [summaryState.data, partyId, partyCandidateModel]
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
      <div style={{ textAlign: "center", marginBottom: 6 }}>
        <ZoneMark color={party.color} />
        มีผู้สมัครในเขตนั้น &nbsp;
        <ZoneMark color={party.color} isCompleted />
        ได้รับคะแนนสูงสุดในเขต
      </div>
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
