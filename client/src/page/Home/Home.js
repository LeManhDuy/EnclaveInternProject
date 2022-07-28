import React, { useEffect } from "react";
import Slider1 from "../../assets/image/slider1.png";
import "./Home.css";
import Header from "../../common/Header/Header";
import Footer from "../../common/Footer/Footer";
import AuthenticationService from "../../config/service/AuthenticationService";
import jwt_decode from "jwt-decode";
import logo from "../../assets/image/Logo.png"
import presidentImage from "../../assets/image/president.jfif"
import graduate from "../../assets/image/graduate.png"
import recess from "../../assets/image/recess.png"
import chromebook from "../../assets/image/chromebook.png"
import athletic from "../../assets/image/athletic.png"
import teams from "../../assets/image/teams.png"
import financial from "../../assets/image/financial.png"
function Home() {
  return (
    <div className="">
      <Header />
      <div className="home-container">
        <header class="header">
          <div class="overlay">
            <img src={logo} class="logo" />
            <h1 class="subtitle">Your Child's Potentital Is Our Passion</h1>
          </div>
        </header>

        <section id="about">
          <div class="container">
            <div class="row align-items-center">
              <div class="col-md-6">
                <h3 class="section-title">Why Blue School?</h3>
                <p class="mb-1 font-weight-bold">
                  "At Blue School,
                  we believe the foundation for a life of integrity, service, and
                  purpose begins with smaller, everyday moments. We educate intentionally
                  in each moment--a thought-provoking conversation in language arts,
                  a first try at a new technique in art class, or a hard-fought game on
                  the athletic field. We cherish every opportunity for our students to
                  demonstrate compassion, to solve problems with diligence and creativity,
                  to learn through a lens of both faith and reason,
                  and to build the confidence and skills that will prepare them for all that life's journey holds.
                  Our Blue School community knows that every moment matters because it all starts here."-Rick Grimes</p>
              </div>
              <div class="col-md-6">
                <div class="row">
                  <div class="col">
                    <img src={presidentImage} class="w-100 rounded shadow" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="team">
          <div class="container">
            <h3 class="section-title mb-5 text-center">Greate Facility</h3>
            <div class="row">
              <div class="col-md-4 my-3">
                <div class="team-wrapper text-center">
                  <img src={graduate} className="w-round-image" />
                  <h5 class="my-3">30 high schools currently enroll our graduates</h5>
                </div>
              </div>
              <div class="col-md-4 my-3">
                <div class="team-wrapper text-center">
                  <img src={recess} className="w-round-image" />
                  <h5 class="my-3">100% of students have recess every day</h5>
                </div>
              </div>
              <div class="col-md-4 my-3">
                <div class="team-wrapper text-center">
                  <img src={athletic} className="w-round-image" />
                  <h5 class="my-3">85% athletic participation grades 6-8</h5>
                </div>
              </div>
              <div class="col-md-4 my-3">
                <div class="team-wrapper text-center">
                  <img src={financial} className="w-round-image" />
                  <h5 class="my-3">22% of families receive financial assistance</h5>
                </div>
              </div>
              <div class="col-md-4 my-3">
                <div class="team-wrapper text-center">
                  <img src={chromebook} className="w-round-image" />
                  <h5 class="my-3">1 Chromebook for every Middle Schooler</h5>
                </div>
              </div>
              <div class="col-md-4 my-3">
                <div class="team-wrapper text-center">
                  <img src={teams} className="w-round-image" />
                  <h5 class="my-3">19 athletic teams</h5>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="testmonial">
          <div class="container">
            <h3 class="section-title mb-5 text-center">Lastest News</h3>
            <div class="row">
              <div class="col-md-4 my-3 my-md-0">
                <div class="card">
                  <div class="card-body">
                    <div class="media align-items-center mb-3">
                      <div class="media-body">
                        <h6 class="mt-1 mb-0">Notifications : School have open Bootcamp</h6>
                        <small class="text-muted mb-0">22 June 2022</small>
                      </div>
                    </div>
                    <p class="mb-0">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Delectus enim modi, id dicta reiciendis itaque.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
}

export default Home;