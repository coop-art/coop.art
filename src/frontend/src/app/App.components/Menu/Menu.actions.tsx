import { getTronLink } from 'helpers/tronLink'
import { State } from 'reducers'
import { showToaster } from '../Toaster/Toaster.actions'
import abi from '../../../helpers/Coopart.json'

export const CONNECT_WALLET = 'CONNECT_WALLET'
export const CREATE_NEW_CANVAS_START = 'CREATE_NEW_CANVAS_START'
export const CREATE_NEW_CANVAS_DONE = 'CREATE_NEW_CANVAS_DONE'

declare var window: any

export const connectWallet = () => async (dispatch: any) => {
  try {
    const address = window.tronWeb.defaultAddress.base58
    console.log(address)

    const tronLink = await getTronLink()
    await tronLink?.request({ method: 'tron_requestAccounts' })
    const coopartContract = tronLink?.tronWeb.contract(abi.abi, 'TQh3T2GJ7VY9qvFH5VVDUxq8kGu51ge7Bo')

    dispatch({
      type: CONNECT_WALLET,
      isConnected: true,
      address,
      tronLink,
      coopartContract,
    })
  } catch (e: any) {
    console.log(e)
    dispatch(showToaster('error', e.message, e.message))
  }
}

export const createNewCanvas = () => async (dispatch: any, getState: any) => {
  const state: State = getState()
  if (!state.wallet.address) {
    dispatch(connectWallet())
  } else {
    try {
      dispatch({
        type: CREATE_NEW_CANVAS_START,
      })

      const tx = await state.wallet?.coopartContract.mintCanvas(state.wallet.address!, '', '', 1, false).send({
        callValue: 0,
        shouldPollResponse: true,
      })
      console.log(tx.toNumber())
      // const res = await tx.wait()
      // console.log(res)

      dispatch({
        type: CREATE_NEW_CANVAS_DONE,
        canvasId: tx.toNumber(),
      })
    } catch (e: any) {
      console.log(e)
      dispatch(showToaster('error', e.message, e.message))
    }
  }
}
