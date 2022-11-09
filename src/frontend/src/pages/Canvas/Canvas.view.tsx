import { Button } from 'app/App.components/Button/Button.view'
import dayjs from 'dayjs'
import { create } from 'ipfs-http-client'
import { useEffect, useState } from 'react'
import { Buffer } from 'buffer'

import { CanvasStage } from './Canvas.stage'
import { Vote } from './Canvas.controller'
// prettier-ignore
import { CanvasLoading, CanvasLeftMenu, CanvasStyled, CanvasRightMenu, SimpleButton, LayerVoting } from "./Canvas.style";

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
  mintCallback: (mintProps: any) => Promise<any>
  voteCallback: (voteProps: Vote) => Promise<any>
  address?: string
  existingLayers: Layer[]
  urlCanvasId?: string
}

export type Layer = {
  layerId: number
  canvasId: string
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
  mintCallback,
  voteCallback,
  address,
  existingLayers,
  urlCanvasId,
}: CanvasViewProps) => {
  const [newLayer, setNewLayer] = useState<Layer | undefined>()
  const [isUploading, setIsUploading] = useState(false)
  const [isMinting, setIsMinting] = useState(false)
  const [canvasId, setCanvasId] = useState(urlCanvasId)

  useEffect(() => {
    if (!urlCanvasId) setCanvasId((Math.random() + 1).toString(36).substring(7))
  }, [urlCanvasId])

  async function handleVote(layerId: number, up: boolean) {
    voteCallback({ layerId, up })
  }

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
            canvasId: canvasId as string,
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
        canvasId: canvasId as string,
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
      mintCallback({ tokenUri, canvasId: canvasId as string })

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
        {isUploading ? (
          <SimpleButton>Uploading...</SimpleButton>
        ) : (
          <div>
            <label htmlFor="uploader">
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
        )}

        {newLayer ? (
          <Button icon="price" loading={isMinting} clickCallback={() => handleMint(newLayer)}>
            Mint layer
          </Button>
        ) : (
          <Button icon="price" loading clickCallback={() => {}}>
            Mint layer
          </Button>
        )}

        <div>
          {loadingLayers && (
            <CanvasLoading>
              <svg>
                <use xlinkHref="/icons/sprites.svg#loading" />
              </svg>
              <div>Loading existing layers...</div>
            </CanvasLoading>
          )}
        </div>
      </CanvasLeftMenu>

      <CanvasRightMenu>
        {existingLayers.map((layer: Layer) => (
          <LayerVoting>
            <img alt="layer" src={layer.image} />
            <div>Layer ID {layer.layerId}</div>
            <img alt="check" src="/icons/check.svg" onClick={() => handleVote(layer.layerId, true)} />
            <img alt="cross" src="/icons/cross.svg" onClick={() => handleVote(layer.layerId, false)} />
          </LayerVoting>
        ))}
      </CanvasRightMenu>
    </CanvasStyled>
  )
}
