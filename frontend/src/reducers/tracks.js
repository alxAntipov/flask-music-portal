import { TRACKS_ERROR, TRACKS_SUCCESS } from "../constants"

export default (state = [], action) => {
  switch (action.type) {
    case TRACKS_SUCCESS:
      return [...action.tracks]
    default:
      return state
  }
}
