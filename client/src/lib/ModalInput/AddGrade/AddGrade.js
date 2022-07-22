import React, { useState } from "react";
import "./AddGrade.css";

const AddGrade = (props) => {
    const [allValuesGrade, setAllValuesGrade] = useState({
        name: "",
    });
    const [gradeError, setGradeError] = useState({
        name: false,
    });

    const handleAddGrade = () => {
        let check = false;
        let name = false;
        if (allValuesGrade.name.length > 30 || allValuesGrade.name.length < 2) {
            name = true;
            check = true;
        } else name = false;
        setGradeError({
            name: name,
        });
        if (!check) {
            props.handleConfirmAddGrade(allValuesGrade);
            props.handleInputCustom();
        }
    };
    const clickSave = (e) => {
        e.preventDefault();
        handleAddGrade();
    };
    const changeHandler = (e) => {
        setAllValuesGrade({
            ...allValuesGrade,
            [e.target.name]: e.target.value,
        });
        e.target.focus;
    };

    const FormGrade = (
        <div class="form-admin-content">
            <h2>Add grade</h2>
            <input
                value={allValuesGrade.name}
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
                    (gradeError.name ? " error-show" : " error-hidden")
                }
            >
                Name must be less than 30 chars long
            </label>
        </div>
    );

    const FormAddGrade = (
        <div className="form-add-account">
            {FormGrade}
            <button onClick={props.handleInputCustom} className="btn-cancel">
                Cancel
            </button>
            <button type="submit" onClick={clickSave} className="btn-ok">
                Save
            </button>
        </div>
    );

    return <div className="add-account-form">{FormAddGrade}</div>;
};

export default AddGrade;
