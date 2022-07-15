import React from "react";
import "./HomeAdmin.css"
import PictureWelcome from "../../../assets/image/welcome.png"
function HomeAdmin() {
    return (
        <div className="common">
            <div className="home-message">
                <i className="fa fa-circle one"></i>
                <i className="fa fa-circle two"></i>
                <i className="fa fa-circle three"></i>
                <i className="fa fa-circle four"></i>
                <i className="fa fa-circle five"></i>
                <i className="fa fa-circle six"></i>
                <i className="fa fa-circle seven"></i>
                <i className="fa fa-circle eight"></i>
                <h1>Hello</h1>
                <h3>Welcome to the admin page.</h3>
            </div>
            <div className="home-image">
                <img src={PictureWelcome} />
            </div>
        </div>
    )
}

export default HomeAdmin