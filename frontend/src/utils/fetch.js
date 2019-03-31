function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response
  } else {
    var error = new Error(response.statusText)
    error.response = response
    throw error
  }
}

function parseJSON(response) {
  return response.json()
}

export function httpPost(url, data) {
  const headers = {
    Authorization: localStorage.getItem("auth"),
    Accept: "application/json",
    "Content-Type": "application/json"
  }

  const body = JSON.stringify(data)

  return fetch(url, {
    method: "post",
    headers: headers,
    body: body
  })
    .then(checkStatus)
    .then(parseJSON)
}

export function httpGet(url) {
  const headers = {
    Authorization: localStorage.getItem("auth")
  }
  return fetch(url, {
    method: "get",
    headers: headers
  })
    .then(checkStatus)
    .then(parseJSON)
}
