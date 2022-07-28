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

const addSubject = async (id, params) => {
    return await HandleApi.APIPostWithToken(
        `subjects/create-subject/${id}`,
        params
    );
};

const SubjectService = {
    getSubjects,
    deleteSubjectsById,
    getSubjectsByGradeId,
    getGrades,
    addSubject,
};

export default SubjectService;
