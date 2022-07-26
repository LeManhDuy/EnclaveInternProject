import React, { useState } from "react";
import "./NotificationTeacher.css";

const NotificationTeacher = () => {
  const [isPublic, setIsPublic] = useState(true);
  return (
    <div className="notification-teacher">
      {isPublic ? (
        <h2 className="public">Public notification</h2>
      ) : (
        <h2 className="private">Private notification</h2>
      )}
      <div
        className={"main-content-teacher" + (isPublic ? " public" : " private")}
      >
        <div className="header-notification-teacher">
          <div className="btn-lists">
            <button
              onClick={() => setIsPublic(true)}
              className={isPublic ? "btn-public-active" : "btn-public"}
            >
              Public notification
            </button>
            <button
              onClick={() => setIsPublic(false)}
              className={isPublic ? "btn-private" : "btn-private-active"}
            >
              Private notification
            </button>
          </div>
          <button className="create-notification">Create</button>
        </div>
        <div className="content-notification-teacher">
          <div className="notification-item">
            <div className="notification-content">
              <div className="title-content">
                <p className="date">19/02/2021:</p>
                <p className="title">
                  Thông báo về tổ chức đào tạo sau kì nghỉ lễ
                </p>
              </div>
              <div className="description">
                <p>Học sinh bắt đầu đi học lại vào ngày 21/02/2021.</p>
              </div>
            </div>
            <div className="btn-function">
              <i className="fa-regular fa-pen-to-square btn-edit"></i>
              <i className="fa-regular fa-trash-can btn-delete"></i>
            </div>
          </div>
          <div className="notification-item">
            <div className="notification-content">
              <div className="title-content">
                <p className="date">19/02/2021:</p>
                <p className="title">
                  Thông báo về tổ chức đào tạo sau kì nghỉ lễ
                </p>
              </div>
              <div className="description">
                <p>
                  Học sinh bắt đầu đi học lại vào ngày 21/02/2021. Học sinh bắt
                  đầu đi học lại vào ngày 21/02/2021. Học sinh bắt đầu đi học
                  lại vào ngày 21/02/2021.
                </p>
              </div>
            </div>
            <div className="btn-function">
              <i className="fa-regular fa-pen-to-square btn-edit"></i>
              <i className="fa-regular fa-trash-can btn-delete"></i>
            </div>
          </div>
          <div className="notification-item">
            <div className="notification-content">
              <div className="title-content">
                <p className="date">19/02/2021:</p>
                <p className="title">
                  Thông báo về tổ chức đào tạo sau kì nghỉ lễ
                </p>
              </div>
              <div className="description">
                <p>
                  - Sinh viên kiểm tra học phí nợ tại đây, Đến hết ngày
                  24/07/2022, nếu có thắc mắc về học phí sinh viên có thể liên
                  hệ số điện thoại: 0914.200.444 (gặp cô Tâm) hoặc số
                  0946.148.979, sinh viên chưa hoàn thành học phí sẽ bị hủy kết
                  quả đăng ký học và bị khóa tài khoản WEBSITE,
                </p>
              </div>
            </div>
            <div className="btn-function">
              <i className="fa-regular fa-pen-to-square btn-edit"></i>
              <i className="fa-regular fa-trash-can btn-delete"></i>
            </div>
          </div>
          <div className="notification-item">
            <div className="notification-content">
              <div className="title-content">
                <p className="date">19/02/2021:</p>
                <p className="title">
                  Thông báo về tổ chức đào tạo sau kì nghỉ lễ
                </p>
              </div>
              <div className="description">
                <p>
                  Học sinh bắt đầu đi học lại vào ngày 21/02/2021. Học sinh bắt
                  đầu đi học lại vào ngày 21/02/2021. Học sinh bắt đầu đi học
                  lại vào ngày 21/02/2021.
                </p>
              </div>
            </div>
            <div className="btn-function">
              <i className="fa-regular fa-pen-to-square btn-edit"></i>
              <i className="fa-regular fa-trash-can btn-delete"></i>
            </div>
          </div>
          <div className="notification-item">
            <div className="notification-content">
              <div className="title-content">
                <p className="date">19/02/2021:</p>
                <p className="title">
                  Thông báo về tổ chức đào tạo sau kì nghỉ lễ
                </p>
              </div>
              <div className="description">
                <p>
                  Học sinh bắt đầu đi học lại vào ngày 21/02/2021. Học sinh bắt
                  đầu đi học lại vào ngày 21/02/2021. Học sinh bắt đầu đi học
                  lại vào ngày 21/02/2021.
                </p>
              </div>
            </div>
            <div className="btn-function">
              <i className="fa-regular fa-pen-to-square btn-edit"></i>
              <i className="fa-regular fa-trash-can btn-delete"></i>
            </div>
          </div>
          <div className="notification-item">
            <div className="notification-content">
              <div className="title-content">
                <p className="date">19/02/2021:</p>
                <p className="title">
                  Thông báo về tổ chức đào tạo sau kì nghỉ lễ
                </p>
              </div>
              <div className="description">
                <p>
                  Học sinh bắt đầu đi học lại vào ngày 21/02/2021. Học sinh bắt
                  đầu đi học lại vào ngày 21/02/2021. Học sinh bắt đầu đi học
                  lại vào ngày 21/02/2021.
                </p>
              </div>
            </div>
            <div className="btn-function">
              <i className="fa-regular fa-pen-to-square btn-edit"></i>
              <i className="fa-regular fa-trash-can btn-delete"></i>
            </div>
          </div>
          <div className="notification-item">
            <div className="notification-content">
              <div className="title-content">
                <p className="date">19/02/2021:</p>
                <p className="title">
                  Thông báo về tổ chức đào tạo sau kì nghỉ lễ
                </p>
              </div>
              <div className="description">
                <p>
                  Học sinh bắt đầu đi học lại vào ngày 21/02/2021. Học sinh bắt
                  đầu đi học lại vào ngày 21/02/2021. Học sinh bắt đầu đi học
                  lại vào ngày 21/02/2021.
                </p>
              </div>
            </div>
            <div className="btn-function">
              <i className="fa-regular fa-pen-to-square btn-edit"></i>
              <i className="fa-regular fa-trash-can btn-delete"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationTeacher;
