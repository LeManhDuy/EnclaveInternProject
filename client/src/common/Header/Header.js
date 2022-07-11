import React, { useState, useEffect, useRef } from "react"
import Login from '../Login/Login'
import Logo from '../../assets/image/Logo.png'
import './Header.css'
import AuthenticationService from "../../config/service/AuthenticationService"
import jwt_decode from "jwt-decode"


function Header() {
    const [isShowLogin, setIsShowLogin] = useState(false)
    const [isLogin, setIsLogin] = useState(false)

    useEffect(() => {
      let dataLogin = JSON.parse(localStorage.getItem("@Login"))
      const decoded = dataLogin && jwt_decode(dataLogin.accessToken)
      if (decoded && (decoded.iat * 1000 + 10000000) > Date.now()) {
        setIsLogin(true)
      } else {
        setIsLogin(false)
        AuthenticationService.clearDataLogin()
      }
    }, [])

    const HandleOpenLogin = () => {
        setIsShowLogin(true)
    }
    const HandleCloseLogin = () => {
        setIsShowLogin(false)
        // dispatch(setIsOpenLogin(false))
      }
    const handleRenderButtonLogin = (
        <button onClick={HandleOpenLogin} className="button-login">
            Login
        </button>
      )
      
      const HandleLoginSuccess = () => {
        setIsLogin(true)
      }

      const ViewLogin = (
        <Login
          show={isShowLogin}
          HandleCloseLogin={HandleCloseLogin}
          HandleLoginSuccess={HandleLoginSuccess}
        />
      )
    return (
        <header>
            <nav>
              <div className="nav-content">
                <div className = "nav-logo">
                  <img src = {Logo}></img>
                  <h3>Blue Shool</h3>
                </div>
                {handleRenderButtonLogin}
              </div>
          </nav>
            <div>{ViewLogin}</div>
        </header>
    )
}
 export default Header;