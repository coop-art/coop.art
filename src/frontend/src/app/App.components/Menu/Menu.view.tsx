import { truncate } from 'helpers/truncate'
import { useState } from 'react'
import { Link } from 'react-router-dom'

import { Button } from '../Button/Button.view'
import { MenuBar, MenuLogo, MenuStyled } from './Menu.style'

type MenuViewProps = {
  showing: boolean
  setShowing: (status: boolean) => void
  isConnected?: boolean
  connectCallback: () => void
  address?: string
}

export const MenuView = ({ showing, setShowing, isConnected, address, connectCallback }: MenuViewProps) => {
  return (
    <MenuStyled>
      <MenuBar showing={showing}>
        <Link to="/" onClick={() => setShowing(false)}>
          <MenuLogo alt="CoopArt" src="/logo.svg" />
        </Link>
        {address ? (
          <div>{truncate(address)}</div>
        ) : (
          <Button appearance="primary" icon="tron" clickCallback={() => connectCallback()}>
            Connect TronLink
          </Button>
        )}
      </MenuBar>
    </MenuStyled>
  )
}
