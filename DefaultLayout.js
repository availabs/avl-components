import React from 'react';
import { Route, Redirect } from "react-router-dom";
import Layouts from './components/Layouts'
import * as themes from './components/Themes'

import ComponentFactory from "./ComponentFactory"

import LoadingPage from "./components/Loading/LoadingPage"

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
console.log("REST:", rest)
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
        theme={themes[rest.layoutSettings.theme] || themes['light']}
        render={matchProps => (<ComponentFactory {...matchProps} {...rest} config={ component }/>)}
      />
    </Layout>
  )
}

function sendToLgin (props) {
  const requiredAuthLevel = props.authLevel !== undefined ? props.authLevel : props.auth ? 1 : -1;
  return props.user.authLevel < requiredAuthLevel;
}

export default DefaultLayout
