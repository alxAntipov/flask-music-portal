import React, { Component } from "react"
import { connect } from "react-redux"
import { API_ROOT } from "../config"
import ProgressBar from "./ProgressBar"

import { newPlayer } from "../action/player"

class Player extends Component {
  state = {
    isPlay: false,
    currentTime: 0,
    duration: 0,
    volume: 100,
    isDragged: false
  }
  audio = new Audio()

  play = () => {
    if (this.audio.src) {
      this.audio.play()
      this.setState({ isPlay: true })
    }
  }

  pause = () => {
    this.setState({ isPlay: false })
    this.audio.pause()
  }

  move = time => {
    this.setState({
      currentTime: time
    })
    this.audio.currentTime = time
  }
  next = () => {
    const { dispatch, playlist, track } = this.props
    const nextSong = playlist[playlist.findIndex(x => x._id === track) + 1]
    if (nextSong) {
      dispatch(newPlayer(nextSong))
    }
  }
  prev = () => {
    const { dispatch, playlist, track } = this.props
    const prevSong = playlist[playlist.findIndex(x => x._id === track) - 1]
    if (prevSong) {
      dispatch(newPlayer(prevSong))
    }
  }

  updateTime = e => {
    const { isDragged } = this.state
    if (e.target.currentTime !== e.target.duration) {
      if (!isDragged) {
        this.setState({
          currentTime: e.target.currentTime,
          duration: e.target.duration
        })
      }
    } else {
      this.next()
    }
  }
  changeVolume = e => {
    this.setState({
      volume: e.target.value
    })
    this.audio.volume = e.target.value / 100
  }
  componentWillReceiveProps(nextProps) {
    this.audio.pause()
    this.audio.currentTime = 0
    this.audio = new Audio(`${API_ROOT}/track/${nextProps.track._id}`)
    this.play()
    this.audio.addEventListener("timeupdate", this.updateTime)
  }

  componentWillUnmount() {
    this.audio.removeEventListener("timeupdate", this.updateTime)
    this.audio.pause()
    this.audio.currentTime = 0
  }
  render() {
    const { isPlay, currentTime, duration } = this.state
    const { track } = this.props
    return (
      <div className="player">
        <ProgressBar
          changeStart={() => this.setState({ isDragged: true })}
          changeTime={time => this.setState({ currentTime: time })}
          moveTime={time => this.move(time)}
          changeEnd={() => this.setState({ isDragged: false })}
          duration={duration}
          currentTime={currentTime}
        />
        <div className="player-content">
          <button className="player__btn player__prev" onClick={this.prev} />
          {isPlay ? (
            <button
              className="player__btn player__pause"
              onClick={this.pause}
            />
          ) : (
            <button className="player__btn player__play" onClick={this.play} />
          )}
          <button className="player__btn player__next" onClick={this.next} />
          <p className="">{track.path}</p>
          <div class="wrap">
            <input
              type="range"
              min="0"
              max="100"
              value={this.state.volume}
              onChange={this.changeVolume}
              class="range"
            />
          </div>
        </div>
      </div>
    )
  }
}
const mapStateToProps = state => ({
  track: state.player,
  playlist: state.playlist
})

export default connect(mapStateToProps)(Player)
