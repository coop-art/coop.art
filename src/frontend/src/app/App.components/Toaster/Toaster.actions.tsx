import { State } from 'reducers'
import { ToasterStatus } from './Toaster.constants'

export const SHOW_TOASTER = 'SHOW_TOASTER'
export const HIDE_TOASTER = 'HIDE_TOASTER'

export const showToaster = (status: ToasterStatus, title: string, message: string) => (dispatch: any, getState: any) => {
  const state: State = getState()
  if (!state.toaster.showing) {
    dispatch({
      type: SHOW_TOASTER,
      status,
      title,
      message,
    })
    setTimeout(() => {
      dispatch(hideToaster())
    }, 4000)
  }
}

export const hideToaster = () => (dispatch: any) => {
  dispatch({
    type: HIDE_TOASTER,
  })
}
