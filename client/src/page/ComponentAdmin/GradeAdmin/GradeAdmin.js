import React, { useState, useEffect } from "react";
import "./GradeAdmin.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faMagnifyingGlass,
    faArrowLeftLong,
    faArrowRightLong,
} from "@fortawesome/free-solid-svg-icons";
import GradeService from "../../../config/service/GradeService";
import ModalCustom from "../../../lib/ModalCustom/ModalCustom";
import ConfirmAlert from "../../../lib/ConfirmAlert/ConfirmAlert";
import ModalInput from "../../../lib/ModalInput/ModalInput";
import AddGrade from "../../../lib/ModalInput/AddGrade/AddGrade";

const GradeAdmin = () => {
    const [grade, setGrade] = useState([]);
    const [isChange, setIsChange] = useState(false);
    const [isDelete, setIsDelete] = useState(false);
    const [name, setName] = useState("");
    const [id, setId] = useState("");
    const [addState, setAddState] = useState(false);

    useEffect(() => {
        getGrade();
    }, [isChange]);

    const getGrade = () => {
        GradeService.getGrades()
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

    const TableGrades = ({ grades }) => {
        const gradeItem = grades.map((item) => (
            <tr data-key={item.id} key={item.id}>
                <td>{item.name}</td>
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
            }
        }

        let headerSubject;
        if (!headerSubject) {
            headerSubject = (
                <tr>
                    <th>Name</th>
                    <th>Action</th>
                </tr>
            );
        }
        return (
            <table id="table">
                <thead className="table-head-row">{headerSubject}</thead>
                <tbody className="table-row">{gradeItem}</tbody>
            </table>
        );
    };

    const handleCloseModalCustom = () => {
        setIsDelete(false);
    };

    const handleDelete = () => {
        GradeService.deleteGradeById(id).then((res) =>
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
    };

    const handleConfirmAddGrade = (allValue) => {
        GradeService.addGrade({
            grade_name: allValue.name,
        }).then((res) => {
            res.success ? setIsChange(!isChange) : null;
        });
    };

    const DivAddGrade = (
        <ModalInput
            show={addState}
            handleInputCustom={handleInputCustom}
            content={
                <AddGrade
                    handleInputCustom={handleInputCustom}
                    handleConfirmAddAccount={handleConfirmAddGrade}
                />
            }
        />
    );

    const handleAddGrade = () => {
        setAddState(true);
    };

    return (
        <div className="main-container">
            <header>
                <div>
                    <h3>Manage Grade</h3>
                </div>
                <div className="right-header">
                    <button className="btn-account" onClick={handleAddGrade}>
                        Add Grade
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
                <TableGrades grades={grade} />
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
                {addState ? DivAddGrade : null}
            </footer>
        </div>
    );
};

export default GradeAdmin;
