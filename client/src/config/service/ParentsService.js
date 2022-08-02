import HandleApi from "../api/HandleAPI";

const getInfoParents = () => {
  return JSON.parse(localStorage.getItem("@Login"))
}

const getProtectorByParentsId = async (id) => {
    return await HandleApi.APIGetWithToken(`protectors/get-protector/${id}`);
};

const createProtectorByParentsId = async (id, params) => {
  return await HandleApi.APIPostWithToken(`protectors/${id}`, params)
}

const getStudentByParentsId = async (id) => {
  return await HandleApi.APIGetWithToken(`student/get-student/${id}`)
}

const deleteProtectorByIdProtector = async (id) => {
  return await HandleApi.APIDelete(`protectors/${id}`)
}

const ParentsService = {
  getProtectorByParentsId,
  getInfoParents,
  createProtectorByParentsId,
  getStudentByParentsId,
  deleteProtectorByIdProtector, 

};

export default ParentsService;
