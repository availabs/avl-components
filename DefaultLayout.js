import React from 'react';
import { Route, Redirect } from "react-router-dom";
import Layouts from './components/Layouts'
import * as themes from './components/Themes'

import { ThemeContext } from "./wrappers/with-theme"

import ComponentFactory from "./ComponentFactory"

import LoadingPage from "./components/Loading/LoadingPage"

import get from "lodash.get"

const DefaultLayout = ({ component, ...rest }) => {
  const Layout = Layouts[rest.layout] || Layouts['Sidebar']
  if ( rest.isAuthenticating && rest.authLevel >= 0  ) {
    return (
      <Layout {...rest}>
        <Route {...rest} render={matchProps => (
          <div>
            <LoadingPage />
          </div>
        )} />
      </Layout>
    )
  }
  const theme = get(rest, ["layoutSettings", "theme"], "light");
  return sendToLgin(rest) ?
  (
    <Redirect
      to={{
        pathname: "/login",
        state: { from: rest.router.location }
      }}
    />
  ) : (
    <Layout {...rest.layoutSettings} {...rest}>
      <Route
        {...rest}
        render={
          matchProps => (
            <ThemeContext.Provider value={ get(themes, theme, null) }>
              <ComponentFactory {...matchProps} {...rest} config={ component }/>
            </ThemeContext.Provider>
          )
        }
      />
    </Layout>
  )
}

function sendToLgin (props) {
  const requiredAuthLevel = props.authLevel !== undefined ? props.authLevel : props.auth ? 1 : -1;
  return props.user.authLevel < requiredAuthLevel;
}

export default DefaultLayout
