import React, { useState, useEffect } from "react";
import "./UpdateSubject.css";
import SubjectService from "../../../config/service/SubjectService";

const UpdateSubject = (props) => {
    const [allValuesSubject, setAllValuesSubject] = useState({
        name: "",
        ratio: "",
    });
    const [classError, setClassError] = useState({
        name: false,
        ratio: false,
    });

    useEffect(() => {
        SubjectService.getSubjectById(props.subjectID).then((res) => {
            setAllValuesSubject({
                name: res.subject.subject_name,
                ratio: res.subject.subject_ratio,
            });
        });
    }, []);

    const handleUpdateSubject = () => {
        let check = false;
        let name = false;
        let ratio = false;
        if (allValuesSubject.name.length > 30) {
            name = true;
            check = true;
        } else name = false;
        if (allValuesSubject.ratio > 5) {
            ratio = true;
            check = true;
        } else ratio = false;
        setClassError({
            name: name,
            ratio: ratio,
        });
        if (!check) {
            props.handleConfirmUpdateSubject(allValuesSubject);
        }
    };
    const clickUpdate = (e) => {
        e.preventDefault();
        handleUpdateSubject();
    };
    const changeHandler = (e) => {
        setAllValuesSubject({
            ...allValuesSubject,
            [e.target.name]: e.target.value,
        });
        e.target.focus;
    };

    const FormSubject = (
        <div class="form-admin-content">
            <h2>Update subject</h2>
            <label
                className={
                    "error" +
                    (props.errorServer ? " error-show" : " error-hidden")
                }
            >
                Subject already exists in this grade.
            </label>
            <input
                value={allValuesSubject.name}
                id="input-name"
                type="text"
                name="name"
                placeholder="e.g: Math, English, ..."
                onChange={changeHandler}
                required
            />
            <label
                className={
                    "error" +
                    (classError.name ? " error-show" : " error-hidden")
                }
            >
                Name must be less than 30 chars long
            </label>
            <input
                value={allValuesSubject.ratio}
                id="input-ratio"
                type="number"
                min="1"
                max="5"
                name="ratio"
                placeholder="e.g: 1, 2,..."
                onChange={changeHandler}
                required
            />
            <label
                className={
                    "error" +
                    (classError.ratio ? " error-show" : " error-hidden")
                }
            >
                Ratio must be less than 5.
            </label>
        </div>
    );

    const FormUpdateSubject = (
        <div className="form-add-account">
            {FormSubject}
            <button onClick={props.handleInputCustom} className="btn-cancel">
                Cancel
            </button>
            <button type="submit" onClick={clickUpdate} className="btn-ok">
                Update
            </button>
        </div>
    );

    return <div className="add-account-form">{FormUpdateSubject}</div>;
};

export default UpdateSubject;
