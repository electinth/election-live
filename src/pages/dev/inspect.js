import React, { useMemo } from "react"
import ContentWrapper from "../../components/ContentWrapper"
import MainLayout from "../../components/MainLayout"
import {
  useSummaryData,
  useLatestDirectoryState,
} from "../../models/LiveDataSubscription"
import {
  partyStatsRowTotalSeats,
  nationwidePartyStatsFromSummaryJSON,
} from "../../models/PartyStats"
import {
  zones,
  getProvinceById,
  partyColor,
  getPartyById,
} from "../../models/information"

export default () => {
  return (
    <MainLayout>
      <DataInspector />
    </MainLayout>
  )
}

const Table = ({ children }) => (
  <table
    css={{
      borderCollapse: "collapse",
      "td, th": {
        border: "1px solid #eee",
        padding: "2px 4px",
      },
    }}
  >
    {children}
  </table>
)

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
      <h2>Party Stats</h2>
      {summaryState.completed ? (
        <PartyStatsInspector summary={summaryState.data} />
      ) : (
        "Loading"
      )}
      <h2>Summary</h2>
      {summaryState.completed ? (
        <SummaryInspector summary={summaryState.data} />
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
  const partyStats = useMemo(
    () => nationwidePartyStatsFromSummaryJSON(summary),
    [summary]
  )
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
            <td>
              <span
                style={{
                  background: row.party.color,
                  width: 40,
                  display: "inline-block",
                }}
              >
                &nbsp;
              </span>{" "}
              {row.party.name}
            </td>
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

function SummaryInspector({ summary }) {
  return (
    <Table>
      <thead>
        <th>จังหวัด</th>
        <th>เขต</th>
        <th>% completed</th>
        <th>Good</th>
        <th>Bad</th>
        <th>No</th>
        <th>Total</th>
        <th>Winning Candidate</th>
      </thead>
      <tbody>
        {zones.map(zone => {
          /** @type {ElectionDataSource.ZoneStats} */
          const stats =
            (summary.zoneStatsMap[zone.provinceId] || {})[zone.no] || {}
          const winning = (summary.zoneWinningCandidateMap[zone.provinceId] ||
            {})[zone.no]
          return (
            <tr key={zone.provinceId + ":" + zone.no}>
              <td>
                {zone.provinceId} - {getProvinceById(zone.provinceId).name}
              </td>
              <td>{zone.no}</td>
              <td css={styles.numeral}>{stats.progress}</td>
              <td css={styles.numeral}>{stats.goodVotes}</td>
              <td css={styles.numeral}>{stats.badVotes}</td>
              <td css={styles.numeral}>{stats.noVotes}</td>
              <td css={styles.numeral}>{stats.votesTotal}</td>
              <td>{!!winning && renderWinning(winning)}</td>
            </tr>
          )
          /**
           * @param {ElectionDataSource.Candidate} candidate
           */
          function renderWinning(candidate) {
            const party = getPartyById(candidate.partyId)
            return (
              <span
                style={{
                  textDecoration:
                    candidate.score <= stats.noVotes ? "line-through" : "none",
                  opacity: candidate.score <= stats.noVotes ? 0.3 : 1,
                }}
              >
                <span style={{ color: partyColor(party) }}>
                  {party.name}#{candidate.no}
                </span>
              </span>
            )
          }
        })}
      </tbody>
    </Table>
  )
}
