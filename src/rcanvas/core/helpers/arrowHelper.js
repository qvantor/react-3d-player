import React from 'react'
import Component from '../objects/component'
import * as THREE from 'three'

export default class arrowHelper extends Component {
  constructor (prop) {
    super(prop)
    const { dir, origin, length, hex, headLength, headWidth, depth } = prop
    this.root = new THREE.ArrowHelper(dir, origin, length, hex, headLength, headWidth)

    if (depth) {
      this.root.children.forEach(item => {
        item.material.depthWrite = false
        item.material.depthTest = false
        item.material.transparent = true
      })
    }
  }
}