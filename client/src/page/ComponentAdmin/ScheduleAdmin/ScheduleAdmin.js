import React, { useState, useEffect } from "react";
import "./ScheduleAdmin.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faMagnifyingGlass,
    faArrowLeftLong,
    faArrowRightLong,
} from "@fortawesome/free-solid-svg-icons";
import ScheduleService from "../../../config/service/ScheduleService";
import ClassService from "../../../config/service/ClassService";
import ModalCustom from "../../../lib/ModalCustom/ModalCustom";
import ConfirmAlert from "../../../lib/ConfirmAlert/ConfirmAlert";
import ModalInput from "../../../lib/ModalInput/ModalInput";
import AddSchedule from "../../../lib/ModalInput/AddSchedule/AddSchedule";
import UpdateSchedule from "../../../lib/ModalInput/UpdateSchedule/UpdateSchedule";

const ScheduleAdmin = () => {
    const { REACT_APP_API_ENDPOINT } = process.env;
    const [schedules, setSchedule] = useState([]);
    const [isChange, setIsChange] = useState(false);
    const [isDelete, setIsDelete] = useState(false);
    const [name, setName] = useState("");
    const [id, setId] = useState("");
    const [addState, setAddState] = useState(false);
    const [updateState, setUpdateState] = useState(false);
    const [errorServer, setErrorServer] = useState(false);

    useEffect(() => {
        getSchedule();
    }, []);

    const getSchedule = () => {
        ScheduleService.getSchedules()
            .then((res) => {
                const dataSources = res.schedulelink.map((item, index) => {
                    return {
                        key: index + 1,
                        id: item._id,
                        img: item.schedule_link,
                        class: item.class.class_name,
                        grade: item.class.grade_name,
                    };
                });
                setSchedule(dataSources);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const TableSchedules = ({ schedule }) => {
        const scheduleItem = schedule.map((item) => (
            <tr data-key={item.id} key={item.id}>
                <td>{item.class}</td>
                <td>{item.grade}</td>
                <td>
                    <img
                        className="schedule-img"
                        src={`${REACT_APP_API_ENDPOINT}${item.img}`}
                    ></img>
                </td>
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
                setUpdateState(true);
                setId(id);
            }
        }

        let headerSubject;
        if (!headerSubject) {
            headerSubject = (
                <tr>
                    <th>Class</th>
                    <th>Grade</th>
                    <th>Image</th>
                    <th>Action</th>
                </tr>
            );
        }
        return (
            <table id="table">
                <thead className="table-head-row">{headerSubject}</thead>
                <tbody className="table-row">{scheduleItem}</tbody>
            </table>
        );
    };

    const handleCloseModalCustom = () => {
        setIsDelete(false);
    };

    const handleDelete = () => {
        ScheduleService.deleteScheduleById(id).then((res) => {
            if (res.success) {
                setIsChange(!isChange);
                setErrorServer(false);
            } else {
                setErrorServer(true);
            }
        });
        setIsDelete(false);
    };

    const ConfirmDelete = (
        <ModalCustom
            show={isDelete}
            content={
                <ConfirmAlert
                    handleCloseModalCustom={handleCloseModalCustom}
                    handleDelete={handleDelete}
                    title={`Do you want to delete the schedule of class ${name}?`}
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

    const handleConfirmAddSchedule = (allValue) => {
        var formData = new FormData();
        if (!!allValue.img)
            formData.append("schedule_link", allValue.img, allValue.img.name);
        ScheduleService.addSchedule(allValue.classroom, formData)
            .then((res) => {
                if (res.success) {
                    setIsChange(!isChange);
                    setErrorServer(false);
                    setAddState(false);
                } else {
                    setErrorServer(true);
                    setAddState(true);
                }
            })
            .catch((error) => console.log("error", error));
    };

    const handleConfirmUpdateSchedule = (allValue) => {
        var formData = new FormData();
        if (!!allValue.img)
            formData.append("schedule_link", allValue.img, allValue.img.name);
        ScheduleService.updateScheduleById(id, formData).then((res) => {
            if (res.success) {
                setIsChange(!isChange);
                setErrorServer(false);
                setUpdateState(false);
            } else {
                setErrorServer(true);
                setUpdateState(true);
            }
        });
    };

    const DivAddSchedule = (
        <ModalInput
            show={addState}
            handleInputCustom={handleInputCustom}
            content={
                <AddSchedule
                    handleInputCustom={handleInputCustom}
                    handleConfirmAddSchedule={handleConfirmAddSchedule}
                    errorServer={errorServer}
                />
            }
        />
    );

    const DivUpdateSchedule = (
        <ModalInput
            show={updateState}
            handleInputCustom={handleInputCustom}
            content={
                <UpdateSchedule
                    scheduleID={id}
                    handleInputCustom={handleInputCustom}
                    handleConfirmUpdateSchedule={handleConfirmUpdateSchedule}
                    errorServer={errorServer}
                />
            }
        />
    );

    const handleAddSchedule = () => {
        setAddState(true);
    };

    return (
        <div className="main-container">
            <header>
                <div>
                    <h3>Schedule</h3>
                </div>
                <div className="right-header">
                    <button className="btn-account" onClick={handleAddSchedule}>
                        Add schedule
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
                <TableSchedules schedule={schedules} />
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
                {addState ? DivAddSchedule : null}
                {updateState ? DivUpdateSchedule : null}
            </footer>
        </div>
    );
};

export default ScheduleAdmin;
