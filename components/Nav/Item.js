import React from "react";
import { Link, NavLink } from "react-router-dom";
// import { classNames } from "../utils";
import Icon from "../Icons";

import { useLocation } from "react-router-dom"

export function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}


export default ({ to, icon, className, children, theme, type='side' }) => {
//   const { pathname } = useLocation();
//   let active = false;//(to.includes(pathname));
// console.log("PATH NAME:", pathname, to)
//
//   let sideClasses = active ? theme.sidebarItemActive : theme.sidebarItem
//   let topClasses = active ? theme.topnavItemActive : theme.topnavItem
  const linkClasses = type === 'side' ? theme.sidebarItem : theme.topnavItem,
    activeClasses = type === 'side' ? theme.sidebarItemActive : theme.topnavItemActive;

  return (
    <NavLink to={to} className={linkClasses} activeClassName={ activeClasses }>
      <Icon icon={icon} className={theme.menuIcon} showBlank={ type === "side" }/>
      {children}
    </NavLink>
  );


};
