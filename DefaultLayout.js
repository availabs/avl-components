import React from 'react';


import { Route, Redirect, useLocation } from "react-router-dom";

import Layouts from './components/Layouts'
import LoadingPage from "./components/Loading/LoadingPage"
import withTheme from "./wrappers/with-theme"
import ComponentFactory from "./ComponentFactory"

import get from "lodash.get"


const DefaultLayout = withTheme(({ theme, component, path, exact, layoutSettings, isAuthenticating, ...props }) => {
  const location = useLocation(),
    Layout = get(Layouts, props.layout, Layouts["Sidebar"]);

  if (isAuthenticating) {
    return (
      <Layout { ...layoutSettings } { ...props } theme={ theme }>
        <Route path={ path } exact={ exact }>
          <div className="fixed top-0 left-0 w-screen h-screen z-50"
            style={ { backgroundColor: "rgba(0, 0, 0, 0.5)" } }>
            <LoadingPage />
          </div>
        </Route>
      </Layout>
    )
  }

  return sendToLogin(props) ?
    ( <Redirect
        to={ {
          pathname: "/auth/login",
          state: { from: get(location, "pathname") }
        } }/>
    ) : sendToHome(props) ? <Redirect to="/"/> :
    ( <Layout { ...layoutSettings } { ...props } theme={ theme }>
        <Route path={ path } exact={ exact }>
          <ComponentFactory config={ component }/>
        </Route>
      </Layout>
    )
})

function sendToLogin(props) {
  const requiresAuth = (props.authLevel !== undefined) || props.auth;
  return requiresAuth ? !get(props, ["user", "authed"], false) : false;
}
function sendToHome(props) {
  const requiredAuthLevel = props.authLevel !== undefined ? props.authLevel : props.auth ? 0 : -1;
  return get(props , ["user", "authLevel"], -1) < requiredAuthLevel;
}

export default DefaultLayout
