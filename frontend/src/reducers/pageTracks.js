import { TRACK_LIKE, TRACKS_SUCCESS } from "../constants"

export default (state = {}, action) => {
  switch (action.type) {
    case TRACKS_SUCCESS:
      return { ...action.payload }
    case TRACK_LIKE:
      return {
        name: state.name,
        tracks: state.tracks.map(track => {
          if (track._id === action.track.songId) {
            return Object.assign({}, track, { isLike: action.track.isLike })
          }
          return track
        })
      }
    default:
      return state
  }
}
