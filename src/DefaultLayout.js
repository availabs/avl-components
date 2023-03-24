import React from 'react';


import { Route, Navigate, useLocation, Outlet } from "react-router-dom";

import Layouts from './components/Layouts'
import LoadingPage from "./components/Loading"
import withTheme from "./wrappers/with-theme"
import { ComponentFactory } from "./ComponentFactory"

import get from "lodash.get"

const DefaultLayout = ({ component, path, exact, layoutSettings, isAuthenticating, ...props }) => {
  // console.log('DefaultLayout')
  const location = useLocation(),
    Layout = typeof props.layout === 'string' ? 
      get(Layouts, props.layout, Layouts["Fixed"]) :
      props.layout;

  const LayoutWrapper = () => {
    return <Layout { ...layoutSettings } { ...props } > <Outlet /> </Layout>
  }

  return (
    <Route element={<LayoutWrapper />}>
      <Route path={ path } exact={ exact } element={<ComponentFactory config={ component }/>}/>
    </Route>
  )
  // if (isAuthenticating) {
  //   return (
  //     <Route element={ <LayoutWrapper /> }>
  //       <Route path={ path } exact={ exact } render={() => (
  //         <div className="fixed top-0 left-0 w-screen h-screen z-50"
  //              style={ { backgroundColor: "rgba(0, 0, 0, 0.5)" } }>
  //           <LoadingPage />
  //         </div>
  //       )} />
  //     </Route>
  //   )
  // }

  // return sendToLogin(props) ?
  //   ( <Route path={ "/auth/login" } render={() => <Navigate
  //       to={ { pathname: "/auth/login" } }
  //       state={{ from: get(location, "pathname") }}
  //     />}/>
  //   ) : sendToHome(props) ? <Route path={ "/" } render={() =>  <Navigate to="/"/>} /> :
  //   (
  //     <Route element={<LayoutWrapper />}>
  //       <Route path={ path } exact={ exact } element={<ComponentFactory config={ component }/>}/>
  //     </Route>
  //   )
}

const getAuthLevel = props =>
  props.auth ? 0 : get(props, "authLevel", -1);

function sendToLogin(props) {
  const requiresAuth = getAuthLevel(props) > -1;
  return requiresAuth && !get(props, ["user", "authed"], false);
}

function sendToHome(props) {
  return (get(props , ["user", "authLevel"], -1) < getAuthLevel(props));
}

export default DefaultLayout
