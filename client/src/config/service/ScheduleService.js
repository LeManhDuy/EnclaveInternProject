import HandleApi from "../api/HandleAPI";

const getSchedules = async () => {
    return await HandleApi.APIGetWithToken("schedule");
};

const deleteScheduleById = async (id) => {
    return await HandleApi.APIDelete(`schedule/${id}`);
};

const addSchedule = async (classID, params) => {
    return await HandleApi.APIPostWithTokenIMG(`schedule/${classID}`, params);
};

const updateScheduleById = async (scheduleID, params) => {
    return await HandleApi.APIPutWithTokenIMG(`schedule/${scheduleID}`, params);
};

const getScheduleById = async (id) => {
    return await HandleApi.APIGetWithToken(`schedule/${id}`);
};

const ScheduleService = {
    getSchedules,
    deleteScheduleById,
    addSchedule,
    updateScheduleById,
    getScheduleById,
};

export default ScheduleService;
