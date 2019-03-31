import { REGISTER_FAILURE } from "../constants"

export default (state = {}, action) => {
  switch (action.type) {
    case REGISTER_FAILURE:
      return { error: action.error }
    default:
      return state
  }
}
