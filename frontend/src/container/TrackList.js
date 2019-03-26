import React, { Component } from "react"
import { connect } from "react-redux"

import { getTracks } from "../action/tracks"
import { newPlayer } from "../action/player"
import { setPlaylist } from "../action/playlist"

class TrackList extends Component {
  setNewTrack = id => {
    const { dispatch, tracks } = this.props
    dispatch(newPlayer(id))
    dispatch(setPlaylist(tracks))
  }
  componentDidMount() {
    const { dispatch } = this.props
    dispatch(getTracks())
  }

  render() {
    const { tracks } = this.props
    return (
      <div className="track-list">
        {tracks
          ? tracks.map((track, id) => (
              <li
                className="track"
                key={id}
                onClick={() => this.setNewTrack(track)}
              >
                {track.path} 03:23
              </li>
            ))
          : null}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  tracks: state.tracks
})

export default connect(mapStateToProps)(TrackList)
