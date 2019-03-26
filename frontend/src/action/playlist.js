import { PLAYLIST_CLEAR, PLAYLIST_SET } from "../constants"

export const setPlaylist = payload => ({
  type: PLAYLIST_SET,
  payload
})

export const clearPlaylist = () => ({
  type: PLAYLIST_CLEAR
})
