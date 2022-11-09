import { Group, Image, Stage, Layer, Circle, Text } from 'react-konva'
import useImage from 'use-image'
import { truncate } from 'helpers/truncate'
import { useState } from 'react'

const DImage = ({ url }: { url?: string }) => {
  const [image] = useImage(url || '/images/freemap.png')
  return <Image image={image} />
}

interface CanvasViewProps {
  address?: string
}

export const CanvasView = ({ address }: CanvasViewProps) => {
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
    <div>
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
        <Layer></Layer>
      </Stage>
    </div>
  )
}
