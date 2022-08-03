import React, { useEffect, useState } from "react";
import "./ScoreParents.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faArrowLeftLong,
  faArrowRightLong,
} from "@fortawesome/free-solid-svg-icons";
import TeacherService from "../../../config/service/TeacherService";
import StudentService from "../../../config/service/StudentService";
import ParentsService from "../../../config/service/ParentsService";

const ScoreParents = () => {
  const [students, setStudents] = useState([]);
  const [state, setState] = useState(false);

  useEffect(() => {
    getSubjectAndScoreByStudentId();
  }, [state]);

  const getSubjectAndScoreByStudentId = async () => {
    let studentsInfo = [];
    await ParentsService.getStudentByParentsId(
      ParentsService.getInfoParents().parent._id
    )
      .then(async (response) => {
        studentsInfo = response.children.map((item, index) => {
          return {
            key: index + 1,
            id: item._id,
            student_fullname: item.student_fullname,
            class_name: item.class_id.class_name,
            grade_name: item.class_id.grade_name,
          };
        });
      })
      .catch((error) => {
        console.error(error);
      });
    let dataNew = [];
    for (let item of studentsInfo) {
      await TeacherService.getSubjectAndScoreByStudentId(item.id).then(
        (res) => {
          let subject = {
            key: item.key,
            id: item.id,
            student_name: item.student_fullname,
            grade_name: item.grade_name,
            class_name: item.class_name,
            detail: res.detail,
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
      <div className="score-item-parent" data-key={item.id} key={item.id}>
        <div className="flex-container">
          <div className="score-parent">
            <header className="header-content">
              <h3>Full Name : {item.student_name}</h3>
            </header>
            <header className="header-content">
              <h3>Class : {`${item.grade_name}-${item.class_name}`}</h3>
            </header>
          </div>
          <div className="table-content-edit">
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
          </div>
        </div>

        <div className="table-content">
          <table id="table">
            <thead>
              <tr>
                <th className="th-content">Subject's Name</th>
                <th className="th-content" colSpan={3}>
                  Factor 1
                </th>
                <th className="th-content" colSpan={2}>
                  Factor 2
                </th>
                <th className="th-content">Factor 3</th>
                <th className="th-content">Average</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="th-content">Math</td>
                <td className="table-body-cell first">
                  <input
                    className="table-content-cell"
                    disabled={true}
                    value={7}
                  ></input>
                </td>
                <td className="table-body-cell mid">
                  <input
                    className="table-content-cell"
                    disabled={true}
                    value={8}
                  ></input>
                </td>
                <td className="table-body-cell last">
                  <input
                    className="table-content-cell"
                    disabled={true}
                    value={9}
                  ></input>
                </td>
                <td className="table-body-cell first">
                  <input
                    className="table-content-cell"
                    disabled={true}
                    value={5}
                  ></input>
                </td>
                <td className="table-body-cell last">
                  <input
                    className="table-content-cell"
                    disabled={true}
                    value={7}
                  ></input>
                </td>
                <td className="table-body-cell mid">
                  <input
                    className="table-content-cell"
                    disabled={true}
                    value={9}
                  ></input>
                </td>
                <td className="table-body-cell mid">
                  <input
                    className="table-average-cell"
                    disabled={true}
                    value={7.5}
                  ></input>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    ));

  return (
    <div className="main-container-edit">
      <div>
        <h3>Student Score</h3>
      </div>
      <TableAccounts students={students} />
    </div>
  );
};

export default ScoreParents;
