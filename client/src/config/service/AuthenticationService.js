import HandleApi from "../api/HandleAPI"

// const postRegister = async (params) => {
//   return await HandleApi.APIPost("auth/sign-up", params)
// }

const postLogin = async (params) => {
  return await HandleApi.APIPost("authentication/login", params)
}
const saveDataLogin = (data) => {
  localStorage.setItem("@Login", JSON.stringify(data))
}

const clearDataLogin = () => {
  localStorage.removeItem("@Login")
}

const isLogin = () => {
  return !!localStorage.getItem("@Login")
}

const AuthenticationService = {
  postLogin,
  saveDataLogin,
  clearDataLogin,
  isLogin
}

export default AuthenticationService