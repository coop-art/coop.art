import { CONNECT_WALLET, CREATE_NEW_CANVAS_START, CREATE_NEW_CANVAS_DONE } from 'app/App.components/Menu/Menu.actions'

export interface WalletState {
  isConnected: boolean
  address?: string
  tronLink?: any
  coopartContract?: any
  loading: boolean
}

const walletDefaultState: WalletState = {
  isConnected: true,
  address: undefined,
  tronLink: undefined,
  coopartContract: undefined,
  loading: false,
}

export function wallet(state = walletDefaultState, action: any): WalletState {
  switch (action.type) {
    case CONNECT_WALLET:
      return {
        ...state,
        isConnected: true,
        address: action.address,
        tronLink: action.tronLink,
        coopartContract: action.coopartContract,
      }
    case CREATE_NEW_CANVAS_START:
      return {
        ...state,
        loading: true,
      }
    case CREATE_NEW_CANVAS_DONE:
      return {
        ...state,
        loading: false,
      }
    default:
      return state
  }
}
