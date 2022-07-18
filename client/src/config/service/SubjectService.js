import HandleApi from "../api/HandleAPI";

const getSubjects = async () => {
    return await HandleApi.APIGetWithToken("subjects");
};

const deleteSubjectsById = async (id) => {
    return await HandleApi.APIDelete(`subjects/${id}`);
};

const getSubjectsByGradeId = async () => {
    return await HandleApi.APIGetWithToken(`subjects/${id}`);
};

const SubjectService = {
    getSubjects,
    deleteSubjectsById,
    getSubjectsByGradeId,
};

export default SubjectService;
