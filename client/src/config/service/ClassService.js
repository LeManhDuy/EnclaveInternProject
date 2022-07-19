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

const ClassService = {
    getClass,
    getGrades,
    getClassesByGradeId,
};

export default ClassService;
