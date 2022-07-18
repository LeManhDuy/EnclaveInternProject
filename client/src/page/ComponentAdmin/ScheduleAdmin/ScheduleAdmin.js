import React from "react";
import "./ScheduleAdmin.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faMagnifyingGlass,
    faArrowLeftLong,
    faArrowRightLong,
} from "@fortawesome/free-solid-svg-icons";

const ScheduleAdmin = () => {
    return (
        <div className="main-container">
            <header>
                <div>
                    <h3>Schedule</h3>
                    {/* <Dropdown
              label="What do we eat?"
              options={options}
              value={dropValue}
              onChange={handleChange}
            /> */}
                </div>
                <div className="right-header">
                    <button className="btn-account">Add Schedule</button>
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
                {/* {dropValue === "parents" ? (
              <TableAccounts accounts={parents} value={dropValue} />
            ) : dropValue === "admin" ? (
              <TableAccounts accounts={admin} value={dropValue} />
            ) : (
              <TableAccounts accounts={teacher} value={dropValue} />
            )} */}
                <table id="table" >
                    <thead className='table-head-row'>
                    <tr >
                        <th >Schedule</th>
                        <th colSpan>Action</th>
                    </tr>
                    </thead>
                    <tbody className='table-row'>
                    <tr>
                        <td><a href={''}>1A</a></td>
                        <td>
                            <i className="fa-regular fa-pen-to-square btn-edit"></i>
                            <i className="fa-regular fa-trash-can btn-delete"></i>
                        </td>
                    </tr>
                    <tr>
                        <td><a href={''}>1B</a></td>
                        <td>
                            <i className="fa-regular fa-pen-to-square btn-edit"></i>
                            <i className="fa-regular fa-trash-can btn-delete"></i>
                        </td>
                    </tr>
                    <tr>
                        <td><a href={''}>1C</a></td>
                        <td>
                            <i className="fa-regular fa-pen-to-square btn-edit"></i>
                            <i className="fa-regular fa-trash-can btn-delete"></i>
                        </td>
                    </tr>
                    <tr>
                        <td><a href={''}>1D</a></td>
                        <td>
                            <i className="fa-regular fa-pen-to-square btn-edit"></i>
                            <i className="fa-regular fa-trash-can btn-delete"></i>
                        </td>
                    </tr>
                    <tr>
                        <td><a href={''}>1E</a></td>
                        <td>
                            <i className="fa-regular fa-pen-to-square btn-edit"></i>
                            <i className="fa-regular fa-trash-can btn-delete"></i>
                        </td>
                    </tr>
                    <tr>
                        <td><a href={''}>2A</a></td>
                        <td>
                            <i className="fa-regular fa-pen-to-square btn-edit"></i>
                            <i className="fa-regular fa-trash-can btn-delete"></i>
                        </td>
                    </tr>
                    <tr>
                        <td><a href={''}>2B</a></td>
                        <td>
                            <i className="fa-regular fa-pen-to-square btn-edit"></i>
                            <i className="fa-regular fa-trash-can btn-delete"></i>
                        </td>
                    </tr>
                    <tr>
                        <td><a href={''}>2C</a></td>
                        <td>
                            <i className="fa-regular fa-pen-to-square btn-edit"></i>
                            <i className="fa-regular fa-trash-can btn-delete"></i>
                        </td>
                    </tr>
                    <tr>
                        <td><a href={''}>2D</a></td>
                        <td>
                            <i className="fa-regular fa-pen-to-square btn-edit"></i>
                            <i className="fa-regular fa-trash-can btn-delete"></i>
                        </td>
                    </tr>
                    <tr>
                        <td><a href={''}>2E</a></td>
                        <td>
                            <i className="fa-regular fa-pen-to-square btn-edit"></i>
                            <i className="fa-regular fa-trash-can btn-delete"></i>
                        </td>
                    </tr>
                    <tr>
                        <td><a href={''}>3A</a></td>
                        <td>
                            <i className="fa-regular fa-pen-to-square btn-edit"></i>
                            <i className="fa-regular fa-trash-can btn-delete"></i>
                        </td>
                    </tr>
                    <tr>
                        <td><a href={''}>3B</a></td>
                        <td>
                            <i className="fa-regular fa-pen-to-square btn-edit"></i>
                            <i className="fa-regular fa-trash-can btn-delete"></i>
                        </td>
                    </tr>
                    <tr>
                        <td><a href={''}>3C</a></td>
                        <td>
                            <i className="fa-regular fa-pen-to-square btn-edit"></i>
                            <i className="fa-regular fa-trash-can btn-delete"></i>
                        </td>
                    </tr>
                    <tr>
                        <td><a href={''}>3D</a></td>
                        <td>
                            <i className="fa-regular fa-pen-to-square btn-edit"></i>
                            <i className="fa-regular fa-trash-can btn-delete"></i>
                        </td>
                    </tr>
                    <tr>
                        <td><a href={''}>3E</a></td>
                        <td>
                            <i className="fa-regular fa-pen-to-square btn-edit"></i>
                            <i className="fa-regular fa-trash-can btn-delete"></i>
                        </td>
                    </tr>
                    <tr>
                        <td><a href={''}>4A</a></td>
                        <td>
                            <i className="fa-regular fa-pen-to-square btn-edit"></i>
                            <i className="fa-regular fa-trash-can btn-delete"></i>
                        </td>
                    </tr>
                    <tr>
                        <td><a href={''}>4B</a></td>
                        <td>
                            <i className="fa-regular fa-pen-to-square btn-edit"></i>
                            <i className="fa-regular fa-trash-can btn-delete"></i>
                        </td>
                    </tr>
                    <tr>
                        <td><a href={''}>4C</a></td>
                        <td>
                            <i className="fa-regular fa-pen-to-square btn-edit"></i>
                            <i className="fa-regular fa-trash-can btn-delete"></i>
                        </td>
                    </tr>
                    <tr>
                        <td><a href={''}>4D</a></td>
                        <td>
                            <i className="fa-regular fa-pen-to-square btn-edit"></i>
                            <i className="fa-regular fa-trash-can btn-delete"></i>
                        </td>
                    </tr>
                    <tr>
                        <td><a href={''}>4E</a></td>
                        <td>
                            <i className="fa-regular fa-pen-to-square btn-edit"></i>
                            <i className="fa-regular fa-trash-can btn-delete"></i>
                        </td>
                    </tr>
                    <tr>
                        <td><a href={''}>5A</a></td>
                        <td>
                            <i className="fa-regular fa-pen-to-square btn-edit"></i>
                            <i className="fa-regular fa-trash-can btn-delete"></i>
                        </td>
                    </tr>
                    <tr>
                        <td><a href={''}>5B</a></td>
                        <td>
                            <i className="fa-regular fa-pen-to-square btn-edit"></i>
                            <i className="fa-regular fa-trash-can btn-delete"></i>
                        </td>
                    </tr>
                    <tr>
                        <td><a href={''}>5C</a></td>
                        <td>
                            <i className="fa-regular fa-pen-to-square btn-edit"></i>
                            <i className="fa-regular fa-trash-can btn-delete"></i>
                        </td>
                    </tr>
                    <tr>
                        <td><a href={''}>5D</a></td>
                        <td>
                            <i className="fa-regular fa-pen-to-square btn-edit"></i>
                            <i className="fa-regular fa-trash-can btn-delete"></i>
                        </td>
                    </tr>
                    <tr>
                        <td><a href={''}>5E</a></td>
                        <td>
                            <i className="fa-regular fa-pen-to-square btn-edit"></i>
                            <i className="fa-regular fa-trash-can btn-delete"></i>
                        </td>
                    </tr>
                    </tbody>
                </table>
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
            </footer>
        </div>
    );
}

export default ScheduleAdmin;
