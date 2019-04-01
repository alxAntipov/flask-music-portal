import { PLAYER_NEW, PLAYER_LIKE } from "../constants"

export function newPlayer(track) {
  return {
    type: PLAYER_NEW,
    track: track
  }
}
