import { combineReducers } from "redux"
import pageTracks from "./pageTracks"
import player from "./player"
import playlist from "./playlist"
import session from "./session"
import register from "./register"

const reducers = combineReducers({
  player,
  pageTracks,
  playlist,
  session,
  register
})

export default reducers
