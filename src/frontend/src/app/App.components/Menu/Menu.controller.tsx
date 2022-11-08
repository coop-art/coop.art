import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { State } from 'reducers'
import { connectWallet } from './Menu.actions'
import { MenuView } from './Menu.view'

export const Menu = () => {
  const [showing, setShowing] = useState(false)
  const { isConnected, address } = useSelector((state: State) => state.wallet)
  const dispatch = useDispatch()

  const connectCallback = () => {
    //@ts-ignore
    dispatch(connectWallet())
  }

  return (
    <MenuView
      showing={showing}
      setShowing={setShowing}
      isConnected={isConnected}
      address={address}
      connectCallback={connectCallback}
    />
  )
}
