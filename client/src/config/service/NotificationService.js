import HandleApi from "../api/HandleAPI";

const getNotifications = async () => {
    return await HandleApi.APIGetWithToken(`notification`);
};

const getNotificationsParents = async (id) => {
    return await HandleApi.APIGetWithToken(`notification/parent/${id}`);
};

const getNotificationsTeacher = async (id) => {
    return await HandleApi.APIGetWithToken(`notification/teacher/${id}`);
};


const NotificationService = {
  getNotificationsTeacher,
  getNotificationsParents,
  getNotifications,
};

export default NotificationService;