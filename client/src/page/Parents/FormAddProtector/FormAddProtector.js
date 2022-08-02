import React,{useState} from "react";
import "./FormAddProtector.css";

const FormAddProtector = (props) => {
  const [protector, setProtector] = useState({
    protector_name: "",
    protector_address: "",
    protector_phone: "",
    protector_relationship: "",
  });
  const [protectorError, setProtectorError] = useState({
    protector_name: false,
    protector_address: false,
    protector_phone: false,
    protector_relationship: false,
  });

  const handleAddProtector = () => {
    let protector_name = false;
    let protector_address = false;
    let protector_phone = false;
    let protector_relationship = false;
    let check = false;

    if (protector.protector_name.length > 30 || protector.protector_name.length < 2) {
      protector_name = true;
      check = true;
    } else protector_name = false;

    if (
      protector.protector_relationship.length > 30 ||
      protector.protector_relationship.length < 2
    ) {
      protector_relationship = true;
      check = true;
    } else protector_relationship = false;

    if (protector.protector_address.length > 150 || protector.protector_address.length < 2) {
      protector_address = true;
      check = true;
    } else protector_address = false;

    if (
      isNaN(parseInt(protector.protector_phone)) ||
      protector.protector_phone.length != 10
    ) {
      protector_phone = true;
      check = true;
    } else protector_phone = false;

    setProtectorError({
      protector_name: protector_name,
      protector_address: protector_address,
      protector_phone: protector_phone,
      protector_relationship: protector_relationship,
    });
    if (!check) {
      props.handleConfirmAddProtector(protector);
    }
  };

  const clickSave = (e) => {
    e.preventDefault();
    handleAddProtector();
  };

  const changeHandler = (e) => {
    setProtector({
      ...protector,
      [e.target.name]: e.target.value,
    });
    e.target.focus;
  };

  return (
    <div className="form-add-protector">
      <h2>Add Protector</h2>
      <div className="add-protector-content">
        <input
          value={protector.name}
          id="input-name"
          type="text"
          name="protector_name"
          placeholder="Name"
          onChange={changeHandler}
          required
        />
        <label
        className={
          "error" + (protectorError.protector_name ? " error-show" : " error-hidden")
        }
      >
        Name must be less than 30 chars long
      </label>
        <input
          id="input-email"
          type="text"
          name="protector_relationship"
          placeholder="Relationship"
          value={protector.protector_relationship}
          onChange={changeHandler}
        />
        <label
        className={
          "error" + (protectorError.protector_relationship ? " error-show" : " error-hidden")
        }
      >
        Relationship must be less than 30 chars long
      </label>
        <input
          value={protector.protector_phone}
          id="input-password"
          type="text"
          name="protector_phone"
          placeholder="Phone"
          onChange={changeHandler}
        />
        <label
        className={
          "error" + (protectorError.protector_phone ? " error-show" : " error-hidden")
        }
      >
        Phone must be 10 numeric characters
      </label>

        <input
          value={protector.protector_address}
          id="input-password-confirm"
          type="text"
          name="protector_address"
          placeholder="Address"
          onChange={changeHandler}
        />
        <label
        className={
          "error" +
          (protectorError.protector_address ? " error-show" : " error-hidden")
        }
      >
       Address must be less than 150 chars long
      </label>
      </div>
      <div className="add-btn-protector">
        <button onClick={props.handleInputCustom} className="btn-cancel">
          Cancel
        </button>
        <button type="submit" onClick={clickSave} className="btn-ok">
          Save
        </button>
      </div>
    </div>
  );
};

export default FormAddProtector;
