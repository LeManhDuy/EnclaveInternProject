import HandleApi from "../api/HandleAPI";

const getSubjectAndScoreByStudentId = async (id) => {
  return await HandleApi.APIGetWithToken(`teacher/score/get-by-student/${id}`)
}

const TeacherService = {
  getSubjectAndScoreByStudentId,

};

export default TeacherService;
