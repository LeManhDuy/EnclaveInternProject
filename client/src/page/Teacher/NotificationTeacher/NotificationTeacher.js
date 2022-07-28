import React, { useState, useEffect } from "react";
import "./NotificationTeacher.css";
import NotificationService from "../../../config/service/NotificationService";
import ModalInput from "../../../lib/ModalInput/ModalInput";
import FormAddNotification from "./FormAddNotification/FormAddNotification";
import ModalCustom from "../../../lib/ModalCustom/ModalCustom";
import ConfirmAlert from '../../../lib/ConfirmAlert/ConfirmAlert'

const NotificationTeacher = () => {
  const [isPublic, setIsPublic] = useState(true);
  const [notifications, setNotifications] = useState([]);
  const [notificationsPrivate, setNotificationsPrivate] = useState([]);
  const [isUpdate, setIsUpdate] = useState(false);
  const [isCreate, setIsCreate] = useState(false);
  const [state, setState] = useState(false);
  const [id, setId] = useState("");
  const [isDelete, setIsDelete] = useState(false);
  const [errorService, setErrorServer] = useState("");

  useEffect(() => {
    getNotifications();
    getNotificationsTeacher();
  }, [state]);

  const getNotifications = () => {
    NotificationService.getNotifications()
      .then((response) => {
        const dataSources = response.notifications.map((item, index) => {
          return {
            key: index + 1,
            id: item.id,
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

  const getNotificationsTeacher = () => {
    NotificationService.getNotificationsTeacher(
      JSON.parse(localStorage.getItem("@Login")).teacher._id
    )
      .then((response) => {
        const dataSources = response.notifications.map((item, index) => {
          return {
            key: index + 1,
            id: item.id,
            title: item.title,
            content: item.content,
            date: item.date,
            parent: item.parent,
          };
        });
        dataSources.sort(function (a, b) {
          return new Date(b.date) - new Date(a.date);
        });
        setNotificationsPrivate(dataSources);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleChangeNotification = (e) => {
    const id = e.target.parentElement.parentElement.getAttribute("data-key");
    if (e.target.className.includes("btn-delete")) {
      setId(id);
      setIsDelete(true);
    } else if (e.target.className.includes("btn-edit")) {
      setId(id);
      setIsUpdate(true);
    }
  };

  const handleCloseModalCustom = () => {
    setIsDelete(false);
  };

  const handleDelete = () => {
    if (isPublic) {
      NotificationService.deleteNotificationPublic(id).then((res) => {
        if (res.success) {
          setState(!state);
          setIsDelete(false);
        }
      });
    } else if (!isPublic) {
      NotificationService.deleteNotificationPrivate(id).then((res) => {
        if (res.success) {
          setState(!state);
          setIsDelete(false);
        }
      });
    }
  };

  const ConfirmDelete = (
    <ModalCustom
      show={isDelete}
      content={
        <ConfirmAlert
          handleCloseModalCustom={handleCloseModalCustom}
          handleDelete={handleDelete}
          title={`Do you want to delete the ${name}?`}
        />
      }
      handleCloseModalCustom={handleCloseModalCustom}
    />
  );

  const handleCreateNotification = () => {
    setIsCreate(true);
  };

  const NotificationItem = ({ notifications }) =>
    notifications.map((item) => (
      <div className="notification-item" key={item.key} data-key={item.id}>
        <div className="notification-content">
          <div className="title-content">
            <p className="date">{new Date(item.date).toLocaleString()}</p>
            <p className="title">{item.title}</p>
          </div>
          <div className="description">
            <p>{item.content}</p>
          </div>
        </div>
        <div className="btn-function">
          <i
            onClick={handleChangeNotification}
            className="fa-regular fa-pen-to-square btn-edit"
          ></i>
          <i
            onClick={handleChangeNotification}
            className="fa-regular fa-trash-can btn-delete"
          ></i>
        </div>
      </div>
    ));

  const NotificationItemPrivate = ({ notificationsPrivate }) =>
    notificationsPrivate.map((item) => (
      <div className="notification-item" key={item.key} data-key={item.id}>
        <div className="notification-content">
          <p className="title">{item.parent}</p>
          <div className="title-content">
            <p className="date">{new Date(item.date).toLocaleString()}</p>
            <p className="title">{item.title}</p>
          </div>
          <div className="description">
            <p>{item.content}</p>
          </div>
        </div>
        <div className="btn-function">
          <i
            onClick={handleChangeNotification}
            className="fa-regular fa-pen-to-square btn-edit"
          ></i>
          <i
            onClick={handleChangeNotification}
            className="fa-regular fa-trash-can btn-delete"
          ></i>
        </div>
      </div>
    ));

  const handleInputCustom = () => {
    setIsCreate(false);
    setIsUpdate(false);
    setErrorServer(false);
  };

  const handleConfirmAddAccount = (Values, idParent) => {
    if (isCreate && isPublic) {
      NotificationService.addNotificationPublic({
        title: Values.title,
        content: Values.content,
      })
        .then((res) => {
          if (res.success) {
            setState(!state);
            setIsCreate(false);
            setErrorServer(false)
          } else {
            setIsCreate(true);
            setErrorServer(true)
          }
        })
        .catch((error) => console.log("error", error));
    } else if (isUpdate && isPublic) {
      NotificationService.updateNotificationPublic(
        {
          title: Values.title,
          content: Values.content,
        },
        id
      )
        .then((res) => {
          if (res.success) {
            setState(!state);
            setErrorServer(false)
            setIsUpdate(false);
          } else {
            setIsUpdate(true);
            setErrorServer(true)
          }
        })
        .catch((error) => console.log("error", error));
    } else if (isCreate && !isPublic) {
      NotificationService.addNotificationPrivate(
        {
          title: Values.title,
          content: Values.content,
        },
        JSON.parse(localStorage.getItem("@Login")).teacher._id,
        idParent
      )
        .then((res) => {
          if (res.success) {
            setState(!state);
            setErrorServer(false)
            setIsCreate(false);
          } else {
            setIsCreate(true);
            setErrorServer(true)
          }
        })
        .catch((error) => console.log("error", error));
    } else if (isUpdate && !isPublic) {
      NotificationService.updateNotificationPrivate(
        {
          title: Values.title,
          content: Values.content,
        },
        id
      )
        .then((res) => {
          if (res.success) {
            setState(!state);
            setIsUpdate(false);
          } else {
            setIsUpdate(true);
          }
        })
        .catch((error) => console.log("error", error));
    }
  };

  const DivAddNotification = (
    <ModalInput
      show={isCreate || isUpdate ? true : false}
      handleInputCustom={handleInputCustom}
      content={
        <FormAddNotification
          handleInputCustom={handleInputCustom}
          isCreate={isCreate}
          isUpdate={isUpdate}
          isPublic={isPublic}
          id={id}
          errorService = {errorService}
          handleConfirmAddAccount={handleConfirmAddAccount}
        />
      }
    />
  );

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
          <button onClick={handleCreateNotification} id="create-notification">
            Create
          </button>
        </div>
        <div className="content-notification-teacher">
          {isPublic ? (
            <NotificationItem notifications={notifications} />
          ) : (
            <NotificationItemPrivate
              notificationsPrivate={notificationsPrivate}
            />
          )}
        </div>
      </div>
      {isCreate || isUpdate ? DivAddNotification : null}
      {isDelete ? ConfirmDelete : null}
    </div>
  );
};

export default NotificationTeacher;
