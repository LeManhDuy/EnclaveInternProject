import React, { useEffect, useState } from "react";
import "./StudentParents.css";
import Logo from "../../../assets/image/Logo.png";
import ParentsService from "../../../config/service/ParentsService";
import NotFound from '../../../assets/image/404.png'
import ScheduleService from "../../../config/service/ScheduleService";

const StudentParents = () => {
  const { REACT_APP_API_ENDPOINT } = process.env;
  const [students, setStudents] = useState([]);

  useEffect(() => {
    getStudents();
  }, []);

  const getStudents = async () => {
    let dataSources = []
    await ParentsService.getStudentByParentsId(
      ParentsService.getInfoParents().parent._id
    )
      .then( async (response) => {
         dataSources = response.children.map((item, index) => {
          let studentIMG = "";
          if (!!item.student_image) {
            studentIMG = `${REACT_APP_API_ENDPOINT}${item.student_image}`;
          }
          else studentIMG=Logo
        
          return {
            key: index + 1,
            id: item._id,
            student_fullname: item.student_fullname,
            student_dateofbirth: new Date(item.student_dateofbirth).toLocaleDateString(),
            student_gender: item.student_gender,
            student_image: studentIMG,
            class_id: item.class_id
          };
        });
      })
      .catch((error) => {
        console.error(error);
      });
      let newData =[]
      for(let item of dataSources){
        await ScheduleService.getScheduleByClassId(item.class_id).then((res)=>{
          let object = {
            key: item.key,
            id: item._id,
            student_fullname: item.student_fullname,
            student_dateofbirth: new Date(item.student_dateofbirth).toLocaleDateString(),
            student_gender: item.student_gender,
            student_image: item.studentIMG,
            scheduleLink: (!!res.schedulelink[0])?`${REACT_APP_API_ENDPOINT}${res.schedulelink[0].schedule_link}`:NotFound
          }
          newData.push(object)
        }) 
      }
      setStudents(newData);
  };

  const StudentInfo = ({ students }) =>
    students.map((item) => (
      <div className="student-item">
        <div className="left-student-content">
          <img src={item.student_image} />
        </div>
        <div className="right-student-content">
          <div className="item-content">
            <i className="fas fa-child"></i>
            <div className="detail-item-content">
              <h4>Name</h4>
              <p>{item.student_fullname}</p>
            </div>
          </div>
          <div className="item-content">
            <i className="fa fa-calendar"></i>
            <div className="detail-item-content">
              <h4>Date of Birth</h4>
              <p>{item.student_dateofbirth}</p>
            </div>
          </div>
          <div className="item-content">
            <i className="fa fa-transgender"></i>
            <div className="detail-item-content">
              <h4>Gender</h4>
              <p>{(item.student_gender)?"Male":"Female"}</p>
            </div>
          </div>
        </div>
        <h3>Schedule</h3>
        <img className="schedule" src={item.scheduleLink}></img>
      </div>
    ));

  return (
    <div className="main-student-container">
      <div className="header-title">
        <h3>STUDENT INFORMATION</h3>
      </div>
      <div className="detail-content">
        <StudentInfo students={students}/>
      </div>
    </div>
  );
};

export default StudentParents;
