import { useEffect, useCallback, useState } from "react"
import { observable } from "mobx"
import React from "react"
import { Link } from "gatsby"

export const overrideDirectory = observable.box(null)
global.ELECT_overrideDirectory = directory => overrideDirectory.set(directory)

export function useLocalStorage(name) {
  const [value, setValue] = useState(null)
  useEffect(() => {
    try {
      if (typeof localStorage !== "object" || !localStorage) return
      const listener = () => {
        setValue(localStorage[name])
      }
      setValue(localStorage[name])
      window.addEventListener("storage", listener)
      return () => window.removeEventListener("storage", listener)
    } catch (e) {
      return
    }
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
        <Link to="/dev">Options</Link>
        {" | "}
        <Link to="/dev/inspect">Inspect data</Link>
        <br />
        <button
          onClick={() =>
            overrideDirectory.set(
              window.prompt("Enter data directory (please check the catalogue)")
            )
          }
        >
          Time travel
        </button>{" "}
        <a
          href="https://github.com/codeforthailand/election-live/issues/98"
          target="_blank"
        >
          Catalogue
        </a>
        <br />
        {mockDirectories.map(([percentage, directory]) => (
          <a
            href="javascript://"
            onClick={() => overrideDirectory.set(directory)}
          >
            |
          </a>
        ))}
      </div>
    </div>
  )
}

const mockDirectories = [
  [2, "mock-20190323223405"],
  [4, "mock-20190323223504"],
  [6, "mock-20190323225205"],
  [8, "mock-20190323225304"],
  [11, "mock-20190323225405"],
  [13, "mock-20190323225505"],
  [15, "mock-20190323225605"],
  [17, "mock-20190323225705"],
  [19, "mock-20190323225804"],
  [21, "mock-20190323225905"],
  [23, "mock-20190323230006"],
  [25, "mock-20190323230105"],
  [28, "mock-20190323230205"],
  [30, "mock-20190323230305"],
  [32, "mock-20190323230405"],
  [34, "mock-20190323230505"],
  [36, "mock-20190323230604"],
  [38, "mock-20190323230705"],
  [40, "mock-20190323230805"],
  [43, "mock-20190323230906"],
  [45, "mock-20190323231005"],
  [47, "mock-20190323231105"],
  [49, "mock-20190323231205"],
  [51, "mock-20190323231306"],
  [53, "mock-20190323231405"],
  [55, "mock-20190323231505"],
  [57, "mock-20190323231605"],
  [60, "mock-20190323231705"],
  [62, "mock-20190323231805"],
  [64, "mock-20190323231905"],
  [66, "mock-20190323232005"],
  [68, "mock-20190323232105"],
  [70, "mock-20190323232204"],
  [72, "mock-20190323232304"],
  [74, "mock-20190323232405"],
  [76, "mock-20190323232505"],
  [76, "mock-20190323232605"],
]
