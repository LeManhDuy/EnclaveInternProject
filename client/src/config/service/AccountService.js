import HandleApi from "../api/HandleAPI";

const getAccountsParents = async () => {
  return await HandleApi.APIGetWithToken("admin/parents");
};

const getAccountsAdmin = async () => {
  return await HandleApi.APIGetWithToken("admin");
};

const getAccountsTeacher = async () => {
  return await HandleApi.APIGetWithToken("admin/teachers");
};

// const getAccountById = async (id) => {
//   return await HandleApi.APIGetWithToken(`accounts/${id}`)
// }

// const updateProfile = async (params) => {
//   return await HandleApi.APIPutWithToken("accounts", params)
// }

const AccountService = {
  getAccountsParents,
  getAccountsAdmin,
  getAccountsTeacher,
  //  getAccountById,
  //   updateProfile
};

export default AccountService;
