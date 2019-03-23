import React from "react"
import ContentWrapper from "../../components/ContentWrapper"
import MainLayout from "../../components/MainLayout"
import { Link } from "gatsby"
import { useLocalStorageFlag } from "../../models/DeveloperOptions"

export default () => {
  return (
    <MainLayout>
      <ContentWrapper>
        <h1>Developer tools</h1>
        <ul>
          <li>
            <Link to="/dev/kitchen-sink">Kitchen sink</Link>
          </li>
          <li>
            <Link to="/dev/inspect">Data inspect</Link>
          </li>
        </ul>
        <h2>Options</h2>
        <ul>
          <DeveloperFlag name="ELECT_DISABLE_CURTAIN" />
          <DeveloperFlag name="ELECT_DEVELOPER_PANEL" />
        </ul>
      </ContentWrapper>
    </MainLayout>
  )
}

function DeveloperFlag({ name }) {
  const [value, setValue] = useLocalStorageFlag(name)
  return (
    <li>
      <button onClick={() => setValue(!value)}>
        <strong>{name}</strong>
      </button>{" "}
      = {value ? "true" : "false"}
    </li>
  )
}
