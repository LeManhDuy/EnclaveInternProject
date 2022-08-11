import React, { useEffect, useState } from "react";
import "./StudentParents.css";
import Logo from "../../../assets/image/Logo.png";
import ParentsService from "../../../config/service/ParentsService";
import NotFound from "../../../assets/image/404.png";
import ScheduleService from "../../../config/service/ScheduleService";
import TeacherInfo from "./TeacherInfo/TeacherInfo";
import Loading from "../../../lib/Loading/Loading";

const StudentParents = () => {
    const REACT_APP_API_ENDPOINT = "http://localhost:8000/";
    const [students, setStudents] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        getStudents();
    }, []);

    const getStudents = async () => {
        let dataSources = [];
        setIsLoading(true);
        await ParentsService.getStudentByParentsId(
            ParentsService.getInfoParents().parent._id
        )
            .then(async (response) => {
                console.log(response);
                dataSources = response.children.map((item, index) => {
                    let studentIMG = null;
                    if (!!item.student_image) {
                        studentIMG = `${REACT_APP_API_ENDPOINT}${item.student_image}`;
                    } else studentIMG = Logo;

                    return {
                        key: index + 1,
                        id: item._id,
                        student_fullname: item.student_fullname,
                        student_dateofbirth: new Date(
                            item.student_dateofbirth
                        ).toLocaleDateString(),
                        student_gender: item.student_gender,
                        student_image: studentIMG,
                        class_id: item.class_id._id,
                        class_name: item.class_id.class_name,
                        grade_name: item.class_id.grade_name,
                        teacher_id: item.class_id.teacher_id,
                    };
                });
            })
            .catch((error) => {
                console.error(error);
            });
        let newData = [];
        for (let item of dataSources) {
            await ScheduleService.getScheduleByClassId(item.class_id).then(
                (res) => {
                    let object = {
                        key: item.key,
                        id: item.id,
                        student_fullname: item.student_fullname,
                        student_dateofbirth: new Date(
                            item.student_dateofbirth
                        ).toLocaleDateString(),
                        student_gender: item.student_gender,
                        student_image: item.student_image,
                        class_name: item.class_name,
                        grade_name: item.grade_name,
                        teacher_id: item.teacher_id,
                        scheduleLink: !!res.schedulelink[0]
                            ? `${REACT_APP_API_ENDPOINT}${res.schedulelink[0].schedule_link}`
                            : NotFound,
                    };
                    newData.push(object);
                }
            );
        }
        setStudents(newData);
        setIsLoading(false);
    };

    const StudentInfo = ({ students }) =>
        students.map((item) => (
            <div className="student-item">
                <div className="left-student-content">
                    <img src={item.student_image} />
                </div>
                <div className="right-student-content">
                    <div className="student-info-parents">
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
                                <p>{item.student_gender ? "Male" : "Female"}</p>
                            </div>
                        </div>
                        <div className="item-content">
                            <i class="fa fa-solid fa-people-roof"></i>
                            <div className="detail-item-content">
                                <h4>Class</h4>
                                <p>{`${item.grade_name}-${item.class_name}`}</p>
                            </div>
                        </div>
                    </div>
                    <TeacherInfo id={item.teacher_id} />
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
                <StudentInfo students={students} />
            </div>
            <Loading isLoading={isLoading} />
        </div>
    );
};

export default StudentParents;
