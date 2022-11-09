import * as React from 'react'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router'
import { State } from 'reducers'

import { CanvasView, Layer } from './Canvas.view'

export type Vote = {
  layerId: number
  up: boolean
}

export const Canvas = () => {
  const { address } = useSelector((state: State) => state.wallet)
  const dispatch = useDispatch()

  const [loadingLayers, setLoadingLayers] = useState(false)
  const [existingLayers, setExistingLayers] = useState<Layer[]>([])
  let { canvasId } = useParams<{ canvasId?: string }>()

  const loadStorage = React.useCallback(async () => {
    if (canvasId) {
      setLoadingLayers(true)
      setExistingLayers([])
    }
    setLoadingLayers(false)
  }, [canvasId])

  useEffect(() => {
    loadStorage()
  }, [loadStorage])

  const mintCallback = React.useCallback(async ({ layerId, up }: Vote) => {
    //todo
  }, [])

  const voteCallback = React.useCallback(async ({ layerId, up }: Vote) => {
    //todo
  }, [])

  return (
    <CanvasView
      loadingLayers={loadingLayers}
      mintCallback={mintCallback}
      voteCallback={voteCallback}
      address={address}
      existingLayers={existingLayers}
      urlCanvasId={canvasId}
    />
  )
}
