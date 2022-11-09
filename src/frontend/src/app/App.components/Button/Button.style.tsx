import styled, { css } from 'styled-components/macro'

import { backgroundColor, primaryColor, textColor } from '../../../styles'

export const ButtonStyled = styled.button<{ appearance: string }>`
  ${(props) => {
    let elementBackgroundColor = primaryColor
    let elementTextColor = textColor

    switch (props.appearance) {
      case 'primary':
        elementBackgroundColor = textColor
        elementTextColor = backgroundColor
        break
      case 'secondary':
        elementBackgroundColor = backgroundColor
        elementTextColor = textColor
        break
      case 'tertiary':
        elementBackgroundColor = backgroundColor
        elementTextColor = textColor
        break
      default:
        elementBackgroundColor = primaryColor
        elementTextColor = textColor
    }

    return css`
      background: ${elementBackgroundColor};
      color: ${elementTextColor};

      svg {
        stroke: ${elementTextColor};
      }
    `
  }}

  font-family: 'Electrolize', Helvetica, Arial, sans-serif;
  height: 40px;
  background-blend-mode: soft-light, normal;
  border: 1px solid ${textColor};
  box-sizing: border-box;
  border-radius: 10px;
  font-weight: bold;
  font-size: 14px;
  display: grid;
  grid-template-columns: 18px auto;
  grid-gap: 10px;
  cursor: pointer;
  line-height: 40px;
  padding: 0 10px !important;
  margin: 0 auto !important;
  width: 170px;

  > svg {
    margin: 10px 0;
    width: 18px;
    height: 18px;
  }
`

export const ButtonLoading = styled.img`
  margin: 5px auto 0;
  height: 40px;
  width: 40px;
`
