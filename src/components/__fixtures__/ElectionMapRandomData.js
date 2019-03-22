import { useState, useEffect } from "react"
import _ from "lodash"
import { zones, parties } from "../../models/information"

export function useRandomElectionMapData() {
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
    }, 20000)
    return () => clearInterval(interval)
  }, [])

  return mapZones
}
