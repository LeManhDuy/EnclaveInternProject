import React from "react";
import { Redirect, Route } from "react-router-dom";
import AuthenticationService from "../../config/service/AuthenticationService"

const TeacherRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    component={(props) =>
      (AuthenticationService.isLogin()&&JSON.parse(localStorage.getItem('@Login')).role === "teacher") ? (
        <div>
              <Component {...props} />
        </div>
      ) : (
        <Redirect to="/" />
      )
    }
  />
);

export default TeacherRoute;