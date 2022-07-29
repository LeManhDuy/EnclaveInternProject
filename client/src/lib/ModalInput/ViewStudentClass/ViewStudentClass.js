import React, { useEffect, useState } from "react";
import "./ViewStudentClass.css";
import ClassService from "../../../config/service/ClassService";

const ViewStudentClass = (props) => {
    const [student, setStudent] = useState([]);
    const [classValue, setClassValue] = useState({
        name: "",
        grade: "",
        teacher: "",
    });

    useEffect(() => {
        getStudents();
    }, []);

    const getStudents = () => {
        ClassService.getStudentByClassId(props.classID)
            .then((res) => {
                const dataSources = res.students.map((item, index) => {
                    return {
                        key: index + 1,
                        id: item.id,
                        name: item.student_fullname,
                        date: item.student_dateofbirth
                            .split("T")[0]
                            .replaceAll("-", "/"),
                        gender: item.student_gender,
                    };
                });
                setStudent(dataSources);
                setClassValue({
                    name: res.classroom.class_name,
                    grade: res.classroom.grade_name,
                    teacher: res.classroom.teacher_name,
                });
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const TableClasses = ({ students }) => {
        const classItem = students.map((item) => (
            <tr key={item.key}>
                <td>{item.name}</td>
                <td>{item.date}</td>
                <td>{item.gender ? "Male" : "Female"}</td>
                <td>{classValue.teacher}</td>
            </tr>
        ));

        let headerClass;
        if (!headerClass) {
            headerClass = (
                <tr>
                    <th>Name</th>
                    <th>DateOfBirth</th>
                    <th>Gender</th>
                    <th>Teacher</th>
                </tr>
            );
        }
        return (
            <table id="table">
                <thead>{headerClass}</thead>
                <tbody>{classItem}</tbody>
            </table>
        );
    };

    return (
        <div className="show-student-form">
            <header>
                <div>
                    <h3>
                        List Students Of Class {classValue.name} -{" "}
                        {classValue.grade}
                    </h3>
                </div>
            </header>
            <div className="table-content">
                <TableClasses students={student} />
            </div>
        </div>
    );
};

export default ViewStudentClass;
