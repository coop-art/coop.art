import { Button } from 'app/App.components/Button/Button.view'
import dayjs from 'dayjs'
import { create } from 'ipfs-http-client'
import { useEffect, useState } from 'react'
import { Buffer } from 'buffer'

import { CanvasStage } from './Canvas.stage'
// prettier-ignore
import { CanvasLeftMenu, CanvasStyled, CanvasRightMenu, CanvasLayers, CanvasLayer, CanvasLayerDetails, CanvasLayerVotes, CanvasLayerCheckbox, SimpleButton } from "./Canvas.style";

const projectId = process.env.REACT_APP_INFURA_API_ID
const projectSecret = process.env.REACT_APP_INFURA_API_SECRET
const auth = 'Basic ' + Buffer.from(projectId + ':' + projectSecret).toString('base64')
const client = create({
  host: 'ipfs.infura.io',
  port: 5001,
  protocol: 'https',
  headers: {
    authorization: auth,
  },
})
// const client = new NFTStorage({
//   token:  process.env.REACT_APP_NFT_STORAGE_KEY,
// })

type CanvasViewProps = {
  loadingLayers: boolean
  addLayerCallback: ({
    canvasId,
    imageUri,
    author,
    x,
    y,
    r,
    width,
    height,
  }: {
    canvasId: number
    imageUri: string
    author: string
    x: number
    y: number
    r: number
    width: number
    height: number
  }) => Promise<any>
  upVoteCallback: (layerId: number) => Promise<any>
  downVoteCallback: (layerId: number) => Promise<any>
  address?: string
  existingLayers: Layer[]
  canvasId?: number
}

export type Layer = {
  layerId: number
  canvasId: number
  x: number
  y: number
  r: number
  image: string
  deadline: string
  width: number
  height: number
}

export const CanvasView = ({
  loadingLayers,
  addLayerCallback,
  upVoteCallback,
  downVoteCallback,
  address,
  existingLayers,
  canvasId,
}: CanvasViewProps) => {
  const [newLayer, setNewLayer] = useState<Layer | undefined>()
  const [isUploading, setIsUploading] = useState(false)
  const [isMinting, setIsMinting] = useState(false)
  const [selectedLayer, setSelectedLayer] = useState<Layer | undefined>()

  async function handleUpload(file: File) {
    const layerId = Math.floor(Math.random() * 1000000) //TODO: Implement better layerId
    const deadline = dayjs().add(7, 'days').format()

    try {
      setIsUploading(true)

      // Upload to IPFS
      const uploadedImage = await client.add(file)

      // Get image size
      var reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = function (e) {
        var image = new Image()
        //@ts-ignore
        image.src = e.target.result
        image.onload = function () {
          //@ts-ignore
          console.log('onload', this.width, this.height)
          setNewLayer({
            layerId,
            canvasId: canvasId!,
            x: 0,
            y: 0,
            r: 0,
            image: `ipfs://${uploadedImage.path}`,
            deadline,
            //@ts-ignore
            width: this.width,
            //@ts-ignore
            height: this.height,
          })

          setIsUploading(false)
        }
      }
    } catch (error: any) {
      console.error(error)
      setIsUploading(false)
    }
  }

  async function handleMint(layer: Layer) {
    try {
      setIsMinting(true)

      // Upload to IPFS

      const json = {
        name: 'Coopart Layer',
        description: 'Coopart Layer',
        image: layer.image,
        layerId: layer.layerId,
        canvasId,
        x: layer.x, // TODO: Store doubles
        y: layer.y,
        r: layer.r,
        width: layer.width,
        height: layer.height,
        deadline: layer.deadline,
      }

      console.log('layer', layer)

      const uploadedJson = await client.add(Buffer.from(JSON.stringify(json)))

      const tokenUri = `ipfs://${uploadedJson.path}`

      console.log('tokenUri', tokenUri)

      // Mint token
      addLayerCallback({
        canvasId: canvasId!,
        imageUri: layer.image,
        author: address!,
        x: layer.x,
        y: layer.x,
        r: layer.r,
        width: layer.width,
        height: layer.height,
      })

      setIsMinting(false)
    } catch (error: any) {
      console.error(error)
      setIsMinting(false)
    }
  }

  const updateLayerCallback = (layer: Layer) => {
    setNewLayer(layer)
  }

  return (
    <CanvasStyled>
      <CanvasStage existingLayers={existingLayers} newLayer={newLayer} updateLayerCallback={updateLayerCallback} />

      <CanvasLeftMenu>
        <div>
          <label htmlFor="uploader">
            {/* <Button icon="upload" loading={isUploading}>
              New Layer
            </Button> */}
            <SimpleButton>New Layer</SimpleButton>
          </label>
          <input
            hidden
            id="uploader"
            type="file"
            accept="image/*"
            onChange={(e: any) => {
              e.target && e.target.files && e.target.files[0] && handleUpload(e.target.files[0])
            }}
          />
        </div>

        <Button icon="merge" loading={isMinting} clickCallback={() => {}}>
          Merge Canvas
        </Button>

        <CanvasLayers>
          <CanvasLayer>
            <img src="" alt="layer" />
            <div>
              <CanvasLayerDetails>
                <div>
                  <div className="title">Layer 15</div>
                  <div className="subTitle">Score: 21</div>
                </div>
                <CanvasLayerCheckbox>
                  <label className="container">
                    <input type="checkbox" />
                    <span className="checkmark"></span>
                  </label>
                </CanvasLayerCheckbox>
              </CanvasLayerDetails>
              <CanvasLayerVotes upVotes={3} downVotes={4}>
                <div />
              </CanvasLayerVotes>
            </div>
          </CanvasLayer>
        </CanvasLayers>
      </CanvasLeftMenu>

      <CanvasRightMenu>
        {selectedLayer && (
          <div>
            <img alt="layer" src={selectedLayer.image} />
            <div>Layer ID {selectedLayer.layerId}</div>
            <img alt="up" src="/icons/up.svg" onClick={() => upVoteCallback(selectedLayer.layerId)} />
            <img alt="down" src="/icons/down.svg" onClick={() => downVoteCallback(selectedLayer.layerId)} />
          </div>
        )}
      </CanvasRightMenu>
    </CanvasStyled>
  )
}
