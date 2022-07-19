import React, { useEffect, useState } from "react";
import "./ClassAdmin.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faArrowLeftLong,
  faArrowRightLong,
} from "@fortawesome/free-solid-svg-icons";



function ClassAdmin() {
  const [dropValue, setDropValue] = useState("admin");
  const [state, setState] = useState(false);
  useEffect(() => {

  }, [dropValue, state]);

  const options = [
    // { label: 'All', value: 'all' },
    { key: 1, label: "1", value: "1" },
    { key: 2, label: "2", value: "2" },
    { key: 3, label: "3", value: "3" },
    { key: 4, label: "4", value: "4" },
    { key: 5, label: "5", value: "5" },
  ];

  const Dropdown = ({ value, options, onChange }) => {
    return (
      <label>
        Type of class
        <select className="dropdown-account" value={value} onChange={onChange}>
          {options.map((option) => (
            <option
              key={option.key}
              value={option.value}>{option.label}</option>
          ))}
        </select>
      </label>
    );
  };

  const handleChange = (event) => {
    setDropValue(event.target.value);
  };

  return (
    <div className="main-container">
      <header>
        <div>
          <h3>Manage Class</h3>
          <Dropdown
            label="What do we eat?"
            options={options}
            value={dropValue}
            onChange={handleChange}
          />
        </div>
        <div className="right-header">
          <button className="btn-account">Add class</button>
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
              <th className="th-content">Class name</th>
              <th className="th-content">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr >
              <td className="td-content">1A</td>
              <td className="th-content">
                <i className="fa-regular fa-pen-to-square btn-edit"></i>
                <i className="fa-regular fa-trash-can btn-delete"></i>
              </td>
            </tr>
            <tr >
              <td className="th-content">2A</td>
              <td className="th-content">
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
};

export default ClassAdmin;
