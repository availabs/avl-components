import React from 'react';
import { Route, Redirect } from "react-router-dom";
import Layouts from './components/Layouts'
import * as themes from './components/Themes'

import { ThemeContext } from "./wrappers/with-theme"

import ComponentFactory from "./ComponentFactory"

import LoadingPage from "./components/Loading/LoadingPage"

import get from "lodash.get"

const DefaultLayout = ({ component, path, exact, layoutSettings, ...rest }) => {
  const Layout = get(Layouts, rest.layout, Layouts["Sidebar"]),
    themeName = get(layoutSettings, "theme", "light"),
    theme = get(themes, themeName, null);
  if ( rest.isAuthenticating && rest.authLevel >= 0  ) {
    return (
      <ThemeContext.Provider value={ theme }>
        <Layout { ...rest }>
          <Route { ...rest }>
            <div><LoadingPage /></div>
          </Route>
        </Layout>
      </ThemeContext.Provider>
    )
  }
  return sendToLgin(rest) ?
  (
    <Redirect
      to={ {
        pathname: "/login",
        state: { from: get(rest, ["router", "location"]) }
      } }
    />
  ) : (
    <ThemeContext.Provider value={ theme }>
      <Layout { ...layoutSettings } { ...rest }>
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
