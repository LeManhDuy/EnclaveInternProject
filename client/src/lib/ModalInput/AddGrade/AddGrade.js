import React, { useState } from "react";
import "./AddGrade.css";

const AddGrade = (props) => {
    const [allValuesAdmin, setAllValuesAdmin] = useState({
        name: "",
    });
    const [adminError, setAdminError] = useState({
        name: false,
    });

    const handleAddAdminAccount = () => {
        let check = false;
        let name = false;
        if (allValuesAdmin.name.length > 30 || allValuesAdmin.name.length < 2) {
            name = true;
            check = true;
        } else name = false;
        setAdminError({
            name: name,
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
        setAllValuesAdmin({
            ...allValuesAdmin,
            [e.target.name]: e.target.value,
        });
        e.target.focus;
    };

    const FormAccountAdmin = (
        <div class="form-admin-content">
            <h2>Add grade</h2>
            <input
                value={allValuesAdmin.name}
                id="input-name"
                type="text"
                name="name"
                placeholder="e.g: Grade 1, Grade 2, ..."
                onChange={changeHandler}
                required
            />
            <label
                className={
                    "error" +
                    (adminError.name ? " error-show" : " error-hidden")
                }
            >
                Name must be less than 30 chars long
            </label>
        </div>
    );

    const FormAddAccount = (
        <div className="form-add-account">
            {FormAccountAdmin}
            <button onClick={props.handleInputCustom} className="btn-cancel">
                Cancel
            </button>
            <button type="submit" onClick={clickSave} className="btn-ok">
                Save
            </button>
        </div>
    );

    return <div className="add-account-form">{FormAddAccount}</div>;
};

export default AddGrade;
