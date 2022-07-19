const ROUTES = {
    HOME_PAGE: {
        // path: "/",
        // isPrivate: false,
        // component: Home,
        HOME_PATH: "/",
    },

    ADMIN_PAGE: {
        ADMIN_HOME: "/admin",
        ACCOUNT_ADMIN: "/admin/account",
        CLASS_ADMIN: "/admin/class",
        GRADE_ADMIN: "/admin/grade",
        SUBJECT_ADMIN: "/admin/subject",
        SCHEDULE_ADMIN: "/admin/schedule",
    },

    PARENTS_PAGE: {
        PARENTS_STUDENT_PATH: "/parents/student",
        PARENTS_PARENTS_PATH: "/parents/parents",
    },

    TEACHER_PAGE: {
        TEACHER_SCORE_PATH: "/teacher/score",
        TEACHER_CLASS_PATH: "/teacher/class",
        TEACHER_SCHEDULE_PATH: "/teacher/schedule",
        TEACHER_NOTIFICATION_PATH: "/teacher/notification",
    },

    NOT_FOUND_PAGE: {
        path: "*",
        // component: NotFound,
        // isPrivate: false,
    },
};

export default ROUTES;
