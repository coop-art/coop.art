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

  // console.log('newLayer', newLayer)
  // console.log('existingLayers', existingLayers)

  useEffect(() => {
    setImageAttrs({
      x: newLayer && newLayer.x ? newLayer.x : 0,
      y: newLayer && newLayer.y ? newLayer.y : 0,
      width: newLayer && newLayer.width ? newLayer.width : 100,
      height: newLayer && newLayer.height ? newLayer.height : 100,
      r: newLayer && newLayer.r ? newLayer.r : 0,
    })
  }, [newLayer])

  return (
    <CanvasStageStyled>
      <Stage width={1240} height={920}>
        <KonvaLayer>
          {existingLayers.map((layer) => (
            <CanvasImage
              key={layer.layerId}
              url={layer.image.replace('ipfs://', 'https://ipfs.io/ipfs/')}
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
              url={newLayer.image.replace('ipfs://', 'https://ipfs.io/ipfs/')}
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
