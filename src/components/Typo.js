import styled from "@emotion/styled"
import { dynamicMargin } from "../styles/utils"
import { DISPLAY_FONT } from "../styles"

export const Title = styled.h1`
  font-family: ${DISPLAY_FONT};
  font-size: 34px;
  font-weight: 500;
  color: #000000;
  margin: 0;

  ${dynamicMargin};
`
export const SubTitle = styled.h2`
  font-family: ${DISPLAY_FONT};
  font-size: 20px;
  font-weight: 500;
  color: #000000;
  margin: 0;

  ${dynamicMargin};
`
export const BodyText = styled.p`
  margin: 0;

  ${dynamicMargin};
`
