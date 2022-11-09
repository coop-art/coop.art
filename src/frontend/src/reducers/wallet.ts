import { CONNECT_WALLET, CREATE_NEW_CANVAS_START, CREATE_NEW_CANVAS_DONE } from 'app/App.components/Menu/Menu.actions'

export interface WalletState {
  isConnected: boolean
  address?: string
  tronLink?: any
  coopartContract?: any
  loading: boolean
  canvasId?: number
}

const walletDefaultState: WalletState = {
  isConnected: true,
  address: undefined,
  tronLink: undefined,
  coopartContract: undefined,
  loading: false,
  canvasId: undefined
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
        canvasId: action.canvasId
      }
    default:
      return state
  }
}
