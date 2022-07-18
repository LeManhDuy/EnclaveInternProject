import React, { useState } from "react";
import "./Login.css";
import loginPicture from "../../assets/image/login_picture.png";
import Logo from "../../assets/image/Logo.png";
// import Loader from "../../lib/Loader/Loader"
// import { useDispatch } from "react-redux"
import "../../lib/ModalCustom/ModalCustom";
import AuthenticationService from "../../config/service/AuthenticationService";
// import { setDataLogin } from "../../config/redux/ActionCreators"
import ModalCustom from "../../lib/ModalCustom/ModalCustom";
// import { useForm } from "react-hook-form"
// import * as yup from "yup"
// import { yupResolver } from "@hookform/resolvers/yup"
import { Link } from "react-router-dom";
import ROUTES from "../../constants/routes";
import { useHistory } from "react-router-dom";

function Login(props) {
  const [errorEmail, setErrorEmail] = useState(false);
  const [errorPassword, setErrorPassword] = useState(false);
  const [errorServer, setErrorServer] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const dispatch = useDispatch()
  const [isLoading, setIsLoading] = useState(false);
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

  const validateEmail = (email) => {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

  const handleLogin = (event) => {
    event.preventDefault();

    var check = false;
    if (validateEmail(email)===false) {
      check = true;
      setErrorEmail(true)
      setErrorServer(false)
    }
    else{
      setErrorEmail(false)
    }

    if (password.length < 6) {
      check = true;
      setErrorServer(false)
      setErrorPassword(true)
    }
    else{
      setErrorPassword(false)
    }

    if (check) {
      return;
    } else {
      AuthenticationService.postLogin({
        email: document.querySelector("#input-username").value,
        password: document.querySelector("#input-password").value,
      })
        .then((res) => {
          if (res.success) {
            props.HandleCloseLogin();
            props.HandleLoginSuccess();
            AuthenticationService.saveDataLogin(res);
            if (res.role == "admin") history.push(ROUTES.ADMIN_PAGE.ADMIN_HOME);
            else if (res.role == "parent")
              history.push(ROUTES.PARENTS_PAGE.PARENTS_PATH);
            else history.push(ROUTES.TEACHER_PAGE.TEACHER_PATH);
          } else {
            setErrorServer(true)
            setErrorMessage("Does Not Exists");
          }
        })
        .catch(() => setIsLoading(false));
    }
  };

  const handleChange = (e) => {
    if (e.target.id == "input-username") {
      setEmail(e.target.value);
    } else {
      setPassword(e.target.value);
    }
  };
  return (
    <div>
      <ModalCustom
        show={props.show}
        handleCloseModalCustom={props.HandleCloseLogin}
        content={
          <div className="login-container">
            <form onSubmit={handleLogin}>
              <div className="login-content">
                <div className="left-content">
                  <h1>Blue School</h1>
                  <img src={loginPicture}></img>
                </div>
                <div className="line-middle"></div>
                <div className="right-content">
                  <img src={Logo}></img>
                  <h1>Login</h1>
                  <label className={"error" + ( errorServer ?" error-show" : " error-hidden")}>Incorrect email or password</label>
                  <input
                    id="input-username"
                    type="text"
                    name="username"
                    placeholder="Username"
                    onChange={handleChange}
                    value={email}
                  />
                  <label className={"error" + ( errorEmail ?" error-show" : " error-hidden")}>Invalid Email</label>
                  <input
                    id="input-password"
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={password}
                    onChange={handleChange}
                  />
                  <label className={"error" + ( errorPassword ? " error-show" : " error-hidden")}>Password must be at least 6 chars long</label>
                  {/* <Link to>Forgot password?</Link> */}
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
  );
}

export default Login;
