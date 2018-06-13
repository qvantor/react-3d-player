import React, { Component } from 'react'
import PropTypes from 'prop-types'
import * as THREE from 'three'

class Translate extends Component {
  state = { drag: false }

  onMouseDown (e) {
    console.log(e)
  }

  render () {
    const { drag } = this.state
    const {} = this.props

    const origin = new THREE.Vector3(0, 0, 0)
    const length = 1

    const arrows = [{
      dir: new THREE.Vector3(1, 0, 0),
      hex: new THREE.Color(0xff0000),
    }, {
      dir: new THREE.Vector3(0, 1, 0),
      hex: new THREE.Color(0x00ff00)
    }, {
      dir: new THREE.Vector3(0, 0, 1),
      hex: new THREE.Color(0x0000ff)
    }]

    return (
      <group>
        {arrows.map((item, i) => <arrowHelper
          key={i}
          onMouseDown={this.onMouseDown}
          hex={item.hex}
          dir={item.dir}
          origin={origin}
          length={length}
          headWidth={length * 0.2}
          depth />)}
      </group>
    )
  }
}

export default Translate