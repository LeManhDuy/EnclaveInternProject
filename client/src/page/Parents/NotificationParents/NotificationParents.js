import React, { useState, useEffect } from "react";
import "./NotificationParents.css";
import NotificationService from "../../../config/service/NotificationService";

const NotificationParents = () => {
  useEffect(() => {
    getNotifications();
  }, []);

  const [isPublic, setIsPublic] = useState(true);
  const [notifications, setNotifications] = useState([]);

  const getNotifications = () => {
    NotificationService.getNotifications()
      .then((response) => {
        const dataSources = response.notifications.map((item, index) => {
          return {
            key: index + 1,
            // id: item._id,
            title: item.title,
            content: item.content,
            date: item.date,
          };
        });
        dataSources.sort(function (a, b) {
          return new Date(b.date) - new Date(a.date);
        });
        setNotifications(dataSources);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const NotificationItem = ({ notifications }) =>
    notifications.map((item) => (
      <div className="notification-item" key={item.key}>
        <div className="notification-content">
          <div className="title-content">
            <p className="date">{new Date(item.date).toLocaleString()}</p>
            <p className="title">{item.title}</p>
          </div>
          <div className="description">
            <p>{item.content}</p>
          </div>
        </div>
      </div>
    ));

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
        </div>
        <div className="content-notification-teacher">
          {<NotificationItem notifications={notifications} />}
        </div>
      </div>
    </div>
  );
};

export default NotificationParents;
