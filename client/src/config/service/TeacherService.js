import HandleApi from "../api/HandleAPI";

const getSubjectAndScoreByStudentId = async (id) => {
  return await HandleApi.APIGetWithToken(`teacher/score/get-by-student/${id}`)
}

const addScoreBySubjectIdAndStudentId = async (idSubject, idStudent, params) => {
  return await HandleApi.APIPostWithToken(`teacher/score/${idSubject}&${idStudent}`, params)
}

const updateScoreByScoreId = async (id, params) => {
  return await HandleApi.APIPutWithToken(`teacher/score/${id}`, params)
}

const getSummaryByStudentId = async (id) => {
  return await HandleApi.APIGetWithToken(`summary/${id}`)
}

const TeacherService = {
  getSubjectAndScoreByStudentId,
  addScoreBySubjectIdAndStudentId,
  updateScoreByScoreId,
  getSummaryByStudentId

};

export default TeacherService;
