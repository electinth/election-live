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
  [2, "20190323180205"],
  [4, "20190323180306"],
  [11, "20190323180626"],
  [13, "20190323180705"],
  [15, "20190323180806"],
  [17, "20190323180905"],
  [19, "20190323181005"],
  [21, "20190323181122"],
  [23, "20190323181204"],
  [25, "20190323181305"],
  [28, "20190323181405"],
  [30, "20190323181506"],
  [32, "20190323181606"],
  [34, "20190323181704"],
  [36, "20190323181806"],
  [38, "20190323181906"],
  [41, "20190323182005"],
  [42, "20190323182106"],
  [45, "20190323182204"],
  [47, "20190323182305"],
  [49, "20190323182405"],
  [51, "20190323182505"],
  [53, "20190323182606"],
  [55, "20190323182706"],
  [57, "20190323182806"],
  [59, "20190323182905"],
  [62, "20190323183005"],
  [64, "20190323183105"],
  [66, "20190323183209"],
  [68, "20190323183306"],
  [70, "20190323183405"],
  [72, "20190323183506"],
  [74, "20190323183605"],
  [77, "20190323183705"],
]
