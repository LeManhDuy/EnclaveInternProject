import React from 'react'
import './ScoreParents.css'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faMagnifyingGlass,
    faArrowLeftLong,
    faArrowRightLong,
} from "@fortawesome/free-solid-svg-icons";

const ScoreParents = () => {
    return (
        <div className="main-container-edit">
            <header className="header-content">
                <div>
                    <h3>Manage Score</h3>
                </div>
                <div className="right-header">
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
                <table id="table">
                    <thead>
                    <tr>
                        <th className="th-content">Student's Name</th>
                        <th className="th-content">Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td className="td-content">Le Duy</td>
                        <td className="th-content">
                            <i className="fa-regular fa-eye btn-view"></i>
                        </td>
                    </tr>
                    <tr>
                        <td className="th-content">Hoang Tan</td>
                        <td className="th-content">
                            <i className="fa-regular fa-eye btn-view"></i>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>

            {/* Bang diem */}

            <div className="flex-container">
                <div >
                    <header className="header-content">
                        <h3>Full Name : Le Duy</h3>
                    </header>
                    <header className="header-content">
                        <h3>Class : 1A</h3>
                    </header>
                </div>
                <div className="table-content-edit">
                    <table id="table">
                        <thead>
                        <tr>
                            <th className="th-content">Average Score</th>
                            <th className="th-content">Perfomance</th>
                            <th className="th-content">Moral</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td className="th-content">7.5</td>
                            <td className="th-content">Excellent</td>
                            <td className="th-content">Good</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="table-content">
                <table id="table">
                    <thead>
                    <tr>
                        <th className="th-content">Subject's Name</th>
                        <th className="th-content" colSpan={3}>Factor 1</th>
                        <th className="th-content" colSpan={2}>Factor 2</th>
                        <th className="th-content">Factor 3</th>
                        <th className="th-content">Average</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td className="th-content">Math</td>
                        <td className="table-body-cell first">
                            <input className="table-content-cell" disabled={true} value={7}></input>
                        </td>
                        <td className="table-body-cell mid">
                            <input className="table-content-cell" disabled={true} value={8}></input>
                        </td>
                        <td className="table-body-cell last">
                            <input className="table-content-cell" disabled={true} value={9}></input>
                        </td>
                        <td className="table-body-cell first">
                            <input className="table-content-cell" disabled={true} value={5}></input>
                        </td>
                        <td className="table-body-cell last">
                            <input className="table-content-cell" disabled={true} value={7}></input>
                        </td>
                        <td className="table-body-cell mid">
                            <input className="table-content-cell" disabled={true} value={9}></input>
                        </td>
                        <td className="table-body-cell mid">
                            <input className="table-average-cell" disabled={true} value={7.5}></input>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
            <div className="btn-position">
                <button className="btn-back">
                    Back
                </button>
            </div>

            {/* Bang diem */}
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
    )
}

export default ScoreParents