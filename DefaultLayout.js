import React from 'react';
import { Route, Redirect, useLocation } from "react-router-dom";
import Layouts from './components/Layouts'
import * as themes from './components/Themes'

import { ThemeContext } from "./wrappers/with-theme"

import ComponentFactory from "./ComponentFactory"

import LoadingPage from "./components/Loading/LoadingPage"

import get from "lodash.get"

const DefaultLayout = ({ component, path, exact, layoutSettings, ...props }) => {
  const Layout = get(Layouts, props.layout, Layouts["Sidebar"]),
    themeName = get(layoutSettings, "theme", "light"),
    theme = get(themes, themeName, null),
    location = useLocation();

  if (props.isAuthenticating && !props.authed) {
    return (
      <ThemeContext.Provider value={ theme }>
        <Layout { ...props }>
          <Route { ...props }>
            <LoadingPage />
          </Route>
        </Layout>
      </ThemeContext.Provider>
    )
  }
  return sendToLgin(props) ?
    (
      <Redirect
        to={ {
          pathname: "/login",
          state: { from: get(location, "pathname") }
        } }
      />
    ) : (
      <ThemeContext.Provider value={ theme }>
        <Layout { ...layoutSettings } { ...props }>
          <Route path={ path } exact={ exact }>
            <ComponentFactory config={ component }/>
          </Route>
        </Layout>
      </ThemeContext.Provider>
    )
}

function sendToLgin (props) {
  const requiredAuthLevel = props.authLevel !== undefined ? props.authLevel : props.auth ? 1 : -1;
  return get(props , ["user", "authLevel"], -1) < requiredAuthLevel;
}

export default DefaultLayout
