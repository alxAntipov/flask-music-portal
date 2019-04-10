import React, { Component } from "react"
import { connect } from "react-redux"
import { API_ROOT } from "../config"
import ProgressBar from "./ProgressBar"

import { likeTrack } from "../action/tracks"
import { newPlayer } from "../action/player"

class Player extends Component {
  state = {
    isPlay: false,
    currentTime: 0,
    duration: 0,
    volume: 100,
    prevVolume: 100,
    isMute: false,
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
    const nextSong = playlist[playlist.findIndex(x => x._id === track._id) + 1]
    if (nextSong) {
      dispatch(newPlayer(nextSong))
    }
  }
  prev = () => {
    const { dispatch, playlist, track } = this.props
    const prevSong = playlist[playlist.findIndex(x => x._id === track._id) - 1]
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
    const mute = Number(e.target.value) === 0 ? true : false
    this.setState({
      isMute: mute
    })
  }

  volumeOn = () => {
    this.setState({
      volume: this.state.prevVolume * 100
    })
    this.audio.volume = this.state.prevVolume
    this.setState({
      isMute: false
    })
  }

  volumeOff = () => {
    this.setState({
      volume: 0,
      prevVolume: this.audio.volume
    })
    this.audio.volume = 0
    this.setState({
      isMute: true
    })
  }

  like = id => {
    const { dispatch, track } = this.props
    const data = {
      songId: track._id,
      artist: track.artist,
      name: track.name,
      duration: track.duration,
      isLike: !track.isLike
    }
    dispatch(likeTrack(data))
  }

  componentWillReceiveProps(nextProps) {
    this.audio.pause()
    this.audio.currentTime = 0
    this.audio = new Audio(`${API_ROOT}/track/${nextProps.track._id}`)
    this.audio.volume = this.state.volume / 100
    this.play()
    this.audio.addEventListener("timeupdate", this.updateTime)
  }

  componentWillUnmount() {
    this.audio.removeEventListener("timeupdate", this.updateTime)
    this.audio.pause()
    this.audio.currentTime = 0
  }
  render() {
    const { isPlay, currentTime, duration, isMute } = this.state
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
        <div className="player__content">
          <div className="player__controls">
            <button className="player__btn player__prev" onClick={this.prev} />
            {isPlay ? (
              <button
                className="player__btn player__pause"
                onClick={this.pause}
              />
            ) : (
              <button
                className="player__btn player__play"
                onClick={this.play}
              />
            )}
            <button className="player__btn player__next" onClick={this.next} />
            <div className="player__trackname">
              <p className="player__trackname--bold">{track.artist}</p>
              <p>{track.name}</p>
            </div>
            <div onClick={() => this.like(track._id)} className="player__like">
              <div className={track.isLike ? "heart heart--active" : "heart"} />
            </div>
          </div>

          <div className="player__volume-control">
            {isMute ? (
              <button
                className="player__btn player__volume-off"
                onClick={this.volumeOn}
              />
            ) : (
              <button
                className="player__btn player__volume-on"
                onClick={this.volumeOff}
              />
            )}
            <input
              className="player__volume-bar"
              type="range"
              min="0"
              max="100"
              value={this.state.volume}
              onChange={this.changeVolume}
            />
          </div>
        </div>
      </div>
    )
  }
}
const mapStateToProps = state => ({
  track: state.player,
  playlist: state.playlist.tracks
})

export default connect(mapStateToProps)(Player)
