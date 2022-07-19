import HandleApi from "../api/HandleAPI";

const getGrades = async () => {
    return await HandleApi.APIGetWithToken("grades");
};

const GradeService = {
    getGrades,
};

export default GradeService;
