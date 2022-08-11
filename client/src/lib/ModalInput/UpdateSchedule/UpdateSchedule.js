import React, { useState, useEffect } from "react";
import "./UpdateSchedule.css";
import ClassService from "../../../config/service/ClassService";
import ScheduleService from "../../../config/service/ScheduleService";
import Logo from "../../../assets/image/Logo.png";

const UpdateSchedule = (props) => {
    const REACT_APP_API_ENDPOINT = process.env;
    const [classroom, setClassroom] = useState([]);
    const [classDropValue, setClassDropValue] = useState();
    const [allValuesSchedule, setAllValuesSchedule] = useState({
        classroom: "",
        grade: "",
        img: "",
    });
    const [scheduleError, setScheduleError] = useState({
        classroom: false,
        img: false,
    });
    const [avatar, setAvatar] = useState(Logo);

    useEffect(() => {
        ScheduleService.getScheduleById(props.scheduleID).then((res) => {
            !!res.schedule.schedule_link
                ? setAvatar(
                      `${REACT_APP_API_ENDPOINT}${res.schedule.schedule_link}`
                  )
                : setAvatar(Logo);
            setAllValuesSchedule({
                classroom: res.schedule.class.class_name,
                grade: res.schedule.class.grade_name,
            });
        });
    }, []);

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

    const handleUpdateSchedule = () => {
        let check = false;
        let img = false;
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
        });
        if (!check) {
            props.handleConfirmUpdateSchedule(allValuesSchedule);
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

    const clickUpdate = (e) => {
        e.preventDefault();
        handleUpdateSchedule();
    };

    const FormSchedule = (
        <div class="form-admin-content">
            <h2>
                Update schedule of class {allValuesSchedule.classroom} -
                {allValuesSchedule.grade}
            </h2>
            <div className="avatar-schedule">
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
        </div>
    );

    const FormUpdateSchedule = (
        <div className="form-add-account">
            {FormSchedule}
            <button onClick={props.handleInputCustom} className="btn-cancel">
                Cancel
            </button>
            <button type="submit" onClick={clickUpdate} className="btn-ok">
                Update
            </button>
        </div>
    );

    return <div className="add-account-form">{FormUpdateSchedule}</div>;
};

export default UpdateSchedule;
