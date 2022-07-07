import React, { useState, useEffect, useRef } from "react"
import Login from '../Login/Login'
import Logo from '../../assets/image/Logo.png'
import './Header.css'

function Header() {
    const [isShowLogin, setIsShowLogin] = useState(false)
    const HandleOpenLogin = () => {
        setIsShowLogin(true)
        console.log('Login click')
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

      const ViewLogin = (
        <Login
          show={isShowLogin}
        //   HandleOpenRegister={HandleOpenRegister}
          HandleCloseLogin={HandleCloseLogin}
        //   HandleLoginSuccess={HandleLoginSuccess}
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