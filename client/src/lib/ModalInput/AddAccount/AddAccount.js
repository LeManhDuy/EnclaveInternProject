import React, { useState, useEffect } from "react";
import "./AddAccount.css";

const AddAccount = (props) => {
  const [dropValue, setDropValue] = useState("admin");

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
      <button className="btn-ok">Ok</button>
    </div>
  );

  const FormAddAccount = ({ title, content }) => {
    return (
      <div className="form-add-account">
        <h5>{title}</h5>
        {content}
        <button onClick={props.handleInputCustom} className="btn-cancel">
          Cancel
        </button>
        <button className="btn-ok">Save</button>
      </div>
    );
  };

  const FormAccountAdmin = <div>hhee</div>;

  return (
    <div className="add-account-form">
      {
        <FormAddAccount
          title={"Add account admin"}
          content={FormAccountAdmin}
        />
      }
    </div>
  );
};

export default AddAccount;
