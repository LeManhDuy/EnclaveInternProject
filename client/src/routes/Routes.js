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
import Parents from "../page/Parents/Parents";
import Teacher from "../page/Teacher/Teacher";
import PublicRoute from "./PublicRoute";
import AdminRoute from "./AdminRoute/AdminRoute";
import ParentsRoute from "./ParentsRoute/ParentsRoute";
import TeacherRoute from "./TeacherRoute/TeacherRoute";

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

                    <ParentsRoute
                        component={Parents}
                        exact
                        path={ROUTES.PARENTS_PAGE.PARENTS_PATH}
                    />

                    <TeacherRoute
                        component={Teacher}
                        exact
                        path={ROUTES.TEACHER_PAGE.TEACHER_PATH}
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
