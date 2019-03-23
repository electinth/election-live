import { useEffect, useCallback, useState } from "react"
import { observable } from "mobx"
import React from "react"
import { Link } from "gatsby"

export const overrideDirectory = observable.box(null)
global.ELECT_overrideDirectory = directory => overrideDirectory.set(directory)

export function useLocalStorage(name) {
  const [value, setValue] = useState(null)
  useEffect(() => {
    const listener = () => {
      setValue(localStorage[name])
    }
    setValue(localStorage[name])
    window.addEventListener("storage", listener)
    return () => window.removeEventListener("storage", listener)
  }, [])
  const changeValue = useCallback(nextValue => {
    localStorage[name] = String(nextValue)
    setValue(String(nextValue))
  }, [])
  return [value, changeValue]
}

export function useLocalStorageFlag(name) {
  const [value, setValue] = useLocalStorage(name)
  const changeValue = useCallback(nextValue => {
    setValue(nextValue ? "1" : "")
  }, [])
  return [!!value, changeValue]
}

export function DeveloperPanel() {
  const [devMode] = useLocalStorageFlag("ELECT_DEVELOPER_PANEL")
  const [expand, setExpand] = useState(false)
  if (!devMode) return null
  return (
    <div
      css={{
        position: "fixed",
        left: 20,
        top: 0,
        background: "#F0324B",
        color: "#fff",
        zIndex: 20000,
        padding: "2px",
        a: { color: "#ff0" },
      }}
    >
      <button
        css={{ background: "transparent", color: "white", border: "0" }}
        onClick={() => setExpand(x => !x)}
      >
        🛠
      </button>
      <div css={{ background: "#333", display: expand ? "block" : "none" }}>
        <Link to="/dev">Options</Link>{" "}
        <Link to="/dev/inspect">Inspect data</Link>
      </div>
    </div>
  )
}
