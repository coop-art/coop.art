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

  button {
    margin-bottom: 10px !important;
    width: 220px;
  }
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
  padding: 10px;
  font-size: 14px;
  color: ${backgroundColor};
  text-align: center;
  font-weight: bold;
  height: 40px;
  border: 1px solid ${textColor};
  box-sizing: border-box;
  border-radius: 10px;
  margin-bottom: 10px;
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

export const CanvasLayers = styled.div``

export const CanvasLayer = styled.div`
  width: 220px;
  height: 70px;
  padding: 10px;
  display: grid;
  grid-template-columns: 50px 130px;
  grid-gap: 20px;
  margin-bottom: 10px;

  background: #181818;
  border-radius: 10px;
`

export const CanvasLayerDetails = styled.div`
  display: grid;
  grid-template-columns: 100px 24px;
  grid-gap: 6px;

  .title {
    margin-top: 3px;
    font-weight: 700;
    font-size: 14px;
    line-height: 17px;
  }

  .subTitle {
    margin-top: 1px;
    font-weight: 400;
    font-size: 12px;
    line-height: 15px;
    color: #b1b1b1;
  }
`

export const CanvasLayerCheckbox = styled.div`
  /* Customize the label (the container) */
  .container {
    display: block;
    position: relative;
    padding-left: 35px;
    margin-bottom: 12px;
    cursor: pointer;
    font-size: 22px;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }

  /* Hide the browser's default checkbox */
  .container input {
    position: absolute;
    opacity: 0;
    cursor: pointer;
    height: 0;
    width: 0;
  }

  /* Create a custom checkbox */
  .checkmark {
    position: absolute;
    top: 0;
    left: 0;
    height: 25px;
    width: 25px;
    background: #000000;
    border-radius: 6px;
  }

  /* On mouse-over, add a grey background color */
  .container:hover input ~ .checkmark {
    background-color: #111111;
  }

  /* When the checkbox is checked, add a blue background */
  .container input:checked ~ .checkmark {
    background-color: #000;
  }

  /* Create the checkmark/indicator (hidden when not checked) */
  .checkmark:after {
    content: '';
    position: absolute;
    display: none;
  }

  /* Show the checkmark when checked */
  .container input:checked ~ .checkmark:after {
    display: block;
  }

  /* Style the checkmark/indicator */
  .container .checkmark:after {
    left: 9px;
    top: 5px;
    width: 5px;
    height: 10px;
    border: solid white;
    border-width: 0 3px 3px 0;
    -webkit-transform: rotate(45deg);
    -ms-transform: rotate(45deg);
    transform: rotate(45deg);
  }
`

export const CanvasLayerVotes = styled.div<{ upVotes: number; downVotes: number }>`
  margin-top: 5px;
  position: relative;
  width: 100%;
  height: 4px;
  background: #ff0000;
  border-radius: 2px;

  > div {
    position: absolute;
    top: 0;
    left: 0;
    width: ${(props) => (props.upVotes / (props.upVotes + props.downVotes || 1)) * 100}%;
    height: 4px;
    background: #00ff19;
    border-radius: 2px;
  }
`
