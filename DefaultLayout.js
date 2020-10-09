import React from 'react';
import { Route, Redirect, useLocation } from "react-router-dom";
import Layouts from './components/Layouts'
import * as themes from './components/Themes'

import { ThemeContext } from "./wrappers/with-theme"

import ComponentFactory from "./ComponentFactory"

import LoadingPage from "./components/Loading/LoadingPage"

import get from "lodash.get"

const DefaultLayout = ({ component, path, exact, layoutSettings, ...props }) => {
  const Layout = get(Layouts, props.layout, Layouts["Sidebar"])
  const themeName = get(layoutSettings, "theme", "light")
  const theme = typeof themeName === 'string' ? get(themes, themeName, null) : themeName
  const location = useLocation();

  if (props.isAuthenticating && !props.user.authed) {
    return (
      <ThemeContext.Provider value={ theme }>
        <Layout { ...layoutSettings } { ...props } theme={ theme }>
          <Route path={ path } exact={ exact }>
            <div className="fixed top-0 left-0 w-screen h-screen z-50"
              style={ { backgroundColor: "rgba(0, 0, 0, 0.5)" } }>
              <LoadingPage />
            </div>
          </Route>
        </Layout>
      </ThemeContext.Provider>
    )
  }
  
  return sendToLogin(props) ?
    ( <Redirect
        to={ {
          pathname: "/auth/login",
          state: { from: get(location, "pathname") }
        } }/>
    ) : sendToHome(props) ? <Redirect to="/"/> :
    ( <ThemeContext.Provider value={ theme }>
        <Layout { ...layoutSettings } { ...props } theme={ theme }>
          <Route path={ path } exact={ exact }>
            <ComponentFactory config={ component }/>
          </Route>
        </Layout>
      </ThemeContext.Provider>
    )
}

function sendToLogin(props) {
  const requiresAuth = (props.authLevel !== undefined) || props.auth;
  return requiresAuth ? !get(props, ["user", "authed"], false) : false;
}
function sendToHome(props) {
  const requiredAuthLevel = props.authLevel !== undefined ? props.authLevel : props.auth ? 1 : -1;
  return get(props , ["user", "authLevel"], -1) < requiredAuthLevel;
}

export default DefaultLayout
