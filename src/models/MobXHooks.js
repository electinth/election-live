import { autorun, computed } from "mobx"
import { useEffect, useMemo, useState } from "react"

/**
 * Utility function to subscribe to MobX.
 */
export function useComputed(fn, inputs) {
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
