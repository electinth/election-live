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
    import("./__fixtures__/Summary20190321155702.json").then(result => {
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
