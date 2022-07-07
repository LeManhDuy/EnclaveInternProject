import React, { useState } from "react"
import "./Login.css"
import loginPicture from '../../assets/image/login_picture.png'
import Logo from '../../assets/image/Logo.png'
// import Loader from "../../lib/Loader/Loader"
// import { useDispatch } from "react-redux"
import "../../lib/ModalCustom/ModalCustom"
// import icPageITMedia from "../../assets/images/icPageITMedia.jpg"
// import AuthenticationService from "../../config/service/AuthenticationService"
// import { setDataLogin } from "../../config/redux/ActionCreators"
// import { useTranslation } from "react-i18next"
import ModalCustom from "../../lib/ModalCustom/ModalCustom"
// import { useForm } from "react-hook-form"
// import * as yup from "yup"
// import { yupResolver } from "@hookform/resolvers/yup"
import { Link } from "react-router-dom"
// import ROUTES from "../../constants/routes"
// import { isMobile } from "react-device-detect"

function Login(props) {
  // const { t } = useTranslation()
  // const [errorMessage, setErrorMessage] = useState("")
  // const dispatch = useDispatch()
  // const [isLoading, setIsLoading] = useState(false)

  // const schema = yup.object().shape({
  //   username: yup.string().required(t("Authentication.EmailOrUsernameNotNull")),
  //   password: yup.string().required(t("Authentication.PasswordNotNull"))
  // })

  // const {
  //   register,
  //   handleSubmit,
  //   formState: { errors }
  // } = useForm({ resolver: yupResolver(schema) })

  // const handleLogin = (data, event) => {
  //   event.preventDefault()
  //   setIsLoading(true)
  //   AuthenticationService.postLogin({
  //     username: data.username,
  //     password: data.password
  //   })
  //     .then((res) => {
  //       setIsLoading(false)
  //       switch (res.status) {
  //         case 400:
  //           setErrorMessage(t("Authentication.DoesNotExists"))
  //           break
  //         case 401:
  //           setErrorMessage(t("Authentication.PasswordIncorrect"))
  //           break
  //         case 403:
  //           setErrorMessage(t("Authentication.InactiveEmail"))
  //           break
  //         default:
  //           props.HandleCloseLogin()
  //           props.HandleLoginSuccess()
  //           AuthenticationService.saveDataLogin(res)
  //           dispatch(setDataLogin(res))
  //       }
  //     })
  //     .catch(() => setIsLoading(false))
  // }

  // const HandleRegister = () => {
  //   props.HandleOpenRegister()
  //   props.HandleCloseLogin()
  // }
  return (
    <div>
      <ModalCustom
        show={props.show}
        handleCloseModalCustom={props.HandleCloseLogin}
        content={
          <div className="login-container">
            <form onSubmit>
              <div className ='login-content'>
                <div className = 'left-content'>
                    <h1>Blue School</h1>
                    <img src = {loginPicture}></img>
                </div>
                <div className = "line-middle"></div>
                <div className = "right-content">
                  <img src = {Logo}></img>
                  <h1>Login</h1>
                  <input
                      id="input-username"
                      type="text"
                      name="username"
                      placeholder = "Username"
                  />
                  <input
                      id="input-username"
                      type="text"
                      name="password"
                      placeholder = "Password"
                  />
                  <Link to>Forgot password?</Link>
                  <button type="submit" className="login">
                    Login
                  </button>
                </div>
              </div>
            </form>
            {/* <form onSubmit={handleSubmit(handleLogin)}>
              <div className="login-content">
                <div className="input-content">
                  <div className="error">{errorMessage}</div>
                  <label htmlFor="username">
                    {t("Authentication.Username")}
                  </label>
                  <input
                    id="input-username"
                    type="text"
                    name="username"
                    {...register("username")}
                  />
                  {errors.username && (
                    <p className="text-danger">{errors.username.message}</p>
                  )}
                </div>
                <div className="input-content">
                  <label htmlFor="password">
                    {t("Authentication.Password")}
                  </label>
                  <input
                    id="input-password"
                    type="password"
                    name="password"
                    {...register("password")}
                  />
                  {errors.password && (
                    <p className="text-danger">{errors.password.message}</p>
                  )}
                </div>
                <Link
                  className="forgot-password"
                  to={ROUTES.FORGOT_PASSWORD_PAGE.path}
                  onClick={props.HandleCloseLogin}
                >
                  {t("Authentication.Forgot")}
                </Link>
                <button type="submit" className="login">
                  {t("Authentication.Login")}
                </button>
                <div className="login-by-another">
                  <button type="button">
                    <i className="fa fa-facebook-square" aria-hidden="true" />
                    <span>{t("Authentication.LoginFacebook")}</span>
                  </button>
                  <button type="button">
                    <i className="fa fa-google" aria-hidden="true" />
                    <span>{t("Authentication.LoginGoogle")}</span>
                  </button>
                  <button type="button">
                    <i className="fa fa-windows" aria-hidden="true" />
                    <span>{t("Authentication.LoginOutlook")}</span>
                  </button>
                </div>
              </div>
            </form> */}
            {/* <div className="login-by-register">
              <div>{t("Authentication.AccountYet")}</div>
              <div className="register" onClick={HandleRegister}>
                {t("Authentication.Register")}
              </div>
            </div> */}
          </div>
        }
      />
    </div>
  )
}

export default Login
