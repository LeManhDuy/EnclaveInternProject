import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import ROUTES from "../constants/routes";
import MainLayout from "../layout/MainLayout";
// import ScrollToTop from "../hooks/ScrollToTop"
// import PrivateRoute from "./PrivateRoute";
import Home from "../page/Home/Home";
import NotFound from "../page/NotFound/NotFound";
import HomeAdmin from "../page/ComponentAdmin/HomeAdmin/HomeAdmin";
import AccountAdmin from "../page/ComponentAdmin/AccountAdmin/AccountAdmin";
import ClassAdmin from "../page/ComponentAdmin/ClassAdmin/ClassAdmin";
import GradeAdmin from "../page/ComponentAdmin/GradeAdmin/GradeAdmin";
import SubjectAdmin from "../page/ComponentAdmin/SubjectAdmin/SubjectAdmin";
import ScheduleAdmin from "../page/ComponentAdmin/ScheduleAdmin/ScheduleAdmin";
import StudentAdmin from "../page/ComponentAdmin/StudentAdmin/StudentAdmin";
import PublicRoute from "./PublicRoute";
import AdminRoute from "./AdminRoute/AdminRoute";
import ParentsRoute from "./ParentsRoute/ParentsRoute";
import TeacherRoute from "./TeacherRoute/TeacherRoute";
import ScoreTeacher from "../page/Teacher/ScoreTeacher/ScoreTeacher";
import ClassTeacher from "../page/Teacher/ClassTeacher/ClassTeacher";
import ScheduleTeacher from "../page/Teacher/ScheduleTeacher/ScheduleTeacher";
import NotificationTeacher from "../page/Teacher/NotificationTeacher/NotificationTeacher";
import StudentParents from "../page/Parents/StudentParents/StudentParents";
import Parents from "../page/Parents/Parents";
import ScoreParents from "../page/Parents/ScoreParents/ScoreParents";
import NotificationParents from "../page/Parents/NotificationParents/NotificationParents";

const Routes = () => {
    return (
        <Router>
            <MainLayout>
                <Switch>
                    <PublicRoute
                        component={Home}
                        exact
                        path={ROUTES.HOME_PAGE.HOME_PATH}
                    />

                    <AdminRoute
                        component={HomeAdmin}
                        exact
                        path={ROUTES.ADMIN_PAGE.ADMIN_HOME}
                    />

                    <AdminRoute
                        component={AccountAdmin}
                        exact
                        path={ROUTES.ADMIN_PAGE.ACCOUNT_ADMIN}
                    />

                    <AdminRoute
                        component={ClassAdmin}
                        exact
                        path={ROUTES.ADMIN_PAGE.CLASS_ADMIN}
                    />

                    <AdminRoute
                        component={GradeAdmin}
                        exact
                        path={ROUTES.ADMIN_PAGE.GRADE_ADMIN}
                    />

                    <AdminRoute
                        component={SubjectAdmin}
                        exact
                        path={ROUTES.ADMIN_PAGE.SUBJECT_ADMIN}
                    />

                    <AdminRoute
                        component={ScheduleAdmin}
                        exact
                        path={ROUTES.ADMIN_PAGE.SCHEDULE_ADMIN}
                    />

                    <AdminRoute
                        component={StudentAdmin}
                        exact
                        path={ROUTES.ADMIN_PAGE.STUDENT_ADMIN}
                    />

                    {/* <ParentsRoute
                        component={Parents}
                        exact
                        path={ROUTES.PARENTS_PAGE.PARENTS_PATH}
                    /> */}

                    <TeacherRoute
                        component={ScoreTeacher}
                        exact
                        path={ROUTES.TEACHER_PAGE.TEACHER_SCORE_PATH}
                    />

                    <TeacherRoute
                        component={ClassTeacher}
                        exact
                        path={ROUTES.TEACHER_PAGE.TEACHER_CLASS_PATH}
                    />

                    <TeacherRoute
                        component={ScheduleTeacher}
                        exact
                        path={ROUTES.TEACHER_PAGE.TEACHER_SCHEDULE_PATH}
                    />

                    <TeacherRoute
                        component={NotificationTeacher}
                        exact
                        path={ROUTES.TEACHER_PAGE.TEACHER_NOTIFICATION_PATH}
                    />

                    <ParentsRoute
                        component={StudentParents}
                        exact
                        path={ROUTES.PARENTS_PAGE.PARENTS_STUDENT_PATH}
                    />

                    <ParentsRoute
                        component={Parents}
                        exact
                        path={ROUTES.PARENTS_PAGE.PARENTS_PARENTS_PATH}
                    />

                    <ParentsRoute
                        component={ScoreParents}
                        exact
                        path={ROUTES.PARENTS_PAGE.PARENTS_SCORE_PATH}
                    />

                    <ParentsRoute
                        component={NotificationParents}
                        exact
                        path={ROUTES.PARENTS_PAGE.PARENTS_NOTIFICATION_PATH}
                    />

                    <PublicRoute
                        component={NotFound}
                        path={ROUTES.NOT_FOUND_PAGE.path}
                    />
                </Switch>
            </MainLayout>
        </Router>
    );
};

export default Routes;
