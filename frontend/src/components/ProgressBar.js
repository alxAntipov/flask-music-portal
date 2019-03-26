import React, { Component } from "react"
import { getTime } from "../utils"

class ProgressBar extends Component {
  seekUpdate = e => {
    const { duration, changeTime } = this.props
    changeTime((e.pageX / this.node.offsetWidth) * duration)
  }

  mouseUp = e => {
    const { moveTime, duration, changeEnd } = this.props
    window.removeEventListener("mousemove", this.seekUpdate)
    window.removeEventListener("mouseup", this.mouseUp)
    moveTime((e.pageX / this.node.offsetWidth) * duration)
    changeEnd()
  }

  mouseDown = e => {
    window.addEventListener("mousemove", this.seekUpdate)
    window.addEventListener("mouseup", this.mouseUp)
    this.props.changeStart()
  }

  render() {
    const { duration, currentTime, moveTime } = this.props

    return (
      <div
        className="progress-bar"
        ref={node => {
          this.node = node
        }}
        onMouseDown={this.mouseDown}
        onClick={e => moveTime((e.pageX / this.node.offsetWidth) * duration)}
      >
        <div className="progress-bar__time">
          <p className="progress-bar__currentTime">{getTime(currentTime)}</p>
          <p className="progress-bar__duration">{getTime(duration)}</p>
        </div>
        <div
          className="progress-bar--active"
          style={{ width: `${(currentTime / duration) * 100}%` }}
        />
      </div>
    )
  }
}

export default ProgressBar
