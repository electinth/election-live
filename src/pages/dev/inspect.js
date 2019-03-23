import React, { useMemo } from "react"
import ContentWrapper from "../../components/ContentWrapper"
import MainLayout from "../../components/MainLayout"
import {
  useSummaryData,
  useLatestDirectoryState,
} from "../../models/LiveDataSubscription"
import {
  partyStatsFromSummaryJSON,
  partyStatsRowTotalSeats,
} from "../../models/PartyStats"

export default () => {
  return (
    <MainLayout>
      <DataInspector />
    </MainLayout>
  )
}

const Table = ({ children }) => <table>{children}</table>

const styles = {
  numeral: {
    fontFamily: "Menlo, Consolas",
    textAlign: "right",
  },
}

function DataInspector() {
  const latestDirectoryState = useLatestDirectoryState()
  const summaryState = useSummaryData()
  return (
    <ContentWrapper>
      <h1>Data inspector</h1>
      <h2>State</h2>
      <Table>
        <thead>
          <th>Resource</th>
          <th>Loading</th>
          <th>Failed</th>
          <th>Completed</th>
          <th>Result</th>
        </thead>
        <tbody>
          {renderRow("latestDirectory", latestDirectoryState, data => data)}
          {renderRow("summary", summaryState, data => "Loaded")}
        </tbody>
      </Table>
      <h2>Summary State</h2>
      {summaryState.completed ? (
        <PartyStatsInspector summary={summaryState.data} />
      ) : (
        "Loading"
      )}
    </ContentWrapper>
  )
  function renderRow(title, state, f) {
    return (
      <tr>
        <td>{title}</td>
        <td>{state.loading ? "[YES]" : null}</td>
        <td>{state.failed ? "[YES]" : null}</td>
        <td>{state.completed ? "[YES]" : null}</td>
        <td>
          {state.completed
            ? f(state.data)
            : state.failed
            ? String(state.error)
            : "-"}
        </td>
      </tr>
    )
  }
}

function PartyStatsInspector({ summary }) {
  const partyStats = useMemo(() => partyStatsFromSummaryJSON(summary), [
    summary,
  ])
  return (
    <Table>
      <thead>
        <th>พรรค</th>
        <th>คะแนนทั้งประเทศ</th>
        <th>เขต</th>
        <th>บัญชีรายชื่อ</th>
        <th>รวม</th>
        <th>พึงมี</th>
      </thead>
      <tbody>
        {partyStats.map(row => (
          <tr key={row.party.id}>
            <td>{row.party.name}</td>
            <td css={styles.numeral}>{row.score}</td>
            <td css={styles.numeral}>{row.constituencySeats}</td>
            <td css={styles.numeral}>{row.partyListSeats}</td>
            <td css={styles.numeral}>{partyStatsRowTotalSeats(row)}</td>
            <td css={styles.numeral}>{row.seatsCeiling.toFixed(4)}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  )
}
