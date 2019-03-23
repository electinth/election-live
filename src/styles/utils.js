import { css } from "@emotion/core"

const unitParser = x => (typeof x === "number" ? `${x}px` : x)

export const dynamicMargin = ({ mt, mr, mb, ml }) => css`
  margin-top: ${unitParser(mt)};
  margin-right: ${unitParser(mr)};
  margin-bottom: ${unitParser(mb)};
  margin-left: ${unitParser(ml)};
`
