import React, { useEffect, useState } from "react";
import "./ScoreTeacher.css";
import StudentService from "../../../config/service/StudentService";
import SubjectService from "../../../config/service/SubjectService";
import TeacherService from "../../../config/service/TeacherService";

const ScoreTeacher = () => {
  const [students, setStudents] = useState([]);
  const [state, setState] = useState(false);
  const [id, setId] = useState("")

  useEffect(() => {
    getSubjectAndScoreByStudentId();
    // getScoreOfSubject();
  }, [state]);

  const getSubjectAndScoreByStudentId = async () => {
    let dataSources = [];
    await StudentService.getStudentByTeacherId(
      JSON.parse(localStorage.getItem("@Login")).teacher._id
    )
      .then((response) => {
        dataSources = response.studentInformation.map((item, index) => {
          return {
            key: index + 1,
            id: item._id,
            student_name: item.student_fullname,
          };
        });
        setStudents(dataSources);
      })
      .catch((error) => console.log("error", error));

    let dataNew = [];
    for (let item of dataSources) {
      await TeacherService.getSubjectAndScoreByStudentId(item.id).then(
        (res) => {
          console.log(res)
          // console.log(res.detail, item.id)
          const detail = res.detail.map((item)=>{
            return{
              subject:{
                grade_id: item.subject.grade_id,
                grade_name: item.subject.grade_name,
                subject_name: item.subject.subject_name,
                subject_ratio: item.subject.subject_ratio,
                __v: item.subject.__v,
                _id: item.subject._id,
                score_id:{
                  score_average: (!!item.subject.score_id[0])?item.subject.score_id[0].score_average:"",
                  score_ratio1: (!!item.subject.score_id[0])?item.subject.score_id[0].score_ratio1:[],
                  score_ratio2: (!!item.subject.score_id[0])?item.subject.score_id[0].score_ratio2:[],
                  score_ratio3: (!!item.subject.score_id[0])?item.subject.score_id[0].score_ratio3: "",
                  _id: (!!item.subject.score_id[0])?item.subject.score_id[0]._id: "",

                }
              }
            }
          })
          let subject = {
            key: item.key,
            id: item.id,
            student_name: item.student_name,
            detail: detail,
          };
          dataNew.push(subject);
        }
      );
    }
    console.log(dataNew);
    setStudents(dataNew);
  };

  const TableAccounts = ({ students }) =>
    students.map((item) => (
      <div className="student-score-item" data-key={item.id} key={item.id}>
        <h3>Full Name : {item.student_name}</h3>
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
              {!!item.detail
                ? item.detail.map((item) => (
                    <tr>
                      <td className="th-content">
                        {item.subject.subject_name}
                      </td>
                      <td className="th-content">
                        <input
                          type="text"
                          min="0"
                          max="10"
                          value={
                            !!item.subject.score_id.score_ratio1
                              ? item.subject.score_id.score_ratio1
                                  .toString()
                                  .replace(",", "-")
                              : ""
                          }
                        ></input>
                      </td>
                      <td className="th-content">
                        <input
                          type="text"
                          min="0"
                          max="10"
                          value={
                            !!item.subject.score_id.score_ratio2
                              ? item.subject.score_id.score_ratio2
                                  .toString()
                                  .replace(",", "-")
                              : ""
                          }
                        ></input>
                      </td>
                      <td className="th-content">
                        <input
                          type="text"
                          min="0"
                          max="10"
                          value={
                            !!item.subject.score_id.score_ratio3
                              ? item.subject.score_id.score_ratio3
                              : ""
                          }
                          disabled={false}
                        ></input>
                      </td>
                      <td className="th-content">
                        {!!item.subject.score_id.score_average
                          ? item.subject.score_id.score_average
                          : ""}
                      </td>
                      <td className="th-content">
                        <i className="fa-regular fa-pen-to-square btn-edit"></i>
                      </td>
                    </tr>
                  ))
                : null}
            </tbody>
          </table>
        </div>
        <div className="btn-position">
          <button className="btn-save">Save</button>
        </div>
      </div>
    ));

  return (
    <div className="main-container-edit">
      <h3 className="title">Manage Score</h3>
      <hr />
      <TableAccounts students={students} />

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
