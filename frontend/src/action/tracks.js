import { TRACKS_ERROR, TRACKS_REQUEST, TRACKS_SUCCESS } from "../constants"
import { API_ROOT } from "../config"

function requestTracks() {
  return {
    type: TRACKS_REQUEST
  }
}

function receiveTracks(tracks) {
  return {
    type: TRACKS_SUCCESS,
    tracks
  }
}

function tracksError(message) {
  return {
    type: TRACKS_ERROR,
    message
  }
}

export function getTracks() {
  return dispatch => {
    dispatch(requestTracks())
    return fetch(`${API_ROOT}/tracks`, {
      method: "get"
    })
      .then(response => {
        return response.json()
      })
      .then(response => {
        if (!response.error) {
          return dispatch(receiveTracks(response))
        } else {
          return dispatch(tracksError(response.error))
        }
      })
  }
}
