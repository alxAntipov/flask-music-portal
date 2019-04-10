import {
  TRACKS_ERROR,
  TRACKS_REQUEST,
  TRACKS_SUCCESS,
  TRACK_LIKE,
  TRACKS_CLEAR
} from "../constants"
import { API_ROOT } from "../config"
import { httpGet, httpPost } from "../utils/fetch"

export function getTracks(playlistName) {
  return dispatch => {
    dispatch({
      type: TRACKS_REQUEST
    })
    return httpGet(`${API_ROOT}/${playlistName}`)
      .then(data => {
        const payload = {
          name: playlistName,
          tracks: data
        }
        dispatch({ type: TRACKS_SUCCESS, payload })
      })
      .catch(error => {
        error.response.json().then(error => {
          dispatch({
            type: TRACKS_ERROR,
            error: error.message
          })
        })
      })
  }
}

export function likeTrack(data) {
  return dispatch => {
    dispatch({ type: TRACK_LIKE, track: data })
    return httpPost(`${API_ROOT}/like`, data).catch(error => {
      console.log(error)
    })
  }
}

export function clearPage() {
  return { type: TRACKS_CLEAR }
}
