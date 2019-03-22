import { format } from "d3-format"

const formatter = format(",d")

export const numberWithCommas = num => formatter(num)
