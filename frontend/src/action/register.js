import { REGISTER_FAILURE, LOGIN_SUCCESS } from "../constants"

import { API_ROOT } from "../config"
import { httpPost } from "../utils/fetch"

export function SignUp(data) {
  return dispatch => {
    return httpPost(`${API_ROOT}/register`, data)
      .then(data => {
        dispatch({ type: LOGIN_SUCCESS, user: data.user })
        localStorage.setItem("auth", data.user.token)
      })
      .catch(error => {
        error.response.json().then(error => {
          dispatch({
            type: REGISTER_FAILURE,
            error: error.message
          })
        })
      })
  }
}
