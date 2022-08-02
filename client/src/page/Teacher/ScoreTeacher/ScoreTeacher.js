import React, { useEffect, useState } from "react";
import "./ScoreTeacher.css";
import StudentService from "../../../config/service/StudentService";
import SubjectService from "../../../config/service/SubjectService";

const ScoreTeacher = () => {
  const [students, setStudents] = useState([]);
  const [state, setState] = useState(false);

  useEffect(() => {
    getStudentByTeacherId();
    getScoreOfSubject();
  }, []);

  const getStudentByTeacherId = () => {
    StudentService.getStudentByTeacherId(
      JSON.parse(localStorage.getItem("@Login")).teacher._id
    )
      .then((response) => {
        var subjects=[]
        const dataSources = response.studentInformation.map((item, index) => {
          SubjectService.getSubjectByStudentId(item._id).then((res)=>{
            subjects = res.subjects
            console.log(res.subjects)
          })
          return {
            key: index + 1,
            id: item._id,
            student_name: item.student_fullname,
            subjects: subjects
          };
        });
        console.log(dataSources);
        setStudents(dataSources);
      })
      .catch((error) => console.log("error", error));
  };

  const getScoreOfSubject = () => {
    for(let id of students){
      console.log(id)
    }
  }
  return (
    <div className="main-container-edit">
      <h3 className="title">Manage Score</h3>
      <hr />
      <div className="student-score-item">
        <h3>Full Name : Le Manh Duy</h3>
        <div className="table-content">
          <table id="table">
            <thead>
              <tr>
                <th className="th-content">Subject's Name</th>
                <th className="th-content">Factor 1</th>
                <th className="th-content">Factor 2</th>
                <th className="th-content">Factor 3</th>
                <th className="th-content">Average</th>
                <th className="th-content">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="th-content">Math</td>
                <td className="th-content">
                  <input type="text" min="0" max="10"></input>
                </td>
                <td className="th-content">
                  <input type="text" min="0" max="10"></input>
                </td>
                <td className="th-content">
                  <input
                    type="text"
                    min="0"
                    max="10"
                    value=""
                    disabled={false}
                  ></input>
                </td>
                <td className="th-content">9.8</td>
                <td className="th-content">
                  {/* <i className="fa-regular fa-add btn-edit"></i> */}
                  <i className="fa-regular fa-pen-to-square btn-edit"></i>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="btn-position">
          <button className="btn-save">Save</button>
        </div>
      </div>

      {/* <div className="table-content-edit">
        <table id="table">
          <thead>
            <tr>
              <th className="th-content">Average Score</th>
              <th className="th-content">Perfomance</th>
              <th className="th-content">Moral</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="th-content">7.8</td>
              <td className="th-content">Excellent</td>
              <td className="th-content">Good</td>
            </tr>
          </tbody>
        </table>
      </div> */}
    </div>
  );
};

export default ScoreTeacher;
