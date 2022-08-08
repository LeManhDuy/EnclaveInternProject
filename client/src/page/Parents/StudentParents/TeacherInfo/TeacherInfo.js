import React, { useEffect, useState } from "react";
import TeacherService from "../../../../config/service/TeacherService";

const TeacherInfo = (props) => {
  const [teacher, setTeacher] = useState("");
  useEffect(() => {
    getTeacher();
  }, []);

  const getTeacher = () => {
    TeacherService.getTeacherByTeacherId(props.id).then((res) => {
      setTeacher(res.teacher);
    });
  };
  return (
    <div className="teacher-info-parents">
      <div className="item-content">
        <i className="fa fas fa-solid fa-person-chalkboard"></i>
        <div className="detail-item-content">
          <h4>Teacher's Name</h4>
          <p>{teacher.teacher_name}</p>
        </div>
      </div>
      <div className="item-content">
        <i class="fa fas fa-solid fa-mobile"></i>
        <div className="detail-item-content">
          <h4>Teacher's Phone</h4>
          <p>{teacher.teacher_phone}</p>
        </div>
      </div>
    </div>
  );
};

export default TeacherInfo;
