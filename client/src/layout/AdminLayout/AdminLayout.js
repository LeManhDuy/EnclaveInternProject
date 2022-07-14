import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./AdminLayout.css";
import SideBar from "../../common/SideBar/SideBar";
import AccountAdmin from "../../page/ComponentAdmin/AccountAdmin/AccountAdmin";

function AdminLayout(props) {
  return (
    <div>
      <div className="div-container">
        <div className="main-content">
          <SideBar />
          {props.component}
        </div>
      </div>
    </div>
  );
}

export default AdminLayout;
