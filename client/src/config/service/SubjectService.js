import HandleApi from "../api/HandleAPI";

const getGrades = async () => {
    return await HandleApi.APIGetWithToken("admin/parents");
};
