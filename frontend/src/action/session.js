import {
  LOGIN_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGOUT
} from "../constants"
import { API_ROOT } from "../config"
import { httpPost, httpGet } from "../utils/fetch"

export function SignIn(data) {
  return dispatch => {
    dispatch({
      type: LOGIN_REQUEST
    })
    return httpPost(`${API_ROOT}/login`, data)
      .then(data => {
        localStorage.setItem("auth", data.user.token)
        dispatch({ type: LOGIN_SUCCESS, user: data.user })
      })
      .catch(error => {
        error.response.json().then(error => {
          dispatch({
            type: LOGIN_FAILURE,
            error: error.message
          })
        })
      })
  }
}

export function currentUser() {
  return dispatch => {
    return httpGet(`${API_ROOT}/current_user`)
      .then(data => {
        console.log(data)

        dispatch({ type: LOGIN_SUCCESS, user: data.user })
      })
      .catch(error => {
        console.log(error)
      })
  }
}

export function logOut() {
  localStorage.removeItem("auth")
  return { type: LOGOUT }
}
