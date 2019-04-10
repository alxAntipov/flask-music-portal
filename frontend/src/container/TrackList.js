import React, { Component } from "react"
import { connect } from "react-redux"

import Track from "../components/Track"
import { getTracks, clearPage } from "../action/tracks"
import { newPlayer } from "../action/player"
import { setPlaylist } from "../action/playlist"

class TrackList extends Component {
  setNewTrack = id => {
    const { dispatch, currentPlaylist, pagePlaylist } = this.props
    dispatch(newPlayer(id))
    if (pagePlaylist.name !== currentPlaylist) {
      dispatch(setPlaylist(pagePlaylist))
    }
  }

  getTracks = () => {
    const { dispatch, playlistName } = this.props
    dispatch(getTracks(playlistName))
  }

  componentDidMount() {
    this.getTracks()
  }

  componentDidUpdate(prevProps) {
    if (this.props.playlistName !== prevProps.playlistName) {
      this.getTracks()
    }
  }

  componentWillUnmount() {
    this.props.dispatch(clearPage())
  }

  render() {
    const { tracks } = this.props.pagePlaylist
    return (
      <>
        <h2>{this.props.header}</h2>
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
      </>
    )
  }
}

const mapStateToProps = state => ({
  pagePlaylist: state.pageTracks,
  currentPlaylist: state.playlist.name
})

export default connect(mapStateToProps)(TrackList)
