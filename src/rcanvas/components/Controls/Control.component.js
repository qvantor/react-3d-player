import React, { Component } from 'react'
import * as THREE from 'three'
import { connect } from 'react-redux'

import Translate from './Translate'

class Controls extends Component {

  render () {
    const { position } = this.props
    return (
      <group position={position}>
        <Translate />
      </group>)
  }
}

const mapStateToProps = state => {
  return {}
}
export default connect(mapStateToProps)(Controls)
