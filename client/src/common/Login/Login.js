import React, { useState } from "react"
import "./Login.css"
import loginPicture from '../../assets/image/login_picture.png'
import Logo from '../../assets/image/Logo.png'
// import Loader from "../../lib/Loader/Loader"
// import { useDispatch } from "react-redux"
import "../../lib/ModalCustom/ModalCustom"
import AuthenticationService from "../../config/service/AuthenticationService"
// import { setDataLogin } from "../../config/redux/ActionCreators"
import ModalCustom from "../../lib/ModalCustom/ModalCustom"
// import { useForm } from "react-hook-form"
// import * as yup from "yup"
// import { yupResolver } from "@hookform/resolvers/yup"
import { Link } from "react-router-dom"
import ROUTES from "../../constants/routes"
import { useHistory } from "react-router-dom"

function Login(props) {
  // const [errorMessage, setErrorMessage] = useState("")
  // const dispatch = useDispatch()
  const [isLoading, setIsLoading] = useState(false)
  const history = useHistory();
  // const schema = yup.object().shape({
  //   username: yup.string().required(t("Authentication.EmailOrUsernameNotNull")),
  //   password: yup.string().required(t("Authentication.PasswordNotNull"))
  // })

  // const {
  //   register,
  //   handleSubmit,
  //   formState: { errors }
  // } = useForm({ resolver: yupResolver(schema) })

  // const validateEmail = (email) => {
  //   const re =
  //     /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  //   return re.test(String(email).toLowerCase());
  // };

  const handleLogin = (event) => {
    event.preventDefault()
    setIsLoading(true)
    AuthenticationService.postLogin({
      email: document.querySelector('#input-username').value,
      password: document.querySelector('#input-password').value
    })
      .then((res) => {
        setIsLoading(false)
        if(res.success){
          props.HandleCloseLogin()
          props.HandleLoginSuccess()
          AuthenticationService.saveDataLogin(res)
          if(res.role=="admin")
            history.push(ROUTES.ADMIN_PAGE.ADMIN_HOME)
          else if (res.role=="teacher")
            history.push(ROUTES.TEACHER_PAGE.PARENTS_PATH)
          else
            history.push(ROUTES.PARENTS_PAGE.TEACHER_PATH)
          // dispatch(setDataLogin(res))
        }
        else
        {
          setErrorMessage("Does Not Exists")
          
        }
        }
      )
      .catch(() => setIsLoading(false))
  }

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
            <form onSubmit = {handleLogin}>
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
                      id="input-password"
                      type="password"
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
