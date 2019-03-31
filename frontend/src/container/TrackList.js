import React, { Component } from "react"
import { connect } from "react-redux"

import Track from "../components/Track"
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
              <Track
                key={id}
                number={id}
                track={track}
                playHandle={this.setNewTrack}
              />
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
