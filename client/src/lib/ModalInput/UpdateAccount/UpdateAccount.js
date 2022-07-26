import React, { useEffect, useState } from "react";
import "./UpdateAccount.css";
import Logo from "../../../assets/image/Logo.png";
import AccountService from "../../../config/service/AccountService";

const UpdateAccount = (props) => {
  const { REACT_APP_API_ENDPOINT } = process.env;
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
  const [avatar, setAvatar] = useState(Logo);

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

  const toDataURL = url => fetch(url)
      .then(response => response.blob())
      .then(blob => new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onloadend = () => resolve(reader.result)
      reader.onerror = reject
      reader.readAsDataURL(blob)
     }))

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
      AccountService.getAccountsTeacherById(props.AccountId).then((res) => {
        (!!res.teacher.teacher_img)
          ? (setAvatar(`${REACT_APP_API_ENDPOINT}${res.teacher.teacher_img}`))
          :setAvatar(Logo);
        setAllValuesTeacher({
          name: res.teacher.teacher_name,
          age: res.teacher.teacher_age,
          gender: `${res.teacher.teacher_gender}`,
          phone: res.teacher.teacher_phone,
          email: res.teacher.teacher_email,
          password: "",
          confirmPassword: "",
          img: null,
        });
      });
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

  const handleUpdateTeacherAccount = () => {
    let name = false;
    let age = false;
    let gender = false;
    let phone = false;
    let email = false;
    let password = false;
    let confirmPassword = false;
    let img = false;

    let check = false;
    if (allValuesTeacher.name.length > 30 || allValuesTeacher.name.length < 2) {
      name = true;
      check = true;
    } else name = false;

    if (validateEmail(allValuesTeacher.email) === false) {
      email = true;
      check = true;
    } else email = false;

    if (allValuesTeacher.password.length < 6) {
      password = true;
      check = true;
    } else if (allValuesTeacher.confirmPassword != allValuesTeacher.password) {
      confirmPassword = true;
      check = true;
    } else {
      (password = false), (confirmPassword = false);
    }

    if (
      isNaN(parseInt(allValuesTeacher.age)) ||
      allValuesTeacher.age.length > 3
    ) {
      age = true;
      check = true;
    } else age = false;

    console.log(allValuesTeacher.gender)
    if (allValuesTeacher.gender==null) {
      gender = true;
      check = true;
    } else gender = false;

    if (
      isNaN(parseInt(allValuesTeacher.phone)) ||
      allValuesTeacher.phone.length != 10
    ) {
      phone = true;
      check = true;
    } else phone = false;

    if (!!allValuesTeacher.img) {
      let imgList = allValuesTeacher.img.name.split(".");
      if (
        imgList[imgList.length - 1] != "png" &&
        imgList[imgList.length - 1] != "jpg"
      ) {
        img = true;
        check = true;
      } else img = false;
    }

    setTeacherError({
      name: name,
      age: age,
      gender: gender,
      phone: phone,
      email: email,
      password: password,
      confirmPassword: confirmPassword,
      img: img,
    });
    if (!check) {
      props.handleConfirmUpdateAccount(allValuesTeacher);
    }
  };

  const clickUpdate = (e) => {
    e.preventDefault();
    if (props.dropValue === "admin") handleUpdateAdminAccount();
    else if (props.dropValue === "teacher") handleUpdateTeacherAccount();
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

  const changeHandlerTeacher = (e) => {
    setAllValuesTeacher({
      ...allValuesTeacher,
      [e.target.name]: e.target.value,
    });
  };

  const changeHandlerTeacherIMG = (e) => {
    setAllValuesTeacher({
      name: allValuesTeacher.name,
      age: allValuesTeacher.age,
      gender: allValuesTeacher.gender,
      phone: allValuesTeacher.phone,
      email: allValuesTeacher.email,
      password: allValuesTeacher.password,
      confirmPassword: allValuesTeacher.confirmPassword,
      img: e.target.files[0],
    });
    try {
      setAvatar(URL.createObjectURL(e.target.files[0]));
    } catch (err) {
      console.log(err);
    }
  };
  const FormAccountTeacher = (
    <div className="form-admin-content">
      <h2>Add Account Teacher</h2>
      <label
        className={
          "error" + (props.errorServer ? " error-show" : " error-hidden")
        }
      >
        Account already exists
      </label>
      <div className="form-teacher-content">
        <div className="teacher-content-left">
          <div className="avatar-teacher">
            <img src={avatar} />
            <label className="choose-file" htmlFor="upload-photo">
              Choose image
            </label>
            <input
              id="upload-photo"
              type="file"
              name="img"
              onChange={changeHandlerTeacherIMG}
            />
            <label
              className={
                "error" + (teacherError.img ? " error-show" : " error-hidden")
              }
            >
              The selected file is not valid
            </label>
          </div>
          <div className="type-input">
            <h4>Name</h4>
            <input
              className="input-content"
              type="text"
              name="name"
              placeholder="Enter name"
              value={allValuesTeacher.name}
              onChange={changeHandlerTeacher}
            />
            <label
              className={
                "error" + (teacherError.name ? " error-show" : " error-hidden")
              }
            >
              Name must be less than 30 chars
            </label>
          </div>
          <div className="type-input">
            <h4>Age</h4>
            <input
              className="input-content"
              type="text"
              name="age"
              placeholder="Enter age"
              value={allValuesTeacher.age}
              onChange={changeHandlerTeacher}
            />
            <label
              className={
                "error" + (teacherError.age ? " error-show" : " error-hidden")
              }
            >
              Invalid age
            </label>
          </div>
          <div className="type-input">
            <h4>Gender</h4>
            <div className="radio-btn">
              <div className="radio">
                <input
                  type="radio"
                  value="true"
                  name="gender"
                  onChange={changeHandlerTeacher}
                  checked={allValuesTeacher.gender==="true"}
                />
                Male
                <input
                checked = {allValuesTeacher.gender==="false"}
                  type="radio"
                  value="false"
                  name="gender"
                  onChange={changeHandlerTeacher}
                />
                Female
              </div>
              <label
                className={
                  "error" +
                  (teacherError.gender ? " error-show" : " error-hidden")
                }
              >
                No gender selected
              </label>
            </div>
          </div>
        </div>
        <div className="teacher-content-right">
          <div className="type-input">
            <h4>Phone Number</h4>
            <input
              className="input-content"
              type="text"
              name="phone"
              placeholder="Enter phone"
              value={allValuesTeacher.phone}
              onChange={changeHandlerTeacher}
            />
            <label
              className={
                "error" + (teacherError.phone ? " error-show" : " error-hidden")
              }
            >
              Phone must be 10 numeric characters
            </label>
          </div>
          <div className="type-input">
            <h4>Email</h4>
            <input
              className="input-content"
              type="email"
              name="email"
              placeholder="Enter email"
              value={allValuesTeacher.email}
              onChange={changeHandlerTeacher}
            />
            <label
              className={
                "error" + (teacherError.email ? " error-show" : " error-hidden")
              }
            >
              Invalid Email
            </label>
          </div>
          <div className="type-input">
            <h4>Password</h4>
            <input
              className="input-content"
              type="password"
              name="password"
              placeholder="Enter password "
              value={allValuesTeacher.password}
              onChange={changeHandlerTeacher}
            />
            <label
              className={
                "error" +
                (teacherError.password ? " error-show" : " error-hidden")
              }
            >
              Password must be at least 6 chars long
            </label>
          </div>
          <div className="type-input">
            <h4>Confirm Password</h4>
            <input
              className="input-content"
              type="password"
              name="confirmPassword"
              placeholder="Enter password "
              value={allValuesTeacher.confirmPassword}
              onChange={changeHandlerTeacher}
            />
            <label
              className={
                "error" +
                (teacherError.confirmPassword ? " error-show" : " error-hidden")
              }
            >
              Password incorrect
            </label>
          </div>
        </div>
      </div>
    </div>
  );

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
