import React,{useEffect, useState} from "react";
import Schedule from "../../../assets/image/schedule.jpg";
import "./ScheduleTeacher.css";
import ScheduleService from "../../../config/service/ScheduleService";

const ScheduleTeacher = () => {
    const [schedule, setSchedule] = useState(Schedule)

    useEffect(()=>{
        getStudentByClassId();
    },[])
    const getStudentByClassId = () => {
        const { REACT_APP_API_ENDPOINT } = process.env;
        ScheduleService.getScheduleByClassId(
          JSON.parse(localStorage.getItem("@Login")).teacher.teacher_class
        )
          .then((response) => {
            setSchedule(`${REACT_APP_API_ENDPOINT}${response.schedulelink[0].schedule_link}`)
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
        </div>
    );
};

export default ScheduleTeacher;
