import React, { useState, useEffect } from "react";
import "./StudentAdmin.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faMagnifyingGlass,
    faArrowLeftLong,
    faArrowRightLong,
} from "@fortawesome/free-solid-svg-icons";
import GradeService from "../../../config/service/GradeService";
import StudentService from "../../../config/service/StudentService";
import ModalCustom from "../../../lib/ModalCustom/ModalCustom";
import ConfirmAlert from "../../../lib/ConfirmAlert/ConfirmAlert";
import ModalInput from "../../../lib/ModalInput/ModalInput";
import AddStudent from "../../../lib/ModalInput/AddStudent/AddStudent";
import UpdateStudent from "../../../lib/ModalInput/UpdateStudent/UpdateStudent";
import Loading from "../../../lib/Loading/Loading";

const StudentAdmin = () => {
    const [student, setStudent] = useState([]);
    const [isChange, setIsChange] = useState(false);
    const [isDelete, setIsDelete] = useState(false);
    const [name, setName] = useState("");
    const [id, setId] = useState("");
    const [keyword, setKeyword] = useState("");
    const [addState, setAddState] = useState(false);
    const [updateState, setUpdateState] = useState(false);
    const [errorServer, setErrorServer] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        getStudent();
    }, [isChange]);

    const getStudent = () => {
        setIsLoading(true)
        StudentService.getStudents()
            .then((response) => {
                const dataSources = response.StudentInformation.map(
                    (item, index) => {
                        return {
                            key: index + 1,
                            id: item._id,
                            name: item.student_fullname,
                            gender: item.student_gender,
                            image: item.student_image,
                            parent: item.parent_id ? item.parent_id.parent_name : "Don't have parents",
                            class: item.class_id.class_name,
                            teacher: item.class_id.teacher_name,
                            grade: item.class_id.grade_name,
                        };
                    }
                );
                setStudent(dataSources);
                setIsLoading(false)
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const TableStudent = ({ students }) => {
        const studentItem = students.map((item) => (
            <tr data-key={item.id} key={item.id}>
                <td>{item.name}</td>
                <td>{item.gender ? "Male" : "Female"}</td>
                <td>{`${item.grade}-${item.class}`}</td>
                <td>{item.parent}</td>
                <td>{item.teacher}</td>
                <td onClick={click}>
                    <i className="fa-regular fa-pen-to-square btn-edit"></i>
                    <i className="fa-regular fa-trash-can btn-delete"></i>
                </td>
            </tr>
        ));

        function click(e) {
            const id =
                e.target.parentElement.parentElement.getAttribute("data-key");
            if (e.target.className.includes("btn-delete")) {
                setIsDelete(true);
                setId(id);
                setName(
                    e.target.parentElement.parentElement.querySelectorAll(
                        "td"
                    )[0].textContent
                );
            } else if (e.target.className.includes("btn-edit")) {
                //TODO edited
                setUpdateState(true);
                setId(id);
            }
        }

        let headerStudent;
        if (!headerStudent) {
            headerStudent = (
                <tr>
                    <th>Name</th>
                    <th>Gender</th>
                    <th>Class</th>
                    <th>Parent</th>
                    <th>Teacher</th>
                    <th>Action</th>
                </tr>
            );
        }
        return (
            <table id="table">
                <thead className="table-head-row">{headerStudent}</thead>
                <tbody className="table-row">{studentItem}</tbody>
            </table>
        );
    };

    const handleCloseModalCustom = () => {
        setIsDelete(false);
    };

    const handleDelete = () => {
        StudentService.deleteStudentById(id).then((res) =>
            res.success ? setIsChange(!isChange) : null
        );
        setIsDelete(false);
    };

    const ConfirmDelete = (
        <ModalCustom
            show={isDelete}
            content={
                <ConfirmAlert
                    handleCloseModalCustom={handleCloseModalCustom}
                    handleDelete={handleDelete}
                    title={`Do you want to delete the ${name}?`}
                />
            }
            handleCloseModalCustom={handleCloseModalCustom}
        />
    );

    const handleInputCustom = () => {
        setAddState(false);
        setUpdateState(false);
        setErrorServer(false);
    };

    const handleConfirmAddStudent = (allValue) => {
        var formData = new FormData();
        formData.append("student_fullname", allValue.name);
        formData.append("student_dateofbirth", allValue.dateOfBirth);
        formData.append("student_gender", allValue.gender);
        formData.append("student_image", allValue.img);

        StudentService.addStudents(
            allValue.classroom,
            allValue.parent,
            formData
        ).then((res) => {
            if (res.success) {
                setIsChange(!isChange);
                setErrorServer(false);
                setAddState(false);
                setKeyword("");
            } else {
                console.log(res.message);
                setAddState(true);
                setErrorServer(true);
            }
        });
    };

    const handleConfirmUpdateStudent = (allValue) => {
        var formData = new FormData();
        formData.append("student_fullname", allValue.name);
        formData.append("student_dateofbirth", allValue.dateOfBirth);
        formData.append("student_gender", allValue.gender);
        formData.append("student_image", allValue.img);

        StudentService.updateStudent(
            id,
            allValue.parent,
            allValue.classroom,
            formData
        ).then((res) => {
            if (res.success) {
                setIsChange(!isChange);
                setUpdateState(false);
                setErrorServer(false);
                setKeyword("");
            } else {
                console.log(res.message);
                setUpdateState(true);
                setErrorServer(true);
            }
        });
    };

    const DivAddGrade = (
        <ModalInput
            show={addState}
            handleInputCustom={handleInputCustom}
            content={
                <AddStudent
                    handleInputCustom={handleInputCustom}
                    handleConfirmAddStudent={handleConfirmAddStudent}
                    errorServer={errorServer}
                />
            }
        />
    );

    const DivUpdateGrade = (
        <ModalInput
            show={updateState}
            handleInputCustom={handleInputCustom}
            content={
                <UpdateStudent
                    studentID={id}
                    handleInputCustom={handleInputCustom}
                    handleConfirmUpdateStudent={handleConfirmUpdateStudent}
                    errorServer={errorServer}
                />
            }
        />
    );

    const handleAddGrade = () => {
        setAddState(true);
    };

    const searchStudent = (students) => {
        return students.filter(
            (student) =>
                student.name.toLowerCase().includes(keyword.toLowerCase()) ||
                student.teacher.toLowerCase().includes(keyword.toLowerCase()) ||
                student.parent.toLowerCase().includes(keyword.toLowerCase())
        );
    };

    const handleChangeSearch = (e) => {
        setKeyword(e.target.value);
    };

    return (
        <div className="main-container">
            <header>
                <div>
                    <h3>Manage Student</h3>
                </div>
                <div className="right-header">
                    <button className="btn-account" onClick={handleAddGrade}>
                        Add Student
                    </button>
                    <div className="search-box">
                        <button className="btn-search">
                            <FontAwesomeIcon
                                className="icon-search"
                                icon={faMagnifyingGlass}
                            />
                        </button>
                        <input
                            onChange={handleChangeSearch}
                            className="input-search"
                            type="text"
                            placeholder="Search..."
                            value={keyword}
                        ></input>
                    </div>
                </div>
            </header>
            <div className="table-content">
                <TableStudent students={searchStudent(student)} />
            </div>
            <footer>
                {/* <hr></hr>
                <div className="paging">
                    <button className="previous">
                        <FontAwesomeIcon
                            className="icon icon-previous"
                            icon={faArrowLeftLong}
                        />
                        Previous
                    </button>
                    <div className="list-number">
                        <button>1</button>
                        <button>2</button>
                        <button>3</button>
                        <button>...</button>
                        <button>4</button>
                        <button>5</button>
                        <button>6</button>
                    </div>
                    <button className="next">
                        Next
                        <FontAwesomeIcon
                            className="icon icon-next"
                            icon={faArrowRightLong}
                        />
                    </button>
                </div> */}
                {isDelete ? ConfirmDelete : null}
                {addState ? DivAddGrade : null}
                {updateState ? DivUpdateGrade : null}
            </footer>
            <Loading isLoading={isLoading} />
        </div>
    );
};

export default StudentAdmin;
