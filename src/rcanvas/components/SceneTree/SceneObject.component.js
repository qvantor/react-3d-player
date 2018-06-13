import React, { Component } from 'react'
import { connect } from 'react-redux'
import Controls from '../Controls/Control.component'
import { calculateMainProps } from './Calculate'
import * as THREE from 'three'
import { setSelected } from 'reducers/controls/controls.actions'

class SceneObject extends Component {
  shouldComponentUpdate (nextProps) {
    // @todo update only if
    // if (nextProps.node.keyFramesStart < nextProps.time
    //   && nextProps.node.keyFramesEnd > nextProps.time) {
    //
    //   const { node: { keyFrames }, time } = nextProps
    //
    //   const { position, rotation } = calculateMainProps(keyFrames, time)
    //
    //   this.refs.this.root.position.x = position[0]
    //   this.refs.this.root.position.y = position[1]
    //   this.refs.this.root.position.z = position[2]
    //   this.refs.this.root.rotation.copy(
    //     new THREE.Euler(
    //       THREE.Math.degToRad(rotation[0]),
    //       THREE.Math.degToRad(rotation[1]),
    //       THREE.Math.degToRad(rotation[2])))
    // }
    // return nextProps.node.keyFramesStart < nextProps.time
    //   && nextProps.node.keyFramesEnd > nextProps.time

    // return nextProps.children !== this.props.children
    return true
  }

  render () {
    const { node: { Component, keyframes, start, end, id }, children, time, selected, play } = this.props
    if (!(start <= time && time <= end)) return null

    const { position, rotation } = calculateMainProps(keyframes, time)

    const component = (<Component
      onClick={e => {
        e.stopPropagation()
        setSelected(id)
      }}
      ref='this'
      name={id}
      position={position}
      rotation={rotation}>
      {children}
    </Component>)

    return play
      ? component
      : <group>
        {component}
        {selected === id && <group>
          <Controls append={this.refs.this} position={position} />{component}
        </group>}
      </group>

  }
}

const mapStateToProps = state => {
  return {
    time: state.timeline.time,
    play: state.timeline.play,
    selected: state.controls.selected
  }
}
export default connect(mapStateToProps)(SceneObject)
