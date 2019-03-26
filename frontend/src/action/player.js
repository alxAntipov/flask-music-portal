import { PLAYER_NEW } from "../constants"

export function newPlayer(track) {
  return {
    type: PLAYER_NEW,
    payload: track
  }
}
