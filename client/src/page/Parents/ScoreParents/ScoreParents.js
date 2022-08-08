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
                        teacher_name: item.class_id.teacher_name
                    };
                });
            })
            .catch((error) => {
                console.error(error);
            });
        let dataNew = [];
        for (let item of studentsInfo) {
            let summary = "";
            await TeacherService.getSummaryByStudentId(item.id).then((res) => {
                summary = res.summary;
            });
            await TeacherService.getSubjectAndScoreByStudentId(item.id).then(
                (res) => {
                    const detail = res.detail.map((item) => {
                        return {
                            subject: {
                                grade_id: item.subject.grade_id,
                                grade_name: item.subject.grade_name,
                                subject_name: item.subject.subject_name,
                                subject_ratio: item.subject.subject_ratio,
                                __v: item.subject.__v,
                                _id: item.subject._id,
                                score_id: {
                                    score_average: !!item.subject.score_id[0]
                                        ? item.subject.score_id[0].score_average
                                        : "",
                                    score_ratio1: !!item.subject.score_id[0]
                                        ? item.subject.score_id[0].score_ratio1
                                        : [],
                                    score_ratio2: !!item.subject.score_id[0]
                                        ? item.subject.score_id[0].score_ratio2
                                        : [],
                                    score_ratio3: !!item.subject.score_id[0]
                                        ? item.subject.score_id[0].score_ratio3
                                        : "",
                                    _id: !!item.subject.score_id[0]
                                        ? item.subject.score_id[0]._id
                                        : "",
                                },
                            },
                        };
                    });
                    let subject = {
                        key: item.key,
                        id: item.id,
                        student_name: item.student_fullname,
                        class_name: item.class_name,
                        grade_name: item.grade_name,
                        detail: detail,
                        summary: summary,
                        teacher_name: item.teacher_name
                    };
                    dataNew.push(subject);
                }
            );
        }
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
                            <h5>
                                Class :{" "}
                                {`${item.grade_name}-${item.class_name}`}
                            </h5>
                        </header>
                        <header className="header-content">
                            <h5>
                                Teacher's Name :{" "}
                                {`${item.teacher_name}`}
                            </h5>
                        </header>
                    </div>
                    <div className="table-content-edit">
                        <table id="table">
                            <thead>
                                <tr>
                                    <th className="th-content">
                                        Average Score
                                    </th>
                                    <th className="th-content">Perfomance</th>
                                </tr>
                            </thead>
                            <tbody>
                                {!!item.summary ? (
                                    <tr>
                                        <td className="th-content">
                                            {item.summary.summary_score}
                                        </td>
                                        <td className="th-content">
                                            {item.summary.summary_behavior}
                                        </td>
                                    </tr>
                                ) : (
                                    <tr>
                                        <td className="th-content">-</td>
                                        <td className="th-content">-</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="table-content">
                    <table id="table">
                        <thead>
                            <tr>
                                <th className="th-content">Subject's Name</th>
                                <th className="th-content">Factor 1</th>
                                <th className="th-content">Factor 2</th>
                                <th className="th-content">Factor 3</th>
                                <th className="th-content">Average</th>
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
                                              {item.subject.score_id.score_ratio1.toString() !=
                                              "" ? (
                                                  item.subject.score_id.score_ratio1
                                                      .toString()
                                                      .split(",")
                                                      .map((item) => (
                                                          <input
                                                              className="table-content-cell"
                                                              disabled={true}
                                                              value={item}
                                                          ></input>
                                                      ))
                                              ) : (
                                                  <input
                                                      className="table-content-cell"
                                                      disabled={true}
                                                      value={""}
                                                  ></input>
                                              )}
                                          </td>
                                          <td className="th-content">
                                              {item.subject.score_id.score_ratio2.toString() !=
                                              "" ? (
                                                  item.subject.score_id.score_ratio2
                                                      .toString()
                                                      .split(",")
                                                      .map((item) => (
                                                          <input
                                                              className="table-content-cell"
                                                              disabled={true}
                                                              value={item}
                                                          ></input>
                                                      ))
                                              ) : (
                                                  <input
                                                      className="table-content-cell"
                                                      disabled={true}
                                                      value=""
                                                  ></input>
                                              )}
                                          </td>
                                          <td className="table-body-cell mid">
                                              <input
                                                  className="table-content-cell"
                                                  disabled={true}
                                                  value={
                                                      item.subject.score_id
                                                          .score_ratio3
                                                  }
                                              ></input>
                                          </td>
                                          <td className="table-body-cell mid">
                                              <input
                                                  className="table-content-cell"
                                                  disabled={true}
                                                  value={
                                                      item.subject.score_id
                                                          .score_average
                                                  }
                                              ></input>
                                          </td>
                                      </tr>
                                  ))
                                : null}
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
