import React from "react";
import "./Parents.css";
import Logo from "../../assets/image/Logo.png";

const Parents = () => {
  return (
    <div className="parents-info">
      <h3>PARENT INFORMATION</h3>
      <div className="parents-content">
        <div className="parents-item">
          <div className="image">
            <img src={Logo} />
          </div>
          <div className="detail-info">
            <div className="type parents-name">
              <i className="fas fa-child"></i>
              <div className="text">
                <p>Parents Name</p>
                <p>Le Ta Cao Nguyen</p>
              </div>
            </div>
            <div className="type parents-dateOfBirth">
            <i class="fa fa-solid fa-cake-candles"></i>
              <div className="text">
                <p>Date of birth</p>
                <p>11/11/1111</p>
              </div>
            </div>
            <div className="type parent-job">
              <i className="fa fa-suitcase" aria-hidden="true"></i>
              <div className="text">
                <p>Job</p>
                <p>Develope Engineer</p>
              </div>
            </div>
            <div className="type parents-phone">
              <i className="fa fa-phone"></i>
              <div className="text">
                <p>Phone Number</p>
                <p>0362789340</p>
              </div>
            </div>
            <div className="type parents-address">
              <i className="fa fa-solid fa-location-dot"></i>
              <div className="text">
                <p>Address</p>
                <p>54 Nguyen Luong bang</p>
              </div>
            </div>
            <div className="type parents-email">
            <i class="fa fa-solid fa-envelope"></i>
              <div className="text">
                <p>Email</p>
                <p>parents@gmail.com</p>
              </div>
            </div>
            <div className="type parents-gender">
            <i class="fa fa-solid fa-mars-and-venus"></i>
              <div className="text">
                <p>Gender</p>
                <p>Male</p>
              </div>
            </div>
          </div>
        </div>
        <div className="protector-item">
          <div className="image">
            <img src={Logo} />
          </div>
          <div className="detail-info">
            <div className="type protector-name">
              <i className="fas fa-child"></i>
              <div className="text">
                <p>Parents Name</p>
                <p>Le Ta Cao Nguyen</p>
              </div>
            </div>
            <div className="type protector-relationship">
              <i className="fa fa-suitcase" aria-hidden="true"></i>
              <div className="text">
                <p>Relationship</p>
                <p>Mother</p>
              </div>
            </div>
            <div className="type protector-phone">
              <i className="fa fa-phone"></i>
              <div className="text">
                <p>Phone Number</p>
                <p>0362789340</p>
              </div>
            </div>
            <div className="type protector-address">
              <i className="fa fa-solid fa-location-dot"></i>
              <div className="text">
                <p>Address</p>
                <p>54 Nguyen Luong bang</p>
              </div>
            </div>
          </div>
        </div>
        <div className="protector-item">
          <div className="image">
            <img src={Logo} />
          </div>
          <div className="detail-info">
            <div className="type protector-name">
              <i className="fas fa-child"></i>
              <div className="text">
                <p>Parents Name</p>
                <p>Le Ta Cao Nguyen</p>
              </div>
            </div>
            <div className="type protector-relationship">
              <i className="fa fa-suitcase" aria-hidden="true"></i>
              <div className="text">
                <p>Relationship</p>
                <p>Mother</p>
              </div>
            </div>
            <div className="type protector-phone">
              <i className="fa fa-phone"></i>
              <div className="text">
                <p>Phone Number</p>
                <p>0362789340</p>
              </div>
            </div>
            <div className="type protector-address">
              <i className="fa fa-solid fa-location-dot"></i>
              <div className="text">
                <p>Address</p>
                <p>54 Nguyen Luong bang</p>
              </div>
            </div>
          </div>
        </div>
        <div className="protector-item">
          <div className="image">
            <img src={Logo} />
          </div>
          <div className="detail-info">
            <div className="type protector-name">
              <i className="fas fa-child"></i>
              <div className="text">
                <p>Parents Name</p>
                <p>Le Ta Cao Nguyen</p>
              </div>
            </div>
            <div className="type protector-relationship">
              <i className="fa fa-suitcase" aria-hidden="true"></i>
              <div className="text">
                <p>Relationship</p>
                <p>Mother</p>
              </div>
            </div>
            <div className="type protector-phone">
              <i className="fa fa-phone"></i>
              <div className="text">
                <p>Phone Number</p>
                <p>0362789340</p>
              </div>
            </div>
            <div className="type protector-address">
              <i className="fa fa-solid fa-location-dot"></i>
              <div className="text">
                <p>Address</p>
                <p>54 Nguyen Luong bang</p>
              </div>
            </div>
          </div>
        </div>
        {/* <div class="right">
          <div class="image">
            <img src={Logo} />
          </div>
          <div class="detailinfor">
            <div class="detailinfor1">
              <i class="fas fa-child"></i>
              <div class="text">
                <h4>Mother's Name</h4>
                <p>Nguyen Thien Trang</p>
              </div>
            </div>
            <div class="detailinfor1">
              <i class="fa fa-suitcase" aria-hidden="true"></i>
              <div class="text">
                <h4>Career</h4>
                <p>Tailor</p>
              </div>
            </div>
            <div class="detailinfor1">
              <i class="fa fa-phone"></i>
              <div class="text">
                <h4>Phone Number</h4>
                <p>0362789341</p>
              </div>
            </div>
          </div>
        </div> */}
      </div>
      <div class="btn">
        <button class="btnAdd">
          <i class="fa fa-plus" aria-hidden="true"></i>
          Add Protector
        </button>
      </div>
      {/* <button class="btnChat">
            <i class="fa fa-comments"></i>
            
        </button> */}
    </div>
  );
};

export default Parents;
