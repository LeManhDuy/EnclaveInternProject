import React from 'react'
import './ScoreTeacher.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faArrowLeftLong,
  faArrowRightLong,
} from "@fortawesome/free-solid-svg-icons";
const ScoreTeacher = () => {
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
            <tr >
              <td className="td-content">Nhat Tan</td>
              <td className="th-content">
                <i className="fa-regular fa-pen-to-square btn-edit"></i>
              </td>
            </tr>
            <tr >
              <td className="th-content">Huu Dinh</td>
              <td className="th-content">
                <i className="fa-regular fa-pen-to-square btn-edit"></i>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Bang diem */}
      <div>
        <header className="header-content">
          <h3>Full Name : Le Manh Duy</h3>
        </header>
        <header className="header-content">
          <h3>Class : 1A</h3>
        </header>
      </div>

      <div className="table-content">
        <table id="table">
          <thead>
            <tr>
              <th className="th-content">Subject's Name</th>
              <th className="th-content">Factor 1</th>
              <th className="th-content">Factor 2</th>
              <th className="th-content">Factor 3</th>
              <th className="th-content">Average</th>
              <th className="th-content">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr >
              <td className="th-content">Math</td>
              <td className="th-content"><input type="number" min="0" max="10"></input></td>
              <td className="th-content"><input type="number" min="0" max="10"></input></td>
              <td className="th-content"><input type="number" min="0" max="10"></input></td>
              <td className="th-content">9.8</td>
              <td className="th-content">
                <i className="fa-regular fa-add btn-edit"></i>
                <i className="fa-regular fa-pen-to-square btn-edit"></i>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="btn-position">
        <button className="btn-save">
          Save
        </button>
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
            <tr >
              <td className="th-content">7.8</td>
              <td className="th-content">Excellent</td>
              <td className="th-content">Good</td>
            </tr>
          </tbody>
        </table>
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

export default ScoreTeacher