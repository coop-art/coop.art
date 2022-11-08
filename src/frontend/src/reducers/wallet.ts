import { CONNECT_WALLET } from 'app/App.components/Menu/Menu.actions'

export interface WalletState {
  isConnected: boolean
  address?: string
  tronLink?: any
}

const walletDefaultState: WalletState = {
  isConnected: true,
  address: undefined,
  tronLink: undefined,
}

export function wallet(state = walletDefaultState, action: any): WalletState {
  switch (action.type) {
    case CONNECT_WALLET:
      return {
        isConnected: true,
        address: action.address,
        tronLink: action.tronLink,
      }
    default:
      return state
  }
}
