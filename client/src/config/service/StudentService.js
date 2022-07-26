import HandleApi from "../api/HandleAPI";

const getStudents = async () => {
    return await HandleApi.APIGetWithToken("student/get-all-student/");
};

const addStudents = async (gradeID, teacherID, params) => {
    return await HandleApi.APIPostWithTokenIMG(
        `student/${gradeID}&${teacherID}`,
        params
    );
};

const deleteStudentById = async (id) => {
    return await HandleApi.APIDelete(`student/${id}`);
};

const getStudentById = async (id) => {
    return await HandleApi.APIGetWithToken(`student/${id}`);
};

const updateStudent = async (gradeID, teacherID, params) => {
    return await HandleApi.APIPutWithTokenIMG(
        `student/${gradeID}&${teacherID}`,
        params
    );
};

const StudentService = {
    getStudents,
    addStudents,
    deleteStudentById,
    getStudentById,
    updateStudent,
};

export default StudentService;
