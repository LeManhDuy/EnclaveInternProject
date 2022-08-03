import React, { useEffect, useState } from "react";
import Slider1 from "../../assets/image/slider1.png";
import "./Home.css";
import Header from "../../common/Header/Header";
import Footer from "../../common/Footer/Footer";
import AuthenticationService from "../../config/service/AuthenticationService";
import jwt_decode from "jwt-decode";
import logo from "../../assets/image/Logo.png";
import presidentImage from "../../assets/image/president.jfif";
import graduate from "../../assets/image/graduate.png";
import recess from "../../assets/image/recess.png";
import chromebook from "../../assets/image/chromebook.png";
import athletic from "../../assets/image/athletic.png";
import teams from "../../assets/image/teams.png";
import financial from "../../assets/image/financial.png";
import NotificationService from "../../config/service/NotificationService";

function Home() {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    getNotifications();
  }, []);

  const getNotifications = () => {
    NotificationService.getNotifications()
      .then((response) => {
        const dataSources = response.notifications.map((item, index) => {
          return {
            key: index + 1,
            id: item.id,
            title: item.title,
            content: item.content,
            date: item.date,
          };
        });
        dataSources.sort(function (a, b) {
          return new Date(b.date) - new Date(a.date);
        });
        if(dataSources.length>9)
        dataSources.length = 9;
        setNotifications(dataSources);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const NotificationItem = ({ notifications }) =>
    notifications.map((item) => (
      <div className="col-md-4 my-3 my-md-2" key={item.key}>
        <div className="card">
          <div className="card-body">
            <div className="media align-items-center mb-3">
              <div className="media-body">
                <h6 className="mt-1 mb-0">Notifications : {item.title}</h6>
                <small className="text-muted mb-0">
                  {new Date(item.date).toDateString() +
                    ", " +
                    new Date(item.date).toLocaleTimeString()}
                </small>
              </div>
            </div>
            <p id="content-home-notification" className="mb-0">{item.content}</p>
          </div>
        </div>
      </div>
    ));

  return (
    <div className="">
      <Header />
      <div className="home-container">
        <header className="header">
          <div className="overlay">
            <img src={logo} className="logo" />
            <h1 className="subtitle">Your Child's Potentital Is Our Passion</h1>
          </div>
        </header>

        <section id="about">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-md-6">
                <h3 className="section-title">Why Blue School?</h3>
                <p className="mb-1 font-weight-bold">
                  "At Blue School, we believe the foundation for a life of
                  integrity, service, and purpose begins with smaller, everyday
                  moments. We educate intentionally in each moment--a
                  thought-provoking conversation in language arts, a first try
                  at a new technique in art class, or a hard-fought game on the
                  athletic field. We cherish every opportunity for our students
                  to demonstrate compassion, to solve problems with diligence
                  and creativity, to learn through a lens of both faith and
                  reason, and to build the confidence and skills that will
                  prepare them for all that life's journey holds. Our Blue
                  School community knows that every moment matters because it
                  all starts here."-Rick Grimes
                </p>
              </div>
              <div className="col-md-6">
                <div className="row">
                  <div className="col">
                    <img
                      src={presidentImage}
                      className="w-100 rounded shadow"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="team">
          <div className="container">
            <h3 className="section-title mb-5 text-center">Greate Facility</h3>
            <div className="row">
              <div className="col-md-4 my-3">
                <div className="team-wrapper text-center">
                  <img src={graduate} className="w-round-image" />
                  <h5 className="my-3">
                    30 high schools currently enroll our graduates
                  </h5>
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
                  <h5 class="my-3">
                    22% of families receive financial assistance
                  </h5>
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
            <div>{(notifications.length==0)?<p>No notifications yet</p>:null}</div>
            <div class="row">
              <NotificationItem notifications={notifications} />
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
}

export default Home;
