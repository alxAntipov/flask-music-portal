import { PLAYER_NEW, TRACK_LIKE } from "../constants"

const initialState = {
  track: {},
  isPlay: false,
  currentTime: 0,
  duration: 0,
  volume: 100
}

export default (state = {}, action) => {
  switch (action.type) {
    case PLAYER_NEW:
      return { ...action.track }
    case TRACK_LIKE:
      return Object.assign({}, state, { isLike: action.track.isLike })
    default:
      return state
  }
}
