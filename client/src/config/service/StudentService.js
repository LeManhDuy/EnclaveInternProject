import HandleApi from "../api/HandleAPI";

const getStudents = async () => {
    return await HandleApi.APIGetWithToken("student/get-all-student/");
};

const addStudents = async () => {};

const deleteStudentById = async () => {};

const StudentService = {
    getStudents,
    addStudents,
    deleteStudentById,
};

export default StudentService;
