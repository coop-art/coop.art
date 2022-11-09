import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { State } from 'reducers'
import { connectWallet, createNewCanvas } from './Menu.actions'
import { MenuView } from './Menu.view'
import { useNavigate } from 'react-router-dom'

export const Menu = () => {
  const navigate = useNavigate()
  const { isConnected, address, loading, canvasId } = useSelector((state: State) => state.wallet)
  const dispatch = useDispatch()

  const connectCallback = () => {
    //@ts-ignore
    dispatch(connectWallet())
  }

  const createNewCanvasCallback = () => {
    //@ts-ignore
    dispatch(createNewCanvas())
  }

  useEffect(() => {
    console.log('Menu', canvasId)
    if (canvasId) navigate(`/edit/${canvasId}`)
  }, [canvasId, navigate])

  return (
    <MenuView
      loading={loading}
      isConnected={isConnected}
      address={address}
      connectCallback={connectCallback}
      createNewCanvasCallback={createNewCanvasCallback}
    />
  )
}
