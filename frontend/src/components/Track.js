import React, { Component } from "react"
import { getTime } from "../utils/time"

class Track extends Component {
  render() {
    const { track, playHandle, number } = this.props
    return (
      <li className="track" onClick={() => playHandle(track)}>
        <div className="track__number">{number + 1}</div>
        <div className="track__artist">{track.artist}</div>
        <div className="track__end-column">
          <div className="track__name">{track.name}</div>
          <div className="track__duration">{getTime(track.duration)}</div>
        </div>
      </li>
    )
  }
}

export default Track
