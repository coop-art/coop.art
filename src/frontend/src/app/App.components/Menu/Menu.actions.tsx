import { getTronLink } from 'helpers/tronLink'
import { showToaster } from '../Toaster/Toaster.actions'

export const CONNECT_WALLET = 'CONNECT_WALLET'

declare var window: any

export const connectWallet = () => async (dispatch: any) => {
  try {
    const address = window.tronWeb.defaultAddress.base58
    console.log(address)

    const tronLink = await getTronLink()
    const res: any = await tronLink?.request({ method: 'tron_requestAccounts' })
    console.log(res)

    dispatch({
      type: CONNECT_WALLET,
      isConnected: true,
      address,
      tronLink,
    })
  } catch (e: any) {
    console.log(e)
    dispatch(showToaster('error', e.message, e.message))
  }
}
