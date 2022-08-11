import React, { useEffect, useState } from "react";
import Schedule from "../../../assets/image/schedule.jpg";
import "./ScheduleTeacher.css";
import ScheduleService from "../../../config/service/ScheduleService";
import Loading from "../../../lib/Loading/Loading";

const ScheduleTeacher = () => {
    const [schedule, setSchedule] = useState(Schedule);
    const [isLoading, setIsLoading] = useState(false);
    const { REACT_APP_API_ENDPOINT } = "http://localhost:8000/";

    useEffect(() => {
        getStudentByClassId();
    }, []);
    const getStudentByClassId = () => {
        setIsLoading(true);
        ScheduleService.getScheduleByClassId(
            JSON.parse(localStorage.getItem("@Login")).teacher.teacher_class
        )
            .then((response) => {
                setSchedule(
                    `${REACT_APP_API_ENDPOINT}${response.schedulelink[0].schedule_link}`
                );
                setIsLoading(false);
            })
            .catch((error) => console.log("error", error));
    };

    return (
        <div>
            <div className="title-schedule">
                <h3>Class Schedule</h3>
            </div>
            <div className="schedule">
                <img src={schedule}></img>
            </div>
            <Loading isLoading={isLoading} />
        </div>
    );
};

export default ScheduleTeacher;
