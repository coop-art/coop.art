import { State } from 'reducers'

export const SET_CHARACTER = 'SET_CHARACTER'
export const SET_WEBSOCKET = 'SET_WEBSOCKET'
export const CHANGE_MAP = 'CHANGE_MAP'

export const mintCanvas = (file: File) => async (dispatch: any, getState: any) => {
  const state: State = getState()
  // Mint canvas
}
