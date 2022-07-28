import React from "react";
import Schedule from "../../../assets/image/schedule.jpg";
import "./ScheduleTeacher.css";

const ScheduleTeacher = () => {
    return (
        <div>
            <div className="title-schedule">
                <h3>Class Schedule</h3>
            </div>
            <div className="schedule">
                <img src={Schedule}></img>
            </div>
        </div>
    );
};

export default ScheduleTeacher;
