import React from "react";
import "./SideBar.css";
import Logo from "../../assets/image/Logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleRight,
  faArrowRightToBracket,
  faHouse,
  faUsers,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

function SideBar() {
  return (
    <div>
      <div className="side-bar-main">
        <div className="logo">
          <img src={Logo}></img>
          <h3>Blue school</h3>
        </div>
        <div className="list-button">
          <ul>
            <li>
              <Link
                key={1}
                className={
                  "item" +
                  (window.location.pathname === "/admin" ? " active" : "")
                }
                to={"/admin"}
              >
                <FontAwesomeIcon className="icon" icon={faHouse} />
                <p>Home</p>
                <FontAwesomeIcon
                  className={
                    window.location.pathname === "/admin" ? " show" : " arrow"
                  }
                  icon={faAngleRight}
                />
              </Link>
            </li>

            <li>
              <Link
                key={1}
                className={
                  "item" +
                  (window.location.pathname === "/admin/account"
                    ? " active"
                    : "")
                }
                to={"/admin/account"}
              >
                <FontAwesomeIcon className="icon" icon={faUsers} />
                <p>Account</p>
                <FontAwesomeIcon
                  className={
                    window.location.pathname === "/admin/account"
                      ? " show"
                      : " arrow"
                  }
                  icon={faAngleRight}
                />
              </Link>
            </li>
          </ul>
        </div>
        <div className="account">
          <img src={Logo}></img>
          <div className="name-role">
            <h5>Hoang Nhat Tan</h5>
            <p>Admin</p>
          </div>
          <button className="logout">
            <FontAwesomeIcon className="icon" icon={faRightFromBracket} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default SideBar;
