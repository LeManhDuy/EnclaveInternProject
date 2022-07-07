import React, { useEffect } from "react"
import Slider1 from '../../assets/image/slider1.png'
import './Home.css'
function Home() {
    return(
        <div>
            <div className="home-container">
                <div className = "slider">
                    <img src = {Slider1}></img>
                </div>
            </div>
        </div>
    )
}

export default Home;