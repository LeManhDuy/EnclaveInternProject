import React from "react"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"

import ROUTES from "../constants/routes"
import MainLayout from "../layout/MainLayout"
// import ScrollToTop from "../hooks/ScrollToTop"
import PrivateRoute from "./PrivateRoute"

const Routes = () => {
  return (
    <Router>
      <MainLayout>
        <Switch>
          {Object.values(ROUTES).map((route, index) => {
            if (route.isPrivate) {
              return (
                <PrivateRoute
                  path={route.path}
                  exact
                  component={route.component}
                  key={index}
                />
              )
            }

            return (
              <Route
                path={route.path}
                exact
                component={route.component}
                key={index}
              />
            )
          })}
        </Switch>
      </MainLayout>
    </Router>
  )
}

export default Routes