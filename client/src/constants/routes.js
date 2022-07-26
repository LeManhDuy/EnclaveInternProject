const ROUTES = {
    HOME_PAGE: {
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
        PARENTS_SCORE_PATH: "/parents/score",
        PARENTS_NOTIFICATION_PATH: "/parents/notification",
    },

    TEACHER_PAGE: {
        TEACHER_SCORE_PATH: "/teacher/score",
        TEACHER_CLASS_PATH: "/teacher/class",
        TEACHER_SCHEDULE_PATH: "/teacher/schedule",
        TEACHER_NOTIFICATION_PATH: "/teacher/notification",
    },

    NOT_FOUND_PAGE: {
        path: "*",
    },
};

export default ROUTES;
