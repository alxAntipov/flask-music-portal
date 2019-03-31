import { combineReducers } from "redux"
import tracks from "./tracks"
import player from "./player"
import playlist from "./playlist"
import session from "./session"
import register from "./register"

const reducers = combineReducers({
  player,
  tracks,
  playlist,
  session,
  register
})

export default reducers
