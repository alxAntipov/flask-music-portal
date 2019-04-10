import React, { Component } from "react"
import { connect } from "react-redux"

export class PlayerContainer extends Component {
  render() {
    return <div />
  }
}

const mapStateToProps = state => ({
  playlist: state.playlist,
  track: state.player.track._id,
  isPlay: state.player.isPlay,
  currentTime: state.player.currentTime,
  duration: state.player.duration,
  volume: state.player.volume
})

const mapDispatchToProps = {}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PlayerContainer)
