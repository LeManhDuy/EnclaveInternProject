import React, { useEffect, useState } from "react";
import "./AddSubjectToStudent.css";
import StudentService from "../../../config/service/StudentService";
import SubjectService from "../../../config/service/SubjectService";

const AddSubjectToStudent = (props) => {
    const [student, setStudent] = useState([]);
    const [listStudent, setListStudent] = useState([]);

    useEffect(() => {
        getStudent();
    }, []);

    const getStudent = () => {
        SubjectService.getStudentBySubject(props.subjectID)
            .then((response) => {
                const dataSources = response.getStudentDontHaveSubject.map(
                    (item, index) => {
                        return {
                            key: index + 1,
                            id: item._id,
                            name: item.student_fullname,
                            class: item.class_id.class_name,
                            teacher: item.class_id.teacher_name,
                            grade: item.class_id.grade_name,
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
                <td>{item.teacher}</td>
                <td>{item.class}</td>
                <td>{item.grade}</td>
                <td>
                    <input 
                        type="checkbox"
                        value={item.id}
                        onChange={handleChange}
                    ></input>
                </td>
            </tr>
        ));

        let headerClass;
        if (!headerClass) {
            headerClass = (
                <tr>
                    <th>Name</th>
                    <th>Teacher</th>
                    <th>Class</th>
                    <th>Grade</th>
                    <th>Action</th>
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

    const handleChange = (e) => {
        if (e.target.checked) {
            listStudent.push(e.target.value);
        } else {
            listStudent.splice(listStudent.indexOf(e.target.value), 1);
        }
    };

    const handleAddSubject = () => {
        props.handleConfirmAddSubjectToStudent(listStudent);
    };

    const clickAdd = (e) => {
        e.preventDefault();
        handleAddSubject();
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
            <button onClick={props.handleInputCustom} className="btn-cancel">
                Cancel
            </button>
            <button type="submit" onClick={clickAdd} className="btn-ok">
                Save
            </button>
        </div>
    );
};

export default AddSubjectToStudent;
