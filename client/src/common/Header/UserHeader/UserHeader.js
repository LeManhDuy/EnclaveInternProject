import React, { useEffect, useRef, useState } from "react";
import "./UserHeader.css";
import AuthenticationService from "../../../config/service/AuthenticationService";
import ROUTES from "../../../constants/routes";
import { Link } from "react-router-dom";
import Logo from "../../../assets/image/Logo.png";
import AvatarDropdown from "../AvatarDropdown/AvatarDropdown";

function useOutsideAlerter(ref, handle) {
  useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        handle(event)
      }
    }
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, handle]);
}

function UserHeader() {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef, () => {
    setOpen(false)
  });
  const optionsParents = [
    { key: 1, label: "Home", link: ROUTES.HOME_PAGE.HOME_PATH },
    {
      key: 2,
      label: "Student",
      link: ROUTES.PARENTS_PAGE.PARENTS_STUDENT_PATH,
    },
    {
      key: 3,
      label: "Parents",
      link: ROUTES.PARENTS_PAGE.PARENTS_PARENTS_PATH,
    },
  ];

  const optionsTeacher = [
    { key: 1, label: "Home", link: ROUTES.HOME_PAGE.HOME_PATH },
    {
      key: 2,
      label: "Student",
      link: ROUTES.TEACHER_PAGE.TEACHER_STUDENT_PATH,
    },
    {
      key: 3,
      label: "Class",
      link: ROUTES.TEACHER_PAGE.TEACHER_CLASS_PATH,
    },
  ];

  const optionsAdmin = [
    {
      key: 1,
      label: "Admin",
      link: ROUTES.ADMIN_PAGE.ADMIN_HOME,
    },
    {
      key: 2,
      label: "Accounts",
      link: ROUTES.ADMIN_PAGE.ACCOUNT_ADMIN,
    },
  ];

  const optionsDropDown = [
    { value: "chocolate", label: "Chocolate", copy: true },
    { value: "strawberry", label: "Strawberry", copy: true },
    { value: "vanilla", label: "Vanilla", copy: true },
  ];

  const ItemHeader = ({ options }) => {
    return (
      <div className="item-header">
        {options.map((option) => (
          <Link key={option.key} to={option.link}>
            {option.label}
          </Link>
        ))}
      </div>
    );
  };

  const HandleLogout = () => {
    AuthenticationService.clearDataLogin();
    window.location.reload(false);
  };

  return (
    <div className="user-header">
      <ItemHeader
        options={
          AuthenticationService.isAdmin()
            ? optionsAdmin
            : AuthenticationService.isParents()
            ? optionsParents
            : optionsTeacher
        }
      />
      <div className="info-header">
        <h5>
          {AuthenticationService.isAdmin()
            ? AuthenticationService.getData().admin.admin_username.toString()
            : AuthenticationService.isParents()
            ? AuthenticationService.getData().parent.parent_name
            : AuthenticationService.getData().teacher.teacher_name}
        </h5>
        <h6>{AuthenticationService.getData().role.toUpperCase()}</h6>
      </div>
      <div className="avatar" ref={wrapperRef}>
        <img src={Logo} onClick={() => setOpen(!open)}/>
        {open ? <AvatarDropdown HandleLogout={HandleLogout}/> : null}
      </div>
    </div>
  );
}

export default UserHeader;
