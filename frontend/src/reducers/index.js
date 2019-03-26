import { combineReducers } from "redux"
import tracks from "./tracks"
import player from "./player"
import playlist from "./playlist"

const reducers = combineReducers({
  player,
  tracks,
  playlist
})

export default reducers
