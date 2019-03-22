import {
  observable,
  onBecomeObserved,
  runInAction,
  computed,
  autorun,
} from "mobx"
import { useMemo, useEffect, useState } from "react"

const summaryStore = observable({
  loading: true,
  dataBox: observable.box(null),
})

/**
 * Utility function to subscribe to MobX.
 */
function useComputed(fn, inputs) {
  const box = useMemo(() => computed(fn), inputs)
  const [, setRerenderCount] = useState(0)
  useEffect(
    () =>
      autorun(() => {
        box.get()
        setRerenderCount(x => x + 1)
      }),
    [box]
  )
  return box.get()
}

onBecomeObserved(summaryStore.dataBox, () => {
  setTimeout(() => {
    import("./__fixtures__/Summary20190322080003.json").then(result => {
      runInAction("Summary data loaded", () => {
        summaryStore.loading = false
        summaryStore.dataBox.set(result)
      })
    })
  }, 1000)
})

/** @return {{ loading: boolean, data: ElectionDataSource.SummaryJSON }} */
export function useSummaryData() {
  // @todo #52 Replace mock data with real data loading logic.
  return useComputed(
    () => ({
      loading: summaryStore.loading,
      data: summaryStore.dataBox.get(),
    }),
    []
  )
}

/** @return {{ loading: boolean, data?: ElectionDataSource.PerProvinceJSON }} */
export function usePerProvinceData(provinceId) {
  // @todo #52 Replace mock data for per-province with real data loading logic.
  return provinceId === 10
    ? {
        loading: false,
        data: require("./__fixtures__/Bangkok20190322080003.json"),
      }
    : { loading: true }
}

/** @return {{ loading: boolean, data?: ElectionDataSource.PerZoneData }} */
export function usePerZoneData(provinceId, zoneNo) {
  const perProvinceData = usePerProvinceData(provinceId)
  if (perProvinceData.loading) {
    return { loading: true }
  }
  return {
    loading: false,
    data: perProvinceData.data.zoneInformationMap[zoneNo],
  }
}
