import React, { Component } from 'react'
import { connect } from 'react-redux'

class Line extends Component {
  static propTypes = {}

  render () {
    const { height, scale, time } = this.props
    const x = scale(time)
    return (
      <line
        className='line-time'
        x1={x}
        x2={x}
        y1={0}
        y2={height} />
    )
  }
}

const mapStateToProps = state => {
  return {
    time: state.timeline.time
  }
}
export default connect(mapStateToProps)(Line)