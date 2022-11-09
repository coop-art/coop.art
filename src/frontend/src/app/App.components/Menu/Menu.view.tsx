import { truncate } from 'helpers/truncate'
import { useState } from 'react'
import { Link } from 'react-router-dom'

import { Button } from '../Button/Button.view'
import { MenuBar, MenuLogo, MenuStyled, MenuLeft, MenuLoading } from './Menu.style'

type MenuViewProps = {
  loading: boolean
  isConnected?: boolean
  connectCallback: () => void
  address?: string
  createNewCanvasCallback: () => void
}

export const MenuView = ({
  loading,
  isConnected,
  address,
  connectCallback,
  createNewCanvasCallback,
}: MenuViewProps) => {
  return (
    <MenuStyled>
      <MenuBar>
        <Link to="/">
          <MenuLogo alt="CoopArt" src="/logo.svg" />
        </Link>
        <div />
        <MenuLeft>
          <Link to="/">All Canvas</Link>
          {loading ? (
            <MenuLoading src="/images/loader.svg" />
          ) : (
            <div style={{ cursor: 'pointer' }} onClick={() => createNewCanvasCallback()}>
              New Canvas
            </div>
          )}

          {address ? (
            <div>{truncate(address)}</div>
          ) : (
            <Button appearance="primary" icon="tron" clickCallback={() => connectCallback()}>
              Connect TronLink
            </Button>
          )}
        </MenuLeft>
      </MenuBar>
    </MenuStyled>
  )
}
