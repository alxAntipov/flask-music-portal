import { TRACKS_ERROR, TRACKS_REQUEST, TRACKS_SUCCESS } from "../constants"
import { API_ROOT } from "../config"
import { httpGet } from "../utils/fetch"

export function getTracks() {
  return dispatch => {
    dispatch({
      type: TRACKS_REQUEST
    })
    return httpGet(`${API_ROOT}/tracks`)
      .then(data => {
        dispatch({ type: TRACKS_SUCCESS, tracks: data })
      })
      .catch(error => {
        dispatch({
          type: TRACKS_ERROR,
          error
        })
      })
  }
}
