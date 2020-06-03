import React from "react";
import { Link } from "react-router-dom";
// import { classNames } from "../utils";
import Icon from "../Icons";

import { useLocation, useRouteMatch, useParams } from "react-router"

export function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}


export default ({ to, icon, className, children, theme, type='side' }) => {
  const { pathname } = useLocation();
  let active = (pathname === to);

  let sideClasses = active ? theme.sidebarItemActive : theme.sidebarItem
  let topClasses = active ? theme.topnavItemActive : theme.topnavItem
  let linkClasses = type === 'side' ? sideClasses : topClasses

  return (
    <Link to={to} className={linkClasses}>
      <Icon icon={icon} className={theme.menuIcon} showBlank={ type === "side" }/>
      {children}
    </Link>
  );


};
