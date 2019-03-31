import { LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT } from "../constants"

export default (state = {}, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return { ...action.user }
    case LOGIN_FAILURE:
      return { error: action.error }
    case LOGOUT:
      return {}
    default:
      return state
  }
}
