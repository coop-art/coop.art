import { combineReducers } from 'redux'

import { loading, LoadingState } from './loading'
import { progressBar, ProgressBarState } from './progressBar'
import { toaster, ToasterState } from './toaster'
import { wallet, WalletState } from './wallet'

export const reducers = combineReducers({
  loading,
  wallet,
  progressBar,
  toaster,
})

export interface State {
  loading: LoadingState
  wallet: WalletState
  progressBar: ProgressBarState
  toaster: ToasterState
}
