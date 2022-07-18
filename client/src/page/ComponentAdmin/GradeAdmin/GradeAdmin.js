import React from 'react'
import './GradeAdmin.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faArrowLeftLong,
  faArrowRightLong,
} from "@fortawesome/free-solid-svg-icons";

const GradeAdmin = () => {
    return (
        <div className="main-container">
          <header>
            <div>
              <h3>Account</h3>
              {/* <Dropdown
                label="What do we eat?"
                options={options}
                value={dropValue}
                onChange={handleChange}
              /> */}
            </div>
            <div className="right-header">
              <button className="btn-account">Add account</button>
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
            <table id="table">
          <thead>
            <tr>
              <th>User name</th>
              <th>Full name</th>
              <th>Role</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr >
              <td>Dinh@gmail.com</td>
              <td>Nguyen Huu Dinh</td>
              <td>Admin</td>
              <td >
                <i className="fa-regular fa-pen-to-square btn-edit"></i>
                <i className="fa-regular fa-trash-can btn-delete"></i>
              </td>
            </tr>
            <tr >
              <td>Dinh@gmail.com</td>
              <td>Nguyen Huu Dinh</td>
              <td>Admin</td>
              <td >
                <i className="fa-regular fa-pen-to-square btn-edit"></i>
                <i className="fa-regular fa-trash-can btn-delete"></i>
              </td>
            </tr>
            <tr >
              <td>Dinh@gmail.com</td>
              <td>Nguyen Huu Dinh</td>
              <td>Admin</td>
              <td >
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

export default GradeAdmin;