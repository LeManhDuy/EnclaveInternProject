import React, { useEffect } from "react";
import "./Parents.css";
import Header from "../../common/Header/Header";
import Footer from "../../common/Footer/Footer";
import { useHistory } from "react-router-dom";
import ROUTES from "../../constants/routes";
import AuthenticationService from "../../config/service/AuthenticationService";

function Parents() {
  const history = useHistory();
  useEffect(() => {
    if (
      (AuthenticationService.isLogin() &&
        JSON.parse(localStorage.getItem("@Login")).role === "admin") ||
      (AuthenticationService.isLogin() &&
        JSON.parse(localStorage.getItem("@Login")).role === "teacher")
    ) {
      history.push(ROUTES.HOME_PAGE.path);
    }
  }, []);

  return (
    <div>
      <Header />
      Parents
      <Footer />
    </div>
  );
}
export default Parents;
