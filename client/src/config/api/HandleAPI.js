import AuthenticationService from "../service/AuthenticationService"
// import { errorAlert } from "../../utils/customAlert"

const { REACT_APP_API_ENDPOINT } = process.env

const header = {
  Accept: "application/json",
  "Content-Type": "application/json",
  Authorization: ""
}

function getToken() {
  if (AuthenticationService.isLogin()) {
    let data = JSON.parse(localStorage.getItem("@Login"))
    return data.type + " " + data.accessToken
  }
}

// function APIGetPublic(url, params) {
//   url = REACT_APP_API_ENDPOINT + "api/v1/public/" + url
//   return fetch(url, {
//     method: "GET",
//     body: JSON.stringify(params)
//   })
//     .then(checkStatus)
//     .then((response) => response.json())
// }

function APIPostPublic(url, params) {
  url = REACT_APP_API_ENDPOINT + "api/" + url
  return fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(params)
  })
    .then((response) => response.json())
}

// function APIPutPublic(url, params) {
//   url = REACT_APP_API_ENDPOINT + "api/v1/public/" + url
//   return fetch(url, {
//     method: "PUT",
//     headers: {
//       "Content-Type": "application/json"
//     },
//     body: JSON.stringify(params)
//   })
//     .then(checkStatus)
//     .then((response) => response.json())
// }

function APIGetWithToken(url) {
  url = REACT_APP_API_ENDPOINT + "api/" + url
  return fetch(url, {
    method: "GET",
    headers: {
      Authorization: getToken()
    }
  })
    .then((response) => response.json())
}

function APIPost(url, params) {
  url = REACT_APP_API_ENDPOINT + "api/" + url
  return fetch(url, {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
    },
    body: JSON.stringify(params)
  })
    .then((response) =>response.json())
}

// function APIPostWithToken(url, params) {
//   url = REACT_APP_API_ENDPOINT + "api/v1/" + url
//   return fetch(url, {
//     method: "POST",
//     headers: {
//       Authorization: getToken(),
//       "Content-Type": "application/json"
//     },
//     body: JSON.stringify(params)
//   })
//     .then(checkStatus)
//     .then((response) => response.text())
// }

// function APIPostWithFormData(url, body) {
//   url = REACT_APP_API_ENDPOINT + "api/v1/" + url
//   return fetch(url, {
//     method: "POST",
//     headers: {
//       Authorization: getToken()
//     },
//     body: body
//   })
//     .then(checkStatus)
//     .then((response) => response.text())
// }

// function APIPutWithFormData(url, body) {
//   url = REACT_APP_API_ENDPOINT + "api/v1/" + url
//   return fetch(url, {
//     method: "PUT",
//     headers: {
//       Authorization: getToken()
//     },
//     body: body
//   })
//     .then(checkStatus)
//     .then((response) => response.text())
// }

// function APIPut(url, params) {
//   url = REACT_APP_API_ENDPOINT + "api/v1/" + url
//   return fetch(url, {
//     method: "PUT",
//     headers: {
//       Authorization: getToken(),
//       "Content-Type": "application/json"
//     },
//     body: JSON.stringify(params)
//   })
//     .then(checkStatus)
//     .then((response) => response.json())
// }

// function checkStatus(response) {
//   if (response.status === 500) {
//     errorAlert("Server Error!", "Something went wrong!")
//     return
//   }
//   return response
// }

const HandleApi = {
//   APIGetPublic,
  APIPostPublic,
//   APIPutPublic,
  APIPost,
//   APIPut,
  APIGetWithToken,
//   APIPostWithToken,
//   APIPostWithFormData,
//   APIPutWithFormData
}

export default HandleApi