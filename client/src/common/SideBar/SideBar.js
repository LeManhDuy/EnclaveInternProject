import React, { useState, useEffect } from "react";
import "./SideBar.css";
import Logo from "../../assets/image/Logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faAngleRight,
    faHouse,
    faUsers,
    faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import AuthenticationService from "../../config/service/AuthenticationService";

function SideBar() {
    const [fullName, setFullName] = useState("");
    useEffect(() => {
        getAdmin();
    }, []);
    const getAdmin = () => {
        if (AuthenticationService.isAdmin()) {
            setFullName(
                JSON.parse(localStorage.getItem("@Login")).admin.admin_username
            );
        }
    };

    const handleLogout = () => {
        if (AuthenticationService.isLogin()) {
            AuthenticationService.clearDataLogin();
            window.location.reload(false);
        }
    };

    return (
        <div>
            <div className="side-bar-main">
                <div className="logo">
                    <img src={Logo}></img>
                    <h3>Blue School</h3>
                </div>
                <div className="list-button">
                    <ul>
                        <li>
                            <Link
                                key={1}
                                className={
                                    "item" +
                                    (window.location.pathname === "/admin"
                                        ? " active"
                                        : "")
                                }
                                to={"/admin"}
                            >
                                <FontAwesomeIcon
                                    className="icon"
                                    icon={faHouse}
                                />
                                <p>Home</p>
                                <FontAwesomeIcon
                                    className={
                                        window.location.pathname === "/admin"
                                            ? " show"
                                            : " arrow"
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
                                    (window.location.pathname ===
                                    "/admin/account"
                                        ? " active"
                                        : "")
                                }
                                to={"/admin/account"}
                            >
                                <FontAwesomeIcon
                                    className="icon"
                                    icon={faUsers}
                                />
                                <p>Account</p>
                                <FontAwesomeIcon
                                    className={
                                        window.location.pathname ===
                                        "/admin/account"
                                            ? " show"
                                            : " arrow"
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
                                    (window.location.pathname === "/admin/class"
                                        ? " active"
                                        : "")
                                }
                                to={"/admin/class"}
                            >
                                <FontAwesomeIcon
                                    className="icon"
                                    icon={faUsers}
                                />
                                <p>Class</p>
                                <FontAwesomeIcon
                                    className={
                                        window.location.pathname ===
                                        "/admin/class"
                                            ? " show"
                                            : " arrow"
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
                                    (window.location.pathname === "/admin/grade"
                                        ? " active"
                                        : "")
                                }
                                to={"/admin/grade"}
                            >
                                <FontAwesomeIcon
                                    className="icon"
                                    icon={faUsers}
                                />
                                <p>Grade</p>
                                <FontAwesomeIcon
                                    className={
                                        window.location.pathname ===
                                        "/admin/grade"
                                            ? " show"
                                            : " arrow"
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
                                    (window.location.pathname ===
                                    "/admin/subject"
                                        ? " active"
                                        : "")
                                }
                                to={"/admin/subject"}
                            >
                                <FontAwesomeIcon
                                    className="icon"
                                    icon={faUsers}
                                />
                                <p>Subject</p>
                                <FontAwesomeIcon
                                    className={
                                        window.location.pathname ===
                                        "/admin/subject"
                                            ? " show"
                                            : " arrow"
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
                                    (window.location.pathname ===
                                    "/admin/schedule"
                                        ? " active"
                                        : "")
                                }
                                to={"/admin/schedule"}
                            >
                                <FontAwesomeIcon
                                    className="icon"
                                    icon={faUsers}
                                />
                                <p>Schedule</p>
                                <FontAwesomeIcon
                                    className={
                                        window.location.pathname ===
                                        "/admin/schedule"
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
                        <h5>{fullName}</h5>
                        <p>Admin</p>
                    </div>
                    <button onClick={handleLogout} className="logout">
                        <FontAwesomeIcon
                            className="icon"
                            icon={faRightFromBracket}
                        />
                    </button>
                </div>
            </div>
        </div>
    );
}

export default SideBar;
