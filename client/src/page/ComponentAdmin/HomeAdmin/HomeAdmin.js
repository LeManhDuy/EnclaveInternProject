import React from "react";
import "./HomeAdmin.css"
import PictureWelcome from "../../../assets/image/welcome.png"
function HomeAdmin() {
    return (
        <div class="common">
            <div class="home-message">
                <i class="fa fa-circle one"></i>
                <i class="fa fa-circle two"></i>
                <i class="fa fa-circle three"></i>
                <i class="fa fa-circle four"></i>
                <i class="fa fa-circle five"></i>
                <i class="fa fa-circle six"></i>
                <i class="fa fa-circle seven"></i>
                <i class="fa fa-circle eight"></i>
                <h1>Hello</h1>
                <h3>You have a message in your notification.</h3>
            </div>
            <div class="home-image">
                <img src={PictureWelcome} />
            </div>
        </div>
    )
}

export default HomeAdmin