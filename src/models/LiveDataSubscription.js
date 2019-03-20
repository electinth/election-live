/** @return {{ loading: boolean, data: ElectionDataSource.SummaryJSON }} */
export function useSummaryData() {
  // @todo #52 Replace mock data with real data loading logic.
  return {
    loading: false,
    // @todo #52 [Refactor] Move models/__mocks__ to __fixtures__
    data: require("./__mocks__/Summary1.json"),
  }
}
