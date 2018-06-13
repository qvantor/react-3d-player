import { store } from 'store/'
import * as constants from './controls.constants'

const { dispatch, getState } = store

export const setSelected = id => dispatch({ type: constants.CONTROLS_SELECTED_SETTED, payload: id })
