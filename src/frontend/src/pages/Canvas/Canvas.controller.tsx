import * as React from 'react'
import { useEffect, useState, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router'
import { State } from 'reducers'

import { CanvasView, Layer } from './Canvas.view'

export const Canvas = () => {
  const { address } = useSelector((state: State) => state.wallet)
  const dispatch = useDispatch()

  const [loadingLayers, setLoadingLayers] = useState(false)
  const [existingLayers, setExistingLayers] = useState<Layer[]>([])
  let { urlCanvasId } = useParams()
  let canvasId = useRef<number | undefined>(undefined)

  useEffect(() => {
    canvasId.current = urlCanvasId ? parseInt(urlCanvasId, 10) : undefined
  }, [urlCanvasId])

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

  const updateMetaCallback = React.useCallback(async () => {
    //todo
  }, [])

  const addLayerCallback = React.useCallback(async () => {
    //todo
  }, [])

  const upVoteCallback = React.useCallback(async (layerId: number) => {
    //todo
  }, [])

  const downVoteCallback = React.useCallback(async (layerId: number) => {
    //todo
  }, [])

  console.log('canvasId', canvasId)
  return (
    <CanvasView
      loadingLayers={loadingLayers}
      addLayerCallback={addLayerCallback}
      upVoteCallback={upVoteCallback}
      downVoteCallback={downVoteCallback}
      address={address}
      existingLayers={existingLayers}
      canvasId={canvasId.current}
    />
  )
}
