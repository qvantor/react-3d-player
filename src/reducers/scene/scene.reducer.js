import * as constants from './scene.constants'
import Immutable from 'seamless-immutable'
import Model from './scene.model'

const findNremove = (state, id) => {
  for (let item of state) {
    if (item.id === id) {
      return { state: state.filter(item => item.id !== id), model: item }
    }
    if (item.children) {
      const finded = findNremove(item.children, id)
      if (finded) return {
        state: state.update(state.indexOf(item), item => item.merge({ children: finded.state })),
        model: finded.model
      }
    }
  }
}

const recursivePush = (state, id, model) => {
  for (let item of state) {
    if (item.id === id) {
      return state.update(state.indexOf(item), item => item.merge({ children: [...item.children, model] }))
    } else if (item.children) {
      const newState = recursivePush(item.children, id, model)
      if (newState) return state.update(state.indexOf(item), item => item.merge({ children: newState }))
    }
  }
}

const recursiveReplace = (oldState, child, parent) => {
  const { model, state } = findNremove(oldState, child)
  return recursivePush(state, parent, model)
}

const recursiveSetProp = merge => (state, id, prop) => {
  for (let item of state) {
    if (item.id === id) {
      return state.update(state.indexOf(item), merge ? merge : item => item.merge(prop))
    } else if (item.children) {
      const newState = recursiveSetProp(merge)(item.children, id, prop)
      if (newState) return state.update(state.indexOf(item), item => item.merge({ children: newState }))
    }
  }
}

export default function scene (state = Model, { type, payload }) {
  switch (type) {
    case constants.SCENE_MODEL_ADDED:
      return Immutable([...state, payload])

    case constants.SCENE_MODEL_REPLACED:
      return recursiveReplace(state, payload.child, payload.parent)

    case constants.SCENE_MODEL_REMOVED:
      return findNremove(state, payload).state

    case constants.SCENE_MODEL_ADDED_PROP:
      return recursiveSetProp()(state, payload.id, payload.prop)

    case constants.SCENE_KEYFRAME_CHANGED:
      return recursiveSetProp(item => item.merge({
        keyframes: item.keyframes
          .update(
            item.keyframes.findIndex(keyframe => keyframe.id === payload.keyId),
            keyframe => keyframe.merge(payload.data))
          .asMutable()
          .sort((k1, k2) => k1.time > k2.time)
      }))(state, payload.id)

    default:
      return state
  }
}
