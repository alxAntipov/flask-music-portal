export const getTime = time => {
  let seconds = Math.floor(time % 60)
  let minutes = Math.floor((time - seconds) / 60)
  function prettyTime(time) {
    return time > 9 ? time : "0" + time
  }
  return `${prettyTime(minutes)}:${prettyTime(seconds)}`
}
