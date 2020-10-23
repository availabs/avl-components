import React from "react";
import { NavLink } from "react-router-dom";
// import { classNames } from "../utils";
import Icon from "../Icons";
import { useTheme } from "../../wrappers/with-theme"

// import { useLocation } from "react-router-dom"

export function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}


export default ({ to, icon, customTheme, className, children, type='side' }) => {
	const theme = Object.assign({},useTheme(), customTheme);
//   const { pathname } = useLocation();
//   let active = false;//(to.includes(pathname));
// console.log("PATH NAME:", pathname, to)
//
//   let sideClasses = active ? theme.navitemSideActive : theme.navitemSide
//   let topClasses = active ? theme.navitemTopActive : theme.navitemTop
  const linkClasses = type === 'side' ? theme.navitemSide : theme.navitemTop,
    activeClasses = type === 'side' ? theme.navitemSideActive : theme.navitemTopActive;


  return (
    <NavLink to={to} className={className + ' ' + linkClasses } activeClassName={`${className} ${activeClasses }`}>
      {icon ? <Icon icon={icon} className={theme.menuIcon} showBlank={ type === "side" }/> : ''}
      {children}
    </NavLink>
  );


};
