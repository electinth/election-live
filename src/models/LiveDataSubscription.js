import { useEffect, useState } from "react"

/** @return {{ loading: boolean, data: ElectionDataSource.SummaryJSON }} */
export function useSummaryData() {
  // @todo #52 Replace mock data with real data loading logic.
  const [state, setState] = useState({
    loading: true,
    data: null,
  })
  useEffect(() => {
    setTimeout(() => {
      import("./__fixtures__/Summary1.json").then(result => {
        console.log(result)
        setState({
          loading: false,
          data: result,
        })
      })
    }, 1000)
  }, [])
  return state
}
