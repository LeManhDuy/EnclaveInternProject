import Home from "../page/Home/Home";
import Admin from "../page/Admin/Admin";
import Parents from "../page/Parents/Parents";
import NotFound from "../page/NotFound/NotFound";
import Teacher from "../page/Teacher/Teacher";

const ROUTES = {
  HOME_PAGE: {
    // path: "/",
    // isPrivate: false,
    // component: Home,
    HOME_PATH: "/",
  },

  ADMIN_PAGE: {
    // path: "/admin",
    ADMIN_HOME: "/admin",
    ACCOUNT_ADMIN: "/admin/account",
    // isPrivate: true,
    // component: Admin,
  },

  PARENTS_PAGE: {
    // path: "/parents",
    // isPrivate: true,
    // component: Parents,
    PARENTS_PATH: "/parents"
  },

  TEACHER_PAGE: {
    // path: "/teacher",
    // isPrivate: true,
    // component: Teacher,
    TEACHER_PATH: "/teacher"
  },

  NOT_FOUND_PAGE: {
    path: "*",
    // component: NotFound,
    // isPrivate: false,
  },
};

export default ROUTES;