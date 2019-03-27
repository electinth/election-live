import React, { useState, useEffect } from "react"
import _ from "lodash"
import { Debug } from "../util/Debug"
import { EventEmitter } from "events"

/** @typedef {'th' | 'en'} Language */
const debug = Debug("elect:l10n")
const languageChangeEmitter = new EventEmitter()
languageChangeEmitter.setMaxListeners(10000)
let currentLanguage = /** @type {Language} */ ("th")
let loaded = false

export function LocalizedText({ thai, english = thai }) {
  const [language, setLanguage] = useState(currentLanguage)
  useEffect(() => {
    const listener = () => setLanguage(currentLanguage)
    languageChangeEmitter.on("change", listener)
    return () => languageChangeEmitter.removeListener("change", listener)
  }, [])
  useEffect(() => {
    if (loaded) return
    try {
      const targetLanguage = localStorage.ELECT_LANGUAGE === "en" ? "en" : "th"
      requestAnimationFrame(() => {
        debug("Set language to", targetLanguage, "from localStorage")
        if (currentLanguage !== targetLanguage) {
          currentLanguage = targetLanguage
          languageChangeEmitter.emit("change")
        }
      })
    } catch (e) {
      debug("Cannot load language from localStorage", e)
    } finally {
      loaded = true
    }
  }, [])
  return <span>{language === "en" ? english : thai}</span>
}

export function __(thai, english) {
  return <LocalizedText thai={thai} english={english} />
}

/**
 * @param {Language} lang
 */
export function setLanguage(lang = "th") {
  currentLanguage = lang
  try {
    if (localStorage.ELECT_LANGUAGE !== lang) {
      localStorage.ELECT_LANGUAGE = lang
      debug("Persisted language", lang, "to localStorage")
    }
  } catch (e) {
    debug("Cannot persist language to", lang, e)
  }
  languageChangeEmitter.emit("change")
}
