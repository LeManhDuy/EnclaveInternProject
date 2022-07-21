import React, { useState, useEffect } from "react";
import "./AddAccount.css";
import Logo from "../../../assets/image/Logo.png";

const AddAccount = (props) => {
  const [dropValue, setDropValue] = useState("parents");
  const [allValuesAdmin, setAllValuesAdmin] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [isShowAdd, setIsShowAdd] = useState(false);
  const [adminError, setAdminError] = useState({
    name: false,
    email: false,
    password: false,
    confirmPassword: false,
  });

  const options = [
    { key: 1, label: "Admin", value: "admin" },
    { key: 2, label: "Parents", value: "parents" },
    { key: 3, label: "Teacher", value: "teacher" },
  ];

  const Dropdown = ({ value, options, onChange }) => {
    return (
      <label>
        Type of account
        <select className="dropdown-account" value={value} onChange={onChange}>
          {options.map((option) => (
            <option key={option.key} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </label>
    );
  };

  const handleChange = (event) => {
    setDropValue(event.target.value);
  };

  const ChooseAccount = (
    <div className="choose-account">
      <h5>Please select the type of account you want to add!</h5>
      <Dropdown options={options} value={dropValue} onChange={handleChange} />
      <button onClick={props.handleInputCustom} className="btn-cancel">
        Cancel
      </button>
      <button onClick={() => setIsShowAdd(true)} className="btn-ok">
        Ok
      </button>
    </div>
  );

  const validateEmail = (email) => {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

  const handleAddAdminAccount = () => {
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
      props.handleConfirmAddAccount(allValuesAdmin);
      props.handleInputCustom();
    }
  };
  const clickSave = (e) => {
    e.preventDefault();
    handleAddAdminAccount();
  };
  const changeHandler = (e) => {
    setAllValuesAdmin({ ...allValuesAdmin, [e.target.name]: e.target.value });
    e.target.focus;
  };

  const FormAccountAdmin = (
    <div class="form-admin-content">
      <h2>Add admin account</h2>
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
        Name must be at least 30 chars long
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
        type="text"
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
        type="text"
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
  const FormAccountTeacher = (
    <div className="form-admin-content">
      <h2>Add Account Teacher</h2>
      <div className="form-teacher-content">
        <div className="teacher-content-left">
          <div className="avatar-teacher">
            <img src={Logo} />
            <button className="btnUpload">Upload Img</button>
          </div>
          <div className="type-input">
            <h4>Name</h4>
            <input
              className="input-content"
              id="input-name"
              type="text"
              name="name"
              placeholder="Enter name"
              value=""
            />
          </div>
          <div className="type-input">
            <h4>Date of Birth</h4>
            <input
              className="input-content"
              id="input-date"
              type="date"
              name="date"
              placeholder="Choose date"
              value=""
            />
          </div>
          <div className="type-input">
            <h4>Gender</h4>
            <div className="radio-btn">
              <div className="radio">
                <label>
                  <input
                    type="radio"
                    value="option3"
                    checked={true}
                    name="gender"
                    // checked={this.state.selectedOption === "option3"}
                    // onChange={this.handleOptionChange}
                  />
                  Option 3
                </label>
              </div>
              <div className="radio">
                <label>
                  <input
                    type="radio"
                    value="option2"
                    name="gender"
                    // checked={this.state.selectedOption === "option2"}
                    // onChange={this.handleOptionChange}
                  />
                  Option 2
                </label>
              </div>
            </div>
          </div>
        </div>
        <div className="teacher-content-right">
          <div className="type-input">
            <h4>Phone Number</h4>
            <input
              className="input-content"
              id="input-phone"
              type="text"
              name="phone"
              placeholder="Enter phone"
              value=""
            />
          </div>
          <div className="type-input">
            <h4>Email</h4>
            <input
              className="input-content"
              id="input-email"
              type="email"
              name="email"
              placeholder="Enter email"
              value=""
            />
          </div>
          <div className="type-input">
            <h4>Password</h4>
            <input
              className="input-content"
              id="input-password"
              type="password"
              name="password"
              placeholder="Enter password "
              value=""
            />
          </div>
          <div className="type-input">
            <h4>Confirm Password</h4>
            <input
              className="input-content"
              id="input-password"
              type="password"
              name="password"
              placeholder="Enter password "
              value=""
            />
          </div>
        </div>
      </div>
    </div>
  );

  const FormAccountParents = (
    <div className="form-admin-content">
      <h4>Add Parents account</h4>
      <div className="form-teacher-content">
        <div className="teacher-content-left">
          <div className="avatar-teacher">
            <img src={Logo} />
            <button className="btnUpload">Upload Img</button>
          </div>
          <div className="type-input">
            <h4>Name</h4>
            <input
              className="input-content"
              id="input-name"
              type="text"
              name="name"
              placeholder="Enter name"
              value=""
            />
          </div>
          <div className="type-input">
            <h4>Date of Birth</h4>
            <input
              className="input-content"
              id="input-date"
              type="date"
              name="date"
              placeholder="Choose date"
              value=""
            />
          </div>
          <div className="type-input">
            <h4>Gender</h4>
            <div className="radio-btn">
              <div className="radio">
                <label>
                  <input
                    type="radio"
                    value="option3"
                    checked={true}
                    name="gender"
                    // checked={this.state.selectedOption === "option3"}
                    // onChange={this.handleOptionChange}
                  />
                  Option 3
                </label>
              </div>
              <div className="radio">
                <label>
                  <input
                    type="radio"
                    value="option2"
                    name="gender"
                    // checked={this.state.selectedOption === "option2"}
                    // onChange={this.handleOptionChange}
                  />
                  Option 2
                </label>
              </div>
            </div>
          </div>
          <div className="type-input">
            <h4>Address</h4>
            <input
              className="input-content"
              id="input-name"
              type="text"
              name="name"
              placeholder="Enter name"
              value=""
            />
          </div>
        </div>
        <div className="teacher-content-right">
        <div className="type-input">
            <h4>Career</h4>
            <input
              className="input-content"
              id="input-career"
              type="text"
              name="name"
              placeholder="Enter name"
              value=""
            />
          </div>
          <div className="type-input">
            <h4>Phone Number</h4>
            <input
              className="input-content"
              id="input-phone"
              type="text"
              name="phone"
              placeholder="Enter phone"
              value=""
            />
          </div>
          <div className="type-input">
            <h4>Email</h4>
            <input
              className="input-content"
              id="input-email"
              type="email"
              name="email"
              placeholder="Enter email"
              value=""
            />
          </div>
          <div className="type-input">
            <h4>Password</h4>
            <input
              className="input-content"
              id="input-password"
              type="password"
              name="password"
              placeholder="Enter password "
              value=""
            />
          </div>
          <div className="type-input">
            <h4>Confirm Password</h4>
            <input
              className="input-content"
              id="input-password"
              type="password"
              name="password"
              placeholder="Enter password "
              value=""
            />
          </div>
        </div>
      </div>
    </div>
  );

  const handleBack = () => {
    setIsShowAdd(false);
    setAllValuesAdmin({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    });

    setAdminError({
      name: false,
      email: false,
      password: false,
      confirmPassword: false,
    });
  };
  const FormAddAccount = (
    <div className="form-add-account">
      <i onClick={handleBack} class="fa-regular fa-circle-left"></i>
      {dropValue === "admin"
        ? FormAccountAdmin
        : dropValue === "teacher"
        ? FormAccountTeacher
        : FormAccountParents}
      <button onClick={props.handleInputCustom} className="btn-cancel">
        Cancel
      </button>
      <button type="submit" onClick={clickSave} className="btn-ok">
        Save
      </button>
    </div>
  );

  return (
    <div className="add-account-form">
      {isShowAdd ? FormAddAccount : ChooseAccount}
    </div>
  );
};

export default AddAccount;
