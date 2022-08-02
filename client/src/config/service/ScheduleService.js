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

const getScheduleByClassId = async (id) => {
    return await HandleApi.APIGetWithToken(
        `schedule/get-schedule-by-class-id/${id}`
    );
};

const getClassNoSchedule = async () => {
    return await HandleApi.APIPostWithToken(
        "teacher/class/get-class-dont-have-schedule/"
    );
};

const ScheduleService = {
    getSchedules,
    deleteScheduleById,
    addSchedule,
    updateScheduleById,
    getScheduleById,
    getScheduleByClassId,
    getClassNoSchedule,
};

export default ScheduleService;
