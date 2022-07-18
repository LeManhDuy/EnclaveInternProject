import React, { useState, useEffect } from "react";
import "./SubjectAdmin.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faMagnifyingGlass,
    faArrowLeftLong,
    faArrowRightLong,
} from "@fortawesome/free-solid-svg-icons";
import SubjectService from "../../../config/service/SubjectService";
import ModalCustom from "../../../lib/ModalCustom/ModalCustom";
import ConfirmAlert from "../../../lib/ConfirmAlert/ConfirmAlert";

function SubjectAdmin() {
    const [subject, setSubject] = useState([]);
    const [dropValue, setDropValue] = useState("all");
    const [state, setState] = useState(false);
    const [isDelete, setIsDelete] = useState(false);
    const [id, setId] = useState("");
    const [name, setName] = useState("");

    useEffect(() => {
        getSubject();
    }, [dropValue, state]);

    const options = [
        { key: 0, label: "All", value: "all" },
        { key: 1, label: "Grade 1", value: "grade 1" },
        { key: 2, label: "Grade 2", value: "grade 2" },
        { key: 3, label: "Grade 3", value: "grade 3" },
        { key: 4, label: "Grade 4", value: "grade 4" },
        { key: 5, label: "Grade 5", value: "grade 5" },
    ];

    const Dropdown = ({ value, options, onChange }) => {
        return (
            <label>
                Choose grade
                <select
                    className="dropdown-account"
                    value={value}
                    onChange={onChange}
                >
                    {options.map((option) => (
                        <option key={option.key} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
            </label>
        );
    };

    const handleChange = (event) => {
        setDropValue(event.target.value);
        console.log(event.target.value);
    };

    const getSubject = () => {
        SubjectService.getSubjects()
            .then((response) => {
                const dataSources = response.allSubjects.map((item, index) => {
                    return {
                        key: index + 1,
                        id: item._id,
                        name: item.subject_name,
                        ratio: item.subject_ratio,
                        grade: item.grade_name,
                    };
                });
                setSubject(dataSources);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const getSubjectByGradeId = (id) => {
        SubjectService.getSubjectsByGradeId(id)
            .then((response) => {
                const dataSources = response.allSubjects.map((item, index) => {
                    return {
                        key: index + 1,
                        id: item._id,
                        name: item.subject_name,
                        ratio: item.subject_ratio,
                        grade: item.grade_name,
                    };
                });
                setSubject(dataSources);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const TableSubjects = ({ subjects, value }) => {
        const subjectItem = subjects.map((item) => (
            <tr data-key={item.id} key={item.id}>
                <td>{item.name}</td>
                <td>{item.ratio}</td>
                <td>{item.grade}</td>
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
                    )[0].textContent +
                        " from " +
                        e.target.parentElement.parentElement.querySelectorAll(
                            "td"
                        )[2].textContent
                );
            } else if (e.target.className.includes("btn-edit")) {
                //TODO edited
            }
        }

        let headerSubject;
        if (!value) {
            headerSubject = (
                <tr>
                    <th>Name</th>
                    <th>Ratio</th>
                    <th>Grade</th>
                    <th>Action</th>
                </tr>
            );
        }
        return (
            <table id="table">
                <thead>{headerSubject}</thead>
                <tbody>{subjectItem}</tbody>
            </table>
        );
    };

    const handleCloseModalCustom = () => {
        setIsDelete(false);
    };

    const handleDelete = () => {
        SubjectService.deleteSubjectsById(id).then((res) => res);
        setState(!state);
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

    return (
        <div className="main-container">
            <header>
                <div>
                    <h3>Manage Subject</h3>
                    <Dropdown
                        label="What do we eat?"
                        options={options}
                        value={dropValue}
                        onChange={handleChange}
                    />
                </div>
                <div className="right-header">
                    <button className="btn-account">Add subject</button>
                    <div className="search-box">
                        <button className="btn-search">
                            <FontAwesomeIcon
                                className="icon-search"
                                icon={faMagnifyingGlass}
                            />
                        </button>
                        <input
                            className="input-search"
                            type="text"
                            placeholder="Search..."
                        ></input>
                    </div>
                </div>
            </header>
            <div className="table-content">
                <TableSubjects subjects={subject} />
                {/* {dropValue === "parents" ? (
                    <TableAccounts accounts={parents} value={dropValue} />
                ) : dropValue === "admin" ? (
                    <TableAccounts accounts={admin} value={dropValue} />
                ) : (
                    <TableAccounts accounts={teacher} value={dropValue} />
                )} */}
            </div>
            <footer>
                <hr></hr>
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
                </div>
                <div> {isDelete ? ConfirmDelete : null} </div>
            </footer>
        </div>
    );
}

export default SubjectAdmin;
