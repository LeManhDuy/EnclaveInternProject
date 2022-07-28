import React, { useEffect, useState } from "react";
import "./UpdateGrade.css";
import GradeService from "../../../config/service/GradeService";

const UpdateGrade = (props) => {
    const [allValuesGrade, setAllValuesGrade] = useState({
        name: "",
    });
    const [gradeError, setGradeError] = useState({
        name: false,
    });

    useEffect(() => {
        GradeService.getGradeById(props.gradeID).then((res) =>
            setAllValuesGrade({
                name: res.grades.grade_name,
            })
        );
    }, []);

    const handleUpdateGrade = () => {
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
            props.handleConfirmUpdateGrade(allValuesGrade);
            props.handleInputCustom();
        }
    };

    const clickUpdate = (e) => {
        e.preventDefault();
        handleUpdateGrade();
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
            <h2>Update grade</h2>
            <label
                className={
                    "error" +
                    (props.errorServer ? " error-show" : " error-hidden")
                }
            >
                Grade already exists
            </label>
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

    const FormUpdateGrade = (
        <div className="form-add-account">
            {FormGrade}
            <button onClick={props.handleInputCustom} className="btn-cancel">
                Cancel
            </button>
            <button type="submit" onClick={clickUpdate} className="btn-ok">
                Update
            </button>
        </div>
    );

    return <div className="add-account-form">{FormUpdateGrade}</div>;
};

export default UpdateGrade;
