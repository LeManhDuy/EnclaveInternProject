import React, { useEffect, useState } from "react";
import "./AddSubjectToStudent.css";
import StudentService from "../../../config/service/StudentService";

const AddSubjectToStudent = () => {
    const [student, setStudent] = useState([]);

    useEffect(() => {
        getStudent();
    }, []);

    const getStudent = () => {
        StudentService.getStudents()
            .then((response) => {
                const dataSources = response.StudentInformation.map(
                    (item, index) => {
                        return {
                            key: index + 1,
                            id: item._id,
                            name: item.student_fullname,
                            gender: item.student_gender,
                            class: item.class_id.class_name,
                        };
                    }
                );
                setStudent(dataSources);
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
                <td>{item.class}</td>
            </tr>
        ));

        let headerClass;
        if (!headerClass) {
            headerClass = (
                <tr>
                    <th>Name</th>
                    <th>DateOfBirth</th>
                    <th>Gender</th>
                    <th>Class</th>
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
                    <h3>List Students</h3>
                </div>
            </header>
            <div className="table-content">
                <TableClasses students={student} />
            </div>
        </div>
    );
};

export default AddSubjectToStudent;
