import HandleApi from "../api/HandleAPI";

const getGrades = async () => {
    return await HandleApi.APIGetWithToken("grades");
};

const deleteGradeById = async (id) => {
    return await HandleApi.APIDelete(`grades/${id}`);
};

const GradeService = {
    getGrades,
    deleteGradeById,
};

export default GradeService;
