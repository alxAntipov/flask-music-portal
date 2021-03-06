import { PLAYLIST_CLEAR, PLAYLIST_SET, TRACK_LIKE } from "../constants"

export default (state = {}, action) => {
  switch (action.type) {
    case PLAYLIST_SET:
      return { ...action.payload }
    case PLAYLIST_CLEAR:
      return {}
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
