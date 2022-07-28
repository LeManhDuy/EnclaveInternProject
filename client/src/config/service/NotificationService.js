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

const getNotificationsById = async (id) => {
    return await HandleApi.APIGetWithToken(`notification/${id}`);
};

const addNotificationPublic = async (params) => {
    return await HandleApi.APIPostWithToken(`notification`, params)
}

const addNotificationPrivate = async (params, idTeacher, idParent) => {
    return await HandleApi.APIPostWithToken(`notification/${idTeacher}&${idParent}`, params)
}

const updateNotificationPublic = async (params,id) => {
    return await HandleApi.APIPutWithToken(`notification/public/${id}`, params)
}

const updateNotificationPrivate = async (params,id) => {
    return await HandleApi.APIPutWithToken(`notification/private/${id}`, params)
}

const deleteNotificationPublic = async (id) => {
    return await HandleApi.APIDelete(`notification/public/${id}`)
}

const deleteNotificationPrivate = async (id) => {
    return await HandleApi.APIDelete(`notification/private/${id}`)
}

const NotificationService = {
  getNotificationsTeacher,
  getNotificationsParents,
  getNotifications,
  addNotificationPublic,
  getNotificationsById,
  updateNotificationPublic,
  addNotificationPrivate,
  updateNotificationPrivate,
  deleteNotificationPublic,
  deleteNotificationPrivate
};

export default NotificationService;