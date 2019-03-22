import ElectionMap from "./ElectionMap"
import { useState, useEffect } from "react"
import { zones, parties } from "../models/information"
import React from "react"
import _ from "lodash"

export default function ElectionMapContainer() {
  // @todo #30 Push realtime result to election map instead of mock data
  const mockElectedParties = [1, 8, 10, 12, 15, 39, 68, 72, 83, 84]
  const [mapZones, setMapZones] = useState([
    // zone
    ...zones.map((zone, i) => {
      return {
        id: `${zone.provinceId}-${zone.no}`,
        partyId: mockElectedParties[_.random(mockElectedParties.length)],
        complete: Math.random() > 0.5,
        show: ((zone.provinceId / 10) | 0) === 5, // hide non- nothern regions
      }
    }),
    // senate
    ..._.range(150).map(i => ({
      id: `pl-${i + 1}`,
      partyId: mockElectedParties[_.random(mockElectedParties.length)],
      complete: Math.random() > 0.5,
      show: true,
    })),
  ])
  const [mapTip, setMapTip] = useState(null)
  useEffect(() => {
    const interval = setInterval(() => {
      setMapZones(_zones => {
        return _zones.map(zone =>
          Math.random() > 0.7
            ? zone
            : {
                ...zone,
                partyId: parties[(Math.random() * parties.length) | 0].id,
              }
        )
      })
    }, 10000)
    return () => clearInterval(interval)
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
            boxShadow: "0 0 4px 0 rgba(0, 0, 0, 0.3)",
            top: mapTip.mouseEvent.clientY + 10,
            left: mapTip.mouseEvent.clientX + 10,
          }}
        >
          <div>เขต {mapTip.zone.data.id}</div>
          <div>พรรคผ่อน</div>
          <div>
            <small>นอนบ้างนะ</small>
          </div>
        </div>
      )}
      <ElectionMap
        data={mapZones}
        onInit={map => {
          // console.log('map', map);
        }}
        onZoneMouseenter={(zone, mouseEvent) => {
          setMapTip({ zone, mouseEvent })
          // console.log('zone', zone);
        }}
        onZoneMousemove={(zone, mouseEvent) => {
          setMapTip({ zone, mouseEvent })
          // console.log('zone', zone);
        }}
        onZoneMouseleave={(zone, mouseEvent) => {
          setMapTip(null)
          // console.log('zone', zone);
        }}
        onZoneClick={zone => {
          // console.log('zoneClick', zone)
        }}
      />
    </div>
  )
}
