import { PLAYLIST_CLEAR, PLAYLIST_SET } from "../constants"

export default (state = [], { type, payload }) => {
  switch (type) {
    case PLAYLIST_SET:
      return [...payload]
    case PLAYLIST_CLEAR:
      return []
    default:
      return state
  }
}
