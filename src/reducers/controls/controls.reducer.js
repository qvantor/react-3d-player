import * as constants from './controls.constants'
import Model from './controls.model'

export default function controls (state = Model, { type, payload }) {
  switch (type) {
    case constants.CONTROLS_SELECTED_SETTED:
      return state.merge({ selected: payload })
    default:
      return state
  }
}
