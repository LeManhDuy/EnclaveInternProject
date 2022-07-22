import React, { useEffect, useState } from "react";
import "./ClassAdmin.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faMagnifyingGlass,
    faArrowLeftLong,
    faArrowRightLong,
} from "@fortawesome/free-solid-svg-icons";
import ClassService from "../../../config/service/ClassService";
import ModalCustom from "../../../lib/ModalCustom/ModalCustom";
import ConfirmAlert from "../../../lib/ConfirmAlert/ConfirmAlert";
import ModalInput from "../../../lib/ModalInput/ModalInput";
import AddClass from "../../../lib/ModalInput/AddClass/AddClass";

const ClassAdmin = () => {
    const [dropValue, setDropValue] = useState("All");
    const [state, setState] = useState(false);
    const [classroom, setClass] = useState([]);
    const [grade, setGrade] = useState([]);
    const [isDelete, setIsDelete] = useState(false);
    const [id, setId] = useState("");
    const [name, setName] = useState("");
    const [addState, setAddState] = useState(false);
    const [errorServer, setErrorServer] = useState(false);

    useEffect(() => {
        getClasses();
        getGrade();
    }, [state]);

    const Dropdown = ({ value, options, onChange }) => {
        return (
            <label>
                Type of class
                <select
                    className="dropdown-account"
                    value={value}
                    onChange={onChange}
                >
                    <option value="All">All</option>
                    {options.map((option) => (
                        <option key={option.key} value={option.name}>
                            {option.name}
                        </option>
                    ))}
                </select>
            </label>
        );
    };

    const getClasses = () => {
        ClassService.getClass()
            .then((response) => {
                const dataSources = response.allClasses.map((item, index) => {
                    return {
                        key: index + 1,
                        id: item._id,
                        name: item.class_name,
                        grade: item.grade_name,
                        teacher: item.teacher_name,
                    };
                });
                setClass(dataSources);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const getGrade = () => {
        ClassService.getGrades()
            .then((response) => {
                const dataSources = response.allGrades.map((item, index) => {
                    return {
                        key: index + 1,
                        id: item._id,
                        name: item.grade_name,
                    };
                });
                setGrade(dataSources);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const getClassByGradeId = (id) => {
        ClassService.getClassesByGradeId(id)
            .then((response) => {
                const dataSources = response.classes.map((item, index) => {
                    return {
                        key: index + 1,
                        id: item._id,
                        name: item.class_name,
                        grade: item.grade_name,
                        teacher: item.teacher_name,
                    };
                });
                if (dataSources.length > 0) {
                    setClass(dataSources);
                } else {
                    setClass([]);
                }
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const TableClasses = ({ classes, value }) => {
        const classItem = classes.map((item) => (
            <tr data-key={item.id} key={item.id}>
                <td>{item.name}</td>
                <td>{item.grade}</td>
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
                console.log(id);
                setId(id);
                setName(
                    e.target.parentElement.parentElement.querySelectorAll(
                        "td"
                    )[0].textContent +
                        " from " +
                        e.target.parentElement.parentElement.querySelectorAll(
                            "td"
                        )[1].textContent
                );
            } else if (e.target.className.includes("btn-edit")) {
                //TODO edited
            }
        }

        let headerClass;
        if (!value) {
            headerClass = (
                <tr>
                    <th>Name</th>
                    <th>Grade</th>
                    <th>Teacher</th>
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

    const handleCloseModalCustom = () => {
        setIsDelete(false);
    };

    const handleChange = (event) => {
        setDropValue(event.target.value);
        grade.map((item) => {
            if (event.target.value === item.name) {
                getClassByGradeId(item.id);
            } else if (event.target.value === "All") {
                getClasses();
            }
        });
    };

    const handleDelete = () => {
        ClassService.deleteClassById(id).then((res) =>
            res.success ? setState(!state) : null
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
                    title={`Do you want to delete class ${name}?`}
                />
            }
            handleCloseModalCustom={handleCloseModalCustom}
        />
    );

    const handleInputCustom = () => {
        setAddState(false);
        setErrorServer(false);
    };

    const handleConfirmAddClass = (allValue) => {
        ClassService.addClass(allValue.grade, allValue.teacher, {
            class_name: allValue.name,
        }).then((res) => {
            if (res.success) {
                setState(!state);
                setErrorServer(false);
                setAddState(false);
            } else {
                setErrorServer(true);
                setAddState(true);
            }
        });
    };

    const DivAddClass = (
        <ModalInput
            show={addState}
            handleInputCustom={handleInputCustom}
            content={
                <AddClass
                    handleInputCustom={handleInputCustom}
                    handleConfirmAddClass={handleConfirmAddClass}
                    errorServer={errorServer}
                />
            }
        />
    );

    const handleAddClass = () => {
        setAddState(true);
    };

    return (
        <div className="main-container">
            <header>
                <div>
                    <h3>Manage Class</h3>
                    <Dropdown
                        label="What do we eat?"
                        options={grade}
                        value={dropValue}
                        onChange={handleChange}
                    />
                </div>
                <div className="right-header">
                    <button className="btn-account" onClick={handleAddClass}>
                        Add class
                    </button>
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
                <TableClasses classes={classroom} />
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
                {isDelete ? ConfirmDelete : null}
                {addState ? DivAddClass : null}
            </footer>
        </div>
    );
};

export default ClassAdmin;
