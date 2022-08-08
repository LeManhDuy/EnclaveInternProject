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

const getTeacherByTeacherId = async (id) => {
  return await HandleApi.APIGetPublic(`admin/teachers/${id}`)
}

const TeacherService = {
  getSubjectAndScoreByStudentId,
  addScoreBySubjectIdAndStudentId,
  updateScoreByScoreId,
  getSummaryByStudentId,
  getTeacherByTeacherId

};

export default TeacherService;
