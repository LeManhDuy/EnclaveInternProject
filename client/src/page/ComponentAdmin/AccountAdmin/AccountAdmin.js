import React from "react";
import "./AccountAdmin.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faArrowLeftLong,
  faArrowRightLong,
} from "@fortawesome/free-solid-svg-icons";

function AccountAdmin() {
  return (
    <div className="main-container">
      <header>
        <h3>Account</h3>
        <div className="right-header">
          <button className="btn-account">Add account</button>
          <button className="btn-delete">Delete</button>
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
        <table>
          <thead>
            <tr>
              <th>User name</th>
              <th>Full name</th>
              <th>Role</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>huudinhnguyen001k@gmail.com</td>
              <td>Nguyen Huu Dinh</td>
              <td>Teacher</td>
              <td>...</td>
            </tr>
            <tr>
              <td>hoangnhattan@gmail.com</td>
              <td>Hoang Nhat Tan</td>
              <td>Parents</td>
              <td>...</td>
            </tr>
            <tr>
              <td>hoangnhattan@gmail.com</td>
              <td>Hoang Nhat Tan</td>
              <td>Parents</td>
              <td>...</td>
            </tr>
            <tr>
              <td>hoangnhattan@gmail.com</td>
              <td>Hoang Nhat Tan</td>
              <td>Parents</td>
              <td>...</td>
            </tr>
            <tr>
              <td>hoangnhattan@gmail.com</td>
              <td>Hoang Nhat Tan</td>
              <td>Parents</td>
              <td>...</td>
            </tr>
            <tr>
              <td>hoangnhattan@gmail.com</td>
              <td>Hoang Nhat Tan</td>
              <td>Parents</td>
              <td>...</td>
            </tr>
            <tr>
              <td>hoangnhattan@gmail.com</td>
              <td>Hoang Nhat Tan</td>
              <td>Parents</td>
              <td>...</td>
            </tr>
            <tr>
              <td>hoangnhattan@gmail.com</td>
              <td>Hoang Nhat Tan</td>
              <td>Parents</td>
              <td>...</td>
            </tr>
            <tr>
              <td>hoangnhattan@gmail.com</td>
              <td>Hoang Nhat Tan</td>
              <td>Parents</td>
              <td>...</td>
            </tr>
            <tr>
              <td>hoangnhattan@gmail.com</td>
              <td>Hoang Nhat Tan</td>
              <td>Parents</td>
              <td>...</td>
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

export default AccountAdmin;
