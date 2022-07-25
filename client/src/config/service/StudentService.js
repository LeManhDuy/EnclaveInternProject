import HandleApi from "../api/HandleAPI";

const getStudents = async () => {
    return await HandleApi.APIGetWithToken("student/get-all-student/");
};

const StudentService = {
    getStudents,
};

export default StudentService;
