import { PLAYER_NEW } from "../constants"

export default (state = {}, { type, payload }) => {
  switch (type) {
    case PLAYER_NEW:
      return payload
    default:
      return state
  }
}
