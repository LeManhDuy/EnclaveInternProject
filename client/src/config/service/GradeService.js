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

const GradeService = {
    getGrades,
    deleteGradeById,
    addGrade,
};

export default GradeService;
