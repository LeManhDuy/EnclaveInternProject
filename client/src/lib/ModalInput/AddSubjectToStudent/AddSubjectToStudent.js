import React, { useEffect, useState } from "react";
import "./AddSubjectToStudent.css";
import StudentService from "../../../config/service/StudentService";

const AddSubjectToStudent = (props) => {
    const [student, setStudent] = useState([]);
    const [listStudent, setListStudent] = useState([]);

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
                            class: item.class_id.class_name,
                            teacher: item.class_id.teacher_name,
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
            console.log(e.target.value);
            listStudent.push(e.target.value);
            // setListStudent((listStudent) => [...listStudent, e.target.value]);
        } else {
            listStudent.splice(listStudent.indexOf(e.target.value), 1);
            // studentArray.splice(studentArray.indexOf(e.target.value), 1);
        }
        console.log(listStudent);
        // setListStudent(studentArray);
        // if (e.currentTarget.checked) {
        //     console.log(e.target.value);
        //     setListStudent((listStudent) => [...listStudent, e.target.value]);
        // } else {
        //     setListStudent((listStudent) => [...listStudent, e.target.value]);
        // }
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
                Update
            </button>
        </div>
    );
};

export default AddSubjectToStudent;
