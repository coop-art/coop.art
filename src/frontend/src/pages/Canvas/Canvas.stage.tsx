import { useEffect, useState } from 'react'
import { Layer as KonvaLayer, Stage } from 'react-konva'

import { CanvasImage } from './Canvas.image'
// prettier-ignore
import { CanvasStageStyled } from "./Canvas.style";
import { Layer } from './Canvas.view'

type CanvasStageProps = {
  existingLayers: Layer[]
  newLayer: Layer | undefined
  updateLayerCallback: (layer: Layer) => void
}

export const CanvasStage = ({ existingLayers, newLayer, updateLayerCallback }: CanvasStageProps) => {
  const [imageAttrs, setImageAttrs] = useState({
    x: newLayer && newLayer.x ? newLayer.x : 0,
    y: newLayer && newLayer.y ? newLayer.y : 0,
    width: newLayer && newLayer.width ? newLayer.width : 100,
    height: newLayer && newLayer.height ? newLayer.height : 100,
    r: newLayer && newLayer.r ? newLayer.r : 0,
  })

  useEffect(() => {
    setImageAttrs({
      x: newLayer && newLayer.x ? newLayer.x : 0,
      y: newLayer && newLayer.y ? newLayer.y : 0,
      width: newLayer && newLayer.width ? newLayer.width : 100,
      height: newLayer && newLayer.height ? newLayer.height : 100,
      r: newLayer && newLayer.r ? newLayer.r : 0,
    })
  }, [newLayer])

  const [stage, setStage] = useState({
    stageScale: 1,
    stageX: 0,
    stageY: 0,
  })

  const handleWheel = (e: any) => {
    e.evt.preventDefault()

    const scaleBy = 1.02
    const stage = e.target.getStage()
    const oldScale = stage.scaleX()
    const mousePointTo = {
      x: stage.getPointerPosition().x / oldScale - stage.x() / oldScale,
      y: stage.getPointerPosition().y / oldScale - stage.y() / oldScale,
    }

    const newScale = e.evt.deltaY > 0 ? oldScale * scaleBy : oldScale / scaleBy

    setStage({
      stageScale: newScale,
      stageX: -(mousePointTo.x - stage.getPointerPosition().x / newScale) * newScale,
      stageY: -(mousePointTo.y - stage.getPointerPosition().y / newScale) * newScale,
    })
  }

  const handleDragStart = (e: any) => {
    const id = e.target.id()
  }

  const handleDragEnd = (e: any) => {
    const id = e.target.id()
  }

  return (
    <CanvasStageStyled>
      <Stage
        width={window.innerWidth}
        height={window.innerHeight}
        onWheel={handleWheel}
        scaleX={stage.stageScale}
        scaleY={stage.stageScale}
        x={stage.stageX}
        y={stage.stageY}
        draggable={true}
      >
        <KonvaLayer>
          {existingLayers.map((layer) => (
            <CanvasImage
              key={layer.layerId}
              url={layer.image.replace('ipfs://', 'https://cloudflare-ipfs.com/ipfs/')}
              imgProps={{
                x: layer.x,
                y: layer.y,
                r: layer.r,
                width: layer.width,
                height: layer.height,
              }}
              isSelected={false}
            />
          ))}
          {newLayer && (
            <CanvasImage
              url={newLayer.image.replace('ipfs://', 'https://cloudflare-ipfs.com/ipfs/')}
              imgProps={imageAttrs}
              isSelected={true}
              onChange={(newAttrs: any) => {
                setImageAttrs(newAttrs)
                updateLayerCallback({
                  ...newLayer,
                  x: newAttrs.x,
                  y: newAttrs.y,
                  r: newAttrs.r,
                  width: newAttrs.width,
                  height: newAttrs.height,
                })
              }}
            />
          )}
        </KonvaLayer>
      </Stage>
    </CanvasStageStyled>
  )
}
