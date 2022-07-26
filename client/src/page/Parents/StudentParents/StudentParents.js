import React from 'react'
import './StudentsParents.css'
import Logo from '../../../assets/image/Logo.png'

const StudentParents = () => {
  return (
    <div className="main-student-container">
      <div className="header-title">
        <h1>STUDENT INFORMATION</h1>
      </div>
      <div className="detail-content">
        <div className="left-student-content">
          <img src={Logo} />
        </div>
        <div className="right-student-content">
          <div className="item-content">
            <i className="fas fa-child"></i>
            <div className="detail-item-content">
              <h4>Name</h4>
              <p>Hoang Nhat Tan</p>
            </div>
          </div>
          <div className="item-content">
            <i className="fa fa-calendar"></i>
            <div className="detail-item-content">
              <h4>Date of Birth</h4>
              <p>31/01/2001</p>
            </div>
          </div>
          <div className="item-content">
            <i className="fa fa-transgender"></i>
            <div className="detail-item-content">
              <h4>Gender</h4>
              <p>Female</p>
            </div>
          </div>
          <div className="item-content">
            <i className="fa fa-location-arrow"></i>
            <div className="detail-item-content">
              <h4>Address</h4>
              <p>214 Nguyen Phuoc Lan</p>
            </div>
          </div>
          <div className="item-content">
            <i className="fas fa-chalkboard-teacher"></i>
            <div className="detail-item-content">
              <h4>Teacher</h4>
              <p>Nguyen Huu Dinh</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default StudentParents