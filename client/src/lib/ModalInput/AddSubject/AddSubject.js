import React, { useState, useEffect } from "react";
import "./AddSubject.css";
import GradeService from "../../../config/service/GradeService";

const AddSubject = (props) => {
    const [grade, setGrade] = useState([]);
    const [gradeDropValue, setGradeDropValue] = useState();
    const [allValuesSubject, setAllValuesSubject] = useState({
        name: "",
        ratio: "",
        grade: "",
    });
    const [classError, setClassError] = useState({
        name: false,
        ratio: false,
    });

    useEffect(() => {
        getGrade();
    }, []);

    const GradeDropDown = ({ value, options, onChange }) => {
        return (
            <select
                className="dropdown-class"
                value={value}
                onChange={onChange}
            >
                <option key={10000} value="Pick" defaultChecked>
                    Choose grade
                </option>
                {options.map((option) => (
                    <option
                        key={option.key}
                        value={option.name}
                        data-key={option.id}
                    >
                        {option.name}
                    </option>
                ))}
            </select>
        );
    };

    const handleGradeChange = (event) => {
        setGradeDropValue(event.target.value);
        if (event.target.value !== "Pick") {
            setAllValuesSubject({
                ...allValuesSubject,
                grade: event.target.options[
                    event.target.selectedIndex
                ].getAttribute("data-key"),
            });
        }
    };

    const getGrade = () => {
        GradeService.getGrades()
            .then((response) => {
                const dataSources = response.allGrades.map((item, index) => {
                    return {
                        key: index + 1,
                        id: item._id,
                        name: item.grade_name,
                    };
                });
                setGrade(dataSources);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const handleAddSubject = () => {
        let check = false;
        let name = false;
        let ratio = false;
        let grade = false;
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
            grade: grade,
        });
        if (!check) {
            props.handleConfirmAddSubject(allValuesSubject);
        }
    };
    const clickSave = (e) => {
        e.preventDefault();
        handleAddSubject();
    };
    const changeHandler = (e) => {
        setAllValuesSubject({
            ...allValuesSubject,
            [e.target.name]: e.target.value,
        });
        e.target.focus;
    };

    const FormClass = (
        <div class="form-admin-content">
            <h2>Add subject</h2>
            <label
                className={
                    "error" +
                    (props.errorServer ? " error-show" : " error-hidden")
                }
            >
                Subject already exists
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
            <GradeDropDown
                value={gradeDropValue}
                options={grade}
                onChange={handleGradeChange}
                name="grade"
            />
        </div>
    );

    const FormAddSubject = (
        <div className="form-add-account">
            {FormClass}
            <button onClick={props.handleInputCustom} className="btn-cancel">
                Cancel
            </button>
            <button type="submit" onClick={clickSave} className="btn-ok">
                Save
            </button>
        </div>
    );

    return <div className="add-account-form">{FormAddSubject}</div>;
};

export default AddSubject;
