import HandleApi from "../api/HandleAPI";

const getStudents = async () => {
    return await HandleApi.APIGetWithToken("teacher/class/teacher/62c68ad4bede5107633888f6");
};

const TeacherService = {
    getStudents
};

export default TeacherService;
