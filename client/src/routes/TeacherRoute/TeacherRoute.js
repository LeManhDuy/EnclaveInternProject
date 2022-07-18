import React from "react";
import { Redirect, Route } from "react-router-dom";
import AuthenticationService from "../../config/service/AuthenticationService";
import Header from '../../common/Header/Header'
import Footer from '../../common/Footer/Footer'

const TeacherRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    component={(props) =>
      AuthenticationService.isLogin() &&
      JSON.parse(localStorage.getItem("@Login")).role === "teacher" ? (
        <div>
          <Header />
          <Component {...props} />
          <Footer />
        </div>
      ) : (
        <Redirect to="/" />
      )
    }
  />
);

export default TeacherRoute;
