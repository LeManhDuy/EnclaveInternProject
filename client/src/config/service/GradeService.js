import HandleApi from "../api/HandleAPI";

const getGrades = async () => {
    return await HandleApi.APIGetWithToken("grades");
};

const deleteGradeById = async (id) => {
    return await HandleApi.APIDelete(`grades/${id}`);
};

const addGrade = async (params) => {
    return await HandleApi.APIPostWithToken("grades", params);
};

const getGradeById = async (id) => {
    return await HandleApi.APIGetWithToken(`grades/${id}`);
};

const updateGradeById = async (id, params) => {
    return await HandleApi.APIPutWithToken(`grades/${id}`, params);
};

const GradeService = {
    getGrades,
    deleteGradeById,
    addGrade,
    getGradeById,
    updateGradeById,
};

export default GradeService;
