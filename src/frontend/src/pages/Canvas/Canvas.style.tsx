import styled, { keyframes } from 'styled-components/macro'
import { backgroundColor, textColor } from 'styles'

export const CanvasStyled = styled.div``

export const CanvasLeftMenu = styled.div`
  position: absolute;
  width: 260px;
  top: 110px;
  left: 30px;
  padding: 20px;
  background: ${backgroundColor};
  box-sizing: border-box;
  border-radius: 20px;
`

export const CanvasRightMenu = styled.div`
  position: absolute;
  width: 260px;
  top: 110px;
  right: 30px;
  padding: 20px;
  background: ${backgroundColor};
  box-sizing: border-box;
  border-radius: 20px;
`

export const SimpleButton = styled.div`
  cursor: pointer;
  background: ${textColor};
  border-radius: 5px;
  padding: 10px;
  color: ${backgroundColor};
  text-align: center;
  font-weight: bold;
  height: 36px;
`

const turn = keyframes`
  100% {
      transform: rotate(-360deg);
  }
`

export const CanvasLoading = styled.div`
  > div {
    display: inline-block;
  }

  > svg {
    animation: ${turn} 1.6s linear infinite forwards;
    display: inline-block;
    width: 24px;
    height: 24px;
    stroke: ${textColor};
    margin-right: 10px;
    margin-bottom: -8px;
  }
`

export const LayerVoting = styled.div`
  margin: 20px 0;
  display: grid;
  grid-template-columns: 40% 30% 15% 15%;
  grid-gap: 10px;
  background-color: #1f1f1f;
  border-radius: 10px;
  padding: 10px;

  > img:nth-child(1) {
    max-height: 100px;
    max-width: 200px;
  }

  > div {
    line-height: 100px;
  }

  > img:nth-child(3),
  > img:nth-child(4) {
    margin: 40px;
    cursor: pointer;
  }
`

export const CanvasStageStyled = styled.div`
  margin: 0;
  padding: 0;
  overflow: hidden;
  background: #000;
  background: linear-gradient(115deg, transparent 75%, rgba(30, 30, 30, 0.8) 75%) 0 0,
    linear-gradient(245deg, transparent 75%, rgba(30, 30, 30, 0.8) 75%) 0 0,
    linear-gradient(115deg, transparent 75%, rgba(30, 30, 30, 0.8) 75%) 7px -15px,
    linear-gradient(245deg, transparent 75%, rgba(30, 30, 30, 0.8) 75%) 7px -15px, #000;
  background-size: 15px 30px;
`
