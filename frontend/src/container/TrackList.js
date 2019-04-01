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
  componentDidMount() {
    const { dispatch, history } = this.props
    const playlistName =
      history.location.pathname === "/"
        ? "all"
        : history.location.pathname.substring(1)
    dispatch(getTracks(playlistName))
  }

  componentWillUnmount() {
    this.props.dispatch(clearPage())
  }

  render() {
    const { tracks } = this.props.pagePlaylist
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
  pagePlaylist: state.pageTracks,
  currentPlaylist: state.playlist.name
})

export default connect(mapStateToProps)(TrackList)
