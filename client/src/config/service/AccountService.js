import HandleApi from "../api/HandleAPI";

const getAccountsParents = async () => {
    return await HandleApi.APIGetWithToken("admin/parents");
};

const getAccountsParentsById = async (id) => {
    return await HandleApi.APIGetWithToken(`admin/parents/${id}`);
};

const getAccountsAdmin = async () => {
    return await HandleApi.APIGetWithToken("admin");
};

const getAccountsAdminById = async (id) => {
    return await HandleApi.APIGetWithToken(`admin/${id}`);
};

const getAccountsTeacher = async () => {
    return await HandleApi.APIGetWithToken("admin/teachers");
};

const getFreeTeacher = async () => {
    return await HandleApi.APIGetWithToken("admin/teachers/get-teacher/");
};

const getAccountsTeacherById = async (id) => {
    return await HandleApi.APIGetWithToken(`admin/teachers/${id}`);
};

// const getAccountById = async (id) => {
//   return await HandleApi.APIGetWithToken(`accounts/${id}`)
// }

const deleteAccountParentsById = async (id) => {
    return await HandleApi.APIDelete(`admin/parents/${id}`);
};

const deleteAccountAdminById = async (id) => {
    return await HandleApi.APIDelete(`admin/${id}`);
};

const deleteAccountTeacherById = async (id) => {
    return await HandleApi.APIDelete(`admin/teachers/${id}`);
};

const addAccountAdmin = async (params) => {
    return await HandleApi.APIPostWithToken(`admin`, params);
};

const addAccountParents = async (params) => {
    return await HandleApi.APIPostWithTokenIMG(`admin/parents`, params);
};

const addAccountTeacher = async (params) => {
    return await HandleApi.APIPostWithTokenIMG(`admin/teachers`, params);
};

const updateAccountAdmin = async (params, id) => {
    return await HandleApi.APIPutWithToken(`admin/${id}`, params);
};

const updateAccountParents = async (params, id) => {
    return await HandleApi.APIPutWithTokenIMG(`admin/parents/${id}`, params);
};

const updateAccountTeacher = async (params, id) => {
    return await HandleApi.APIPutWithTokenIMG(`admin/teachers/${id}`, params);
};

// const updateProfile = async (params) => {
//   return await HandleApi.APIPutWithToken("accounts", params)
// }

const AccountService = {
    getAccountsParents,
    getAccountsAdmin,
    getAccountsTeacher,
    //  getAccountById,
    //   updateProfile,
    deleteAccountParentsById,
    deleteAccountAdminById,
    deleteAccountTeacherById,
    addAccountAdmin,
    addAccountParents,
    addAccountTeacher,
    getAccountsParentsById,
    getAccountsAdminById,
    getAccountsTeacherById,
    updateAccountAdmin,
    updateAccountParents,
    updateAccountTeacher,
    getFreeTeacher,
};

export default AccountService;
