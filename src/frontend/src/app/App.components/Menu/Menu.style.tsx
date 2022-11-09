import styled from 'styled-components/macro'
import { backgroundColor } from 'styles'

export const MenuStyled = styled.div`
  font-size: 14px;
  position: absolute;
  width: 100%;
  top: 30px;
  left: 0;
  z-index: 12;
`

export const MenuBar = styled.div`
  margin: 0 30px;
  width: calc(100% - 60px);
  position: relative;
  text-align: center;
  height: 60px;
  z-index: 1;
  font-weight: 500;
  background: ${backgroundColor};
  box-sizing: border-box;
  border-radius: 20px;
  display: grid;
  grid-template-columns: 172px auto 440px;
  grid-gap: 10px;
`

export const MenuLogo = styled.img`
  width: 172px;
  margin: 12px 22px;
  display: block;
`

export const MenuLeft = styled.div`
  float: right;
  display: grid;
  grid-template-columns: 100px 100px 200px;
  grid-gap: 20px;
  margin: 20px 0;
  width: 440px;

  button {
    margin: -10px 0 !important;
  }
`

export const MenuLoading = styled.img`
  margin: 0 auto;
  height: 20px;
  width: 20px;
`
