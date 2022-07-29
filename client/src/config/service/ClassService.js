import HandleApi from "../api/HandleAPI";

const getClass = async () => {
    return await HandleApi.APIGetWithToken("teacher/class");
};

const getGrades = async () => {
    return await HandleApi.APIGetWithToken("grades");
};

const getClassesByGradeId = async (id) => {
    return await HandleApi.APIGetWithToken(`teacher/class/grade/${id}`);
};

const deleteClassById = async (id) => {
    return await HandleApi.APIDelete(`teacher/class/${id}`);
};

const addClass = async (gradeID, teacherID, params) => {
    return await HandleApi.APIPostWithToken(
        `teacher/class/${gradeID}&${teacherID}`,
        params
    );
};

const getClassById = async (id) => {
    return await HandleApi.APIGetWithToken(`teacher/class/${id}`);
};

const updateClassById = async (id, teacherID, params) => {
    return await HandleApi.APIPutWithToken(
        `teacher/class/${id}&${teacherID}`,
        params
    );
};

const ClassService = {
    getClass,
    getGrades,
    getClassesByGradeId,
    deleteClassById,
    addClass,
    getClassById,
    updateClassById,
};

export default ClassService;
