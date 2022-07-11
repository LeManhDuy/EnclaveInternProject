import Home from "../page/Home/Home";
import Admin from "../page/Admin/Admin";
import Parents from "../page/Parents/Parents";
import NotFound from "../page/NotFound/NotFound";

const ROUTES = {
  HOME_PAGE: {
    path: "/",
    isPrivate: false,
    component: Home,
  },

  ADMIN_PAGE: {
    path: "/admin",
    PARENTS_PATH:"/admin/parents",
    isPrivate: true,
    component: Admin,
  },

  PARENTS_PAGE: {
    path: "/parents",
    isPrivate: true,
    component: Parents,
  },

  NOT_FOUND_PAGE: {
    path: "*",
    component: NotFound,
    isPrivate: false,
  },
};

export default ROUTES;