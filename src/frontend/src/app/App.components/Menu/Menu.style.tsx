import styled from 'styled-components/macro'
import { backgroundColor, borderColor } from 'styles'

export const MenuStyled = styled.div`
  font-size: 14px;
  position: absolute;
  width: 100%;
  top: 30px;
  left: 0;
  z-index: 12;
`

export const MenuBar = styled.div<{ showing: boolean }>`
  margin: 0 30px;
  width: 100%;
  position: relative;
  text-align: center;
  height: 60px;
  z-index: 1;
  font-weight: 500;
  overflow: hidden;
  transition: height 1s ease-in-out;
  background: ${backgroundColor};
  box-sizing: border-box;
  border-radius: 20px;
`

export const MenuLogo = styled.img`
  width: 172px;
  margin: 12px 22px;
  display: block;
`
