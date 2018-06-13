import group from './objects/group'
import mesh from './objects/mesh'
import gridHelper from './helpers/gridHelper'
import boxBuffer from './geometry/boxBuffer'
import planeBuffer from './geometry/planeBuffer'
import circleBuffer from './geometry/circleBuffer'
import line from './geometry/line'
import perspectiveCamera from './cameras/perspectiveCamera'
import scene from './objects/scene'
import arrowHelper from './helpers/arrowHelper'
import transformControls from './controls/transform'

export default (type, props, context) => {
  const types = {
    group, mesh, boxBuffer, gridHelper, planeBuffer, transformControls,
    circleBuffer, line, perspectiveCamera, scene, arrowHelper
  }
  const instance = new types[type](props, context)
  instance.setPosition()
  instance.setEvents()
  return instance
}