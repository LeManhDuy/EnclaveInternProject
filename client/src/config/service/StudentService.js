import HandleApi from "../api/HandleAPI";

const getStudents = async () => {
    return await HandleApi.APIGetWithToken("student/get-all-student/");
};

const addStudents = async (classID, parentID, params) => {
    return await HandleApi.APIPostWithTokenIMG(
        `student/${classID}&${parentID}`,
        params
    );
};

const deleteStudentById = async (id) => {
    return await HandleApi.APIDelete(`student/${id}`);
};

const getStudentById = async (id) => {
    return await HandleApi.APIGetWithToken(`student/get-student-by-id/${id}`);
};

const updateStudent = async (studentID, parentID, classID, params) => {
    return await HandleApi.APIPutWithTokenIMG(
        `student/${studentID}&${parentID}&${classID}`,
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
