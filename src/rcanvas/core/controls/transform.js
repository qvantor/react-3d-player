import React from 'react'
import TransformControls from 'rcanvas/modules/transformControls'
import Component from '../objects/component'
import * as THREE from 'three'

class transformControls extends Component {
  constructor (prop, context) {
    super(prop, context)
    console.log(prop)
    this.root = new THREE.Group()
    this.control = new TransformControls(context.camera, context.canvas)
    this.control.attach(prop.attach.root)
    this.root.add(this.control)
    this.control.addEventListener('changePointEvent', e => console.log(e.target.position))
    this.animate()
  }

  animate = () => {
    requestAnimationFrame(this.animate)
    this.control.update()
  }
}

export default transformControls