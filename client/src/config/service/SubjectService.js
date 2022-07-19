import HandleApi from "../api/HandleAPI";

const getSubjects = async () => {
    return await HandleApi.APIGetWithToken("subjects");
};

const getGrades = async () => {
    return await HandleApi.APIGetWithToken("grades");
};

const deleteSubjectsById = async (id) => {
    return await HandleApi.APIDelete(`subjects/${id}`);
};

const getSubjectsByGradeId = async (id) => {
    return await HandleApi.APIGetWithToken(`subjects/${id}`);
};

const SubjectService = {
    getSubjects,
    deleteSubjectsById,
    getSubjectsByGradeId,
    getGrades,
};

export default SubjectService;
