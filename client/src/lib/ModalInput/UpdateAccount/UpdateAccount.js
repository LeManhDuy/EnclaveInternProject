import React, { useEffect, useState } from "react";
import "./UpdateAccount.css";
import Logo from "../../../assets/image/Logo.png";
import AccountService from "../../../config/service/AccountService";

const UpdateAccount = (props) => {
  const [allValuesAdmin, setAllValuesAdmin] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [adminError, setAdminError] = useState({
    name: false,
    email: false,
    password: false,
    confirmPassword: false,
  });
  const [allValuesTeacher, setAllValuesTeacher] = useState({
    name: "",
    age: "",
    gender: null,
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
    img: null,
    urlIMG: "",
  });
  const [teacherError, setTeacherError] = useState({
    name: false,
    age: false,
    gender: false,
    phone: false,
    email: false,
    password: false,
    confirmPassword: false,
    img: false,
  });
  // const [allValuesParents, setAllValuesParents] = useState({
  //   name: "",
  //   dateOfBirth: `${date.split("/")[2]}-${
  //     date.split("/")[0] < 10 ? "0" + date.split("/")[0] : date.split("/")[0]
  //   }-${
  //     date.split("/")[1] < 10 ? "0" + date.split("/")[1] : date.split("/")[1]
  //   }`,
  //   address: "",
  //   phone: "",
  //   gender: null,
  //   job: "",
  //   email: "",
  //   password: "",
  //   confirmPassword: "",
  //   img: null,
  // });
  const [parentsError, setParentsError] = useState({
    name: false,
    dateOfBirth: false,
    address: false,
    phone: false,
    gender: false,
    job: false,
    email: false,
    password: false,
    confirmPassword: false,
    img: false,
  });
  
  const validateEmail = (email) => {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

  useEffect(() => {
    if (props.dropValue === "admin") {
      AccountService.getAccountsAdminById(props.AccountId).then((res) =>
        setAllValuesAdmin({
          name: res.alladmin.admin_username,
          email: res.alladmin.admin_email,
          password: "",
          confirmPassword: "",
        })
      );
    } else if (props.dropValue === "teacher") {
      AccountService.getAccountsTeacherById(props.AccountId).then((res) =>
        setAllValuesTeacher({
          name: res.teacher.teacher_name,
          age: res.teacher.teacher_age,
          gender: res.teacher.teacher_gender,
          phone: res.teacher.teacher_phone,
          email: res.teacher.teacher_email,
          password: "",
          confirmPassword: "",
          img: `${process.env}${res.teacher.teacher_img}`,
          urlIMG: res.teacher.teacher_img
        })
      );
    } else {

    }
  }, []);

  const handleUpdateAdminAccount = () => {
    let check = false;
    let name = false;
    let email = false;
    let password = false;
    let confirmPassword = false;
    if (allValuesAdmin.name.length > 30 || allValuesAdmin.name.length < 2) {
      name = true;
      check = true;
    } else name = false;
    if (validateEmail(allValuesAdmin.email) === false) {
      email = true;
      check = true;
    } else email = false;
    if (allValuesAdmin.password.length < 6) {
      password = true;
      check = true;
    } else if (allValuesAdmin.confirmPassword != allValuesAdmin.password) {
      confirmPassword = true;
      check = true;
    } else {
      (password = false), (confirmPassword = false);
    }

    setAdminError({
      name: name,
      email: email,
      password: password,
      confirmPassword: confirmPassword,
    });
    if (!check) {
      props.handleConfirmUpdateAccount(allValuesAdmin);
    }
  };

  const clickUpdate = (e) => {
    e.preventDefault();
    if (props.dropValue === "admin") handleUpdateAdminAccount();
    // else if (props.dropValue === "teacher") handleAddTeacherAccount();
    // else handleAddParentsAccount();
  };

  const changeHandler = (e) => {
    setAllValuesAdmin({
      ...allValuesAdmin,
      [e.target.name]: e.target.value,
    });
    e.target.focus;
  };

  const FormAccountAdmin = (
    <div className="form-admin-content">
      <h2>Update admin account</h2>
      <label
        className={
          "error" + (props.errorServer ? " error-show" : " error-hidden")
        }
      >
        Account already exists
      </label>
      <input
        value={allValuesAdmin.name}
        id="input-name"
        type="text"
        name="name"
        placeholder="Name"
        onChange={changeHandler}
        required
      />
      <label
        className={
          "error" + (adminError.name ? " error-show" : " error-hidden")
        }
      >
        Name must be less than 30 chars long
      </label>
      <input
        id="input-email"
        type="email"
        name="email"
        placeholder="Email"
        value={allValuesAdmin.email}
        onChange={changeHandler}
      />
      <label
        className={
          "error" + (adminError.email ? " error-show" : " error-hidden")
        }
      >
        Invalid Email
      </label>
      <input
        value={allValuesAdmin.password}
        id="input-password"
        type="password"
        name="password"
        placeholder="Password"
        onChange={changeHandler}
      />
      <label
        className={
          "error" + (adminError.password ? " error-show" : " error-hidden")
        }
      >
        Password must be at least 6 chars long
      </label>

      <input
        value={allValuesAdmin.confirmPassword}
        id="input-password-confirm"
        type="password"
        name="confirmPassword"
        placeholder="Confirm Password"
        onChange={changeHandler}
      />
      <label
        className={
          "error" +
          (adminError.confirmPassword ? " error-show" : " error-hidden")
        }
      >
        Password incorrect
      </label>
    </div>
  );

  const FormAccountTeacher = <div>teacher</div>;

  const FormAccountParents = <div>Parents</div>;

  const FormUpdateAccount = (
    <div className="form-add-account">
      {props.dropValue === "admin"
        ? FormAccountAdmin
        : props.dropValue === "teacher"
        ? FormAccountTeacher
        : FormAccountParents}
      <button onClick={props.handleInputCustom} className="btn-cancel">
        Cancel
      </button>
      <button type="submit" onClick={clickUpdate} className="btn-ok">
        Update
      </button>
    </div>
  );

  return <div className="add-account-form">{FormUpdateAccount}</div>;
};

export default UpdateAccount;
