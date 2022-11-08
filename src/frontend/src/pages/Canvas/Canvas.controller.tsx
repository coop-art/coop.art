import { useSelector, useDispatch } from 'react-redux'
import { State } from 'reducers'
import { CanvasView } from './Canvas.view'
import { useParams } from 'react-router-dom'
import { useEffect } from 'react'

export const Canvas = () => {
  let { canvasId } = useParams()
  const { address } = useSelector((state: State) => state.wallet)
  const dispatch = useDispatch()

  return <CanvasView address={address} />
}
