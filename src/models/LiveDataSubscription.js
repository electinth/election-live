/** @return {{ loading: boolean, data: ElectionDataSource.SummaryJSON }} */
export function useSummaryData() {
  // @todo #52 Replace mock data with real data loading logic.
  return {
    loading: false,
    data: require("./__mocks__/Summary1.json"),
  }
}
