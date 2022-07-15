import React from "react";
import { Redirect, Route } from "react-router-dom";
import Sidebar from "../../common/SideBar/SideBar";
import AuthenticationService from "../../config/service/AuthenticationService"

const AdminRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    component={(props) =>
      (AuthenticationService.isLogin()&&JSON.parse(localStorage.getItem('@Login')).role === "admin") ? (
        <div>
          <div className="div-container">
            <div className="main-content">
              <Sidebar />
              <Component {...props} />
            </div>
          </div>
        </div>
      ) : (
        <Redirect to="/" />
      )
    }
  />
);

export default AdminRoute;
