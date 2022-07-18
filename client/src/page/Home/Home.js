import React, { useEffect } from "react";
import Slider1 from "../../assets/image/slider1.png";
import "./Home.css";
import Header from "../../common/Header/Header";
import Footer from "../../common/Footer/Footer";
import AuthenticationService from "../../config/service/AuthenticationService";
import jwt_decode from "jwt-decode";

function Home() {
  return (
    <div className="">
      <Header />
      <div className="home-container">
        <div className="slider">
          <img src={Slider1}></img>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Home;