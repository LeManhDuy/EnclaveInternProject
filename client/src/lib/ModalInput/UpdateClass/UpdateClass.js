import React, { useState, useEffect } from "react";
import "./UpdateClass.css";
import AccountService from "../../../config/service/AccountService";
import ClassService from "../../../config/service/ClassService";

const UpdateClass = (props) => {
    const [teacher, setTeacher] = useState([]);
    const [teacherDropValue, setTeacherDropValue] = useState();
    const [allValuesClass, setAllValuesClass] = useState({
        name: "",
        teacher: "",
        currentlyTeacher: "",
        currentlyTeacherName: "",
    });
    const [classError, setClassError] = useState({
        name: false,
    });

    useEffect(() => {
        getTeacher();
        ClassService.getClassById(props.classID).then((res) => {
            setAllValuesClass({
                name: res.class,
                teacher: res.teacher._id,
                currentlyTeacher: res.teacher._id,
                currentlyTeacherName: res.teacher.teacher_name,
            });
        });
    }, []);

    const TeacherDropDown = ({ value, options, onChange }) => {
        return (
            <select
                className="dropdown-class"
                value={value}
                onChange={onChange}
            >
                <option selected value="Pick">
                    Choose a teacher if you wanna change
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

    const handleTeacherChange = (event) => {
        setTeacherDropValue(event.target.value);
        console.log(
            event.target.options[event.target.selectedIndex].getAttribute(
                "data-key"
            )
        );
        if (event.target.value !== "Pick") {
            setAllValuesClass({
                ...allValuesClass,
                teacher:
                    event.target.options[
                        event.target.selectedIndex
                    ].getAttribute("data-key"),
            });
        } else {
            setAllValuesClass({
                ...allValuesClass,
                teacher: null,
            });
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

    const handleUpdateClass = () => {
        let check = false;
        let name = false;
        let teacher = false;
        if (allValuesClass.name.length > 30) {
            name = true;
            check = true;
        } else name = false;
        setClassError({
            name: name,
            teacher: teacher,
        });
        if (!check) {
            props.handleConfirmUpdateClass(allValuesClass);
        }
    };
    const clickUpdate = (e) => {
        e.preventDefault();
        handleUpdateClass();
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
            <h2>Update class</h2>
            <label
                className={
                    "error" +
                    (props.errorServer ? " error-show" : " error-hidden")
                }
            >
                Class already exists
            </label>
            <h4>Class Name</h4>
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
            <h4>Currently Teacher</h4>
            <input
                value={allValuesClass.currentlyTeacherName}
                id="input-name"
                type="text"
                readOnly
            />
            <h4>Change Teacher</h4>
            <TeacherDropDown
                value={teacherDropValue}
                options={teacher}
                onChange={handleTeacherChange}
                name="teacher"
            />
        </div>
    );

    const FormUpdateClass = (
        <div className="form-add-account">
            {FormClass}
            <button onClick={props.handleInputCustom} className="btn-cancel">
                Cancel
            </button>
            <button type="submit" onClick={clickUpdate} className="btn-ok">
                Update
            </button>
        </div>
    );

    return <div className="add-account-form">{FormUpdateClass}</div>;
};

export default UpdateClass;
