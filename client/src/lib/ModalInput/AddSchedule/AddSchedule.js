import React, { useState, useEffect } from "react";
import "./AddSchedule.css";
import AccountService from "../../../config/service/AccountService";
import ClassService from "../../../config/service/ClassService";
import Logo from "../../../assets/image/Logo.png";

const AddSchedule = (props) => {
    const { REACT_APP_API_ENDPOINT } = process.env;
    const [classroom, setClassroom] = useState([]);
    const [classDropValue, setClassDropValue] = useState();
    const [allValuesSchedule, setAllValuesSchedule] = useState({
        classroom: "",
        img: "",
    });
    const [scheduleError, setScheduleError] = useState({
        classroom: false,
        img: false,
    });
    const [avatar, setAvatar] = useState(Logo);

    useEffect(() => {
        getClass();
    }, []);

    const getClass = () => {
        ClassService.getClass()
            .then((response) => {
                const dataSources = response.allClasses.map((item, index) => {
                    return {
                        key: index + 1,
                        id: item._id,
                        name: item.class_name,
                        grade: item.grade_name,
                    };
                });
                setClassroom(dataSources);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const ClassDropDown = ({ value, options, onChange }) => {
        return (
            <select
                className="dropdown-class"
                value={value}
                onChange={onChange}
            >
                <option selected value="Pick">
                    Choose a class
                </option>
                {options.map((option) => (
                    <option
                        key={option.key}
                        value={`${option.name} - ${option.grade}`}
                        data-key={option.id}
                    >
                        {option.name} - {option.grade}
                    </option>
                ))}
            </select>
        );
    };

    const handleClassChange = (event) => {
        setClassDropValue(event.target.value);
        console.log(
            event.target.options[event.target.selectedIndex].getAttribute(
                "data-key"
            )
        );
        if (event.target.value !== "Pick") {
            setAllValuesSchedule({
                ...allValuesSchedule,
                classroom:
                    event.target.options[
                        event.target.selectedIndex
                    ].getAttribute("data-key"),
            });
        } else {
            setAllValuesSchedule({
                ...allValuesSchedule,
                classroom: null,
            });
        }
    };

    const handleAddSchedule = () => {
        let check = false;
        let img = false;
        let classroom = false;
        if (!!allValuesSchedule.img) {
            let imgList = allValuesSchedule.img.name.split(".");
            if (
                imgList[imgList.length - 1] != "png" &&
                imgList[imgList.length - 1] != "jpg"
            ) {
                img = true;
                check = true;
            } else img = false;
        }
        setScheduleError({
            img: img,
            classroom: classroom,
        });
        if (!check) {
            props.handleConfirmAddSchedule(allValuesSchedule);
        }
    };

    const changeHandlerScheduleIMG = (e) => {
        setAllValuesSchedule({
            classroom: allValuesSchedule.classroom,
            img: e.target.files[0],
        });
        try {
            setAvatar(URL.createObjectURL(e.target.files[0]));
        } catch (err) {
            console.log(err);
        }
    };

    const clickSave = (e) => {
        e.preventDefault();
        handleAddSchedule();
    };

    const FormSchedule = (
        <div class="form-admin-content">
            <h2>Add schedule</h2>
            <div className="avatar-teacher">
                <img src={avatar} />
                <label className="choose-file" htmlFor="upload-photo">
                    Choose image
                </label>
                <input
                    id="upload-photo"
                    type="file"
                    name="img"
                    onChange={changeHandlerScheduleIMG}
                />
                <label
                    className={
                        "error" +
                        (scheduleError.img ? " error-show" : " error-hidden")
                    }
                >
                    The selected file is not valid
                </label>
            </div>
            <h4>Class Name</h4>
            <ClassDropDown
                value={classDropValue}
                options={classroom}
                onChange={handleClassChange}
                name="class"
            />
        </div>
    );

    const FormAddSchedule = (
        <div className="form-add-account">
            {FormSchedule}
            <button onClick={props.handleInputCustom} className="btn-cancel">
                Cancel
            </button>
            <button type="submit" onClick={clickSave} className="btn-ok">
                Save
            </button>
        </div>
    );

    return <div className="add-account-form">{FormAddSchedule}</div>;
};

export default AddSchedule;
