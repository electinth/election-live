import React, { createContext } from "react"
import Placeholder from "./Placeholder"
import { filters, filterPath } from "../models/information"
import { Link } from "gatsby"

const ZoneFilterContext = createContext(/** @type {ZoneFilterName} */ ("all"))

export const ZoneFilterContextProvider = ZoneFilterContext.Provider

export function ZoneFilterPanel() {
  // @todo #1 Create a 1st version of ZoneFilterPanel component
  //  in place of the Placeholder. May be a dummy component.
  return (
    <Placeholder height={400}>
      {renderFilter("all")}
      {renderFilter("northern")}
      {renderFilter("northeastern")}
      {renderFilter("central")}
      {renderFilter("southern")}
      <hr />
      {renderFilter("urban")}
      {renderFilter("rural")}
      {renderFilter("gerrymandering")}
      {renderFilter("swing")}
    </Placeholder>
  )

  /**
   * @param {ZoneFilterName} filterName
   */
  function renderFilter(filterName) {
    return (
      <div>
        <ZoneFilterContext.Consumer>
          {currentFilterName => (
            <Link
              css={{
                fontWeight:
                  currentFilterName === filterName ? "bold" : "normal",
              }}
              to={filterPath(filterName)}
            >
              {filters[filterName].name.th}
            </Link>
          )}
        </ZoneFilterContext.Consumer>
      </div>
    )
  }
}
