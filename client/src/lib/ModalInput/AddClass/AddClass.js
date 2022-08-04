import React, { useState, useEffect } from "react";
import "./AddClass.css";
import AccountService from "../../../config/service/AccountService";
import GradeService from "../../../config/service/GradeService";

const AddClass = (props) => {
    const [teacher, setTeacher] = useState([]);
    const [grade, setGrade] = useState([]);
    const [teacherDropValue, setTeacherDropValue] = useState();
    const [gradeDropValue, setGradeDropValue] = useState();
    const [allValuesClass, setAllValuesClass] = useState({
        name: "",
        teacher: "",
        grade: "",
    });
    const [classError, setClassError] = useState({
        name: false,
    });

    useEffect(() => {
        getTeacher();
        getGrade();
    }, []);

    const TeacherDropDown = ({ value, options, onChange }) => {
        return (
            <select
                className="dropdown-class-teacher"
                value={value}
                onChange={onChange}
            >
                <option key={10000} value="Pick">
                    Choose a main teacher
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

    const GradeDropDown = ({ value, options, onChange }) => {
        return (
            <select
                className="dropdown-class-teacher"
                value={value}
                onChange={onChange}
            >
                <option key={10000} value="Pick">
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
        console.log(event.target.value);
        if (event.target.value !== "Pick") {
            setAllValuesClass({
                ...allValuesClass,
                grade: event.target.options[
                    event.target.selectedIndex
                ].getAttribute("data-key"),
            });
            console.log(allValuesClass.grade);
        }
    };

    const handleTeacherChange = (event) => {
        setTeacherDropValue(event.target.value);
        console.log(event.target.value);
        if (event.target.value !== "Pick") {
            setAllValuesClass({
                ...allValuesClass,
                teacher:
                    event.target.options[
                        event.target.selectedIndex
                    ].getAttribute("data-key"),
            });
            console.log(allValuesClass.teacher);
        }
    };

    const getTeacher = () => {
        AccountService.getFreeTeacher()
            .then((response) => {
                const dataSources = response.allTeachers.map((item, index) => {
                    return {
                        key: index + 1,
                        id: item._id,
                        name: item.teacher_name,
                    };
                });
                setTeacher(dataSources);
            })
            .catch((error) => {
                console.log(error);
            });
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

    const handleAddClass = () => {
        let check = false;
        let name = false;
        let teacher = false;
        let grade = false;
        if (allValuesClass.name.length > 30) {
            name = true;
            check = true;
        } else name = false;
        setClassError({
            name: name,
            teacher: teacher,
            grade: grade,
        });
        if (!check) {
            props.handleConfirmAddClass(allValuesClass);
        }
    };
    const clickSave = (e) => {
        e.preventDefault();
        handleAddClass();
    };
    const changeHandler = (e) => {
        setAllValuesClass({
            ...allValuesClass,
            [e.target.name]: e.target.value,
        });
        e.target.focus;
    };

    const FormClass = (
        <div class="form-admin-content">
            <h2>Add class</h2>
            <label
                className={
                    "error" +
                    (props.errorServer ? " error-show" : " error-hidden")
                }
            >
                Class already exists
            </label>
            <input
                value={allValuesClass.name}
                id="input-name"
                type="text"
                name="name"
                placeholder="e.g: A, B, C, ..."
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
            <TeacherDropDown
                value={teacherDropValue}
                options={teacher}
                onChange={handleTeacherChange}
                name="teacher"
            />
            <GradeDropDown
                value={gradeDropValue}
                options={grade}
                onChange={handleGradeChange}
                name="grade"
            />
        </div>
    );

    const FormAddClass = (
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

    return <div className="add-account-form">{FormAddClass}</div>;
};

export default AddClass;
