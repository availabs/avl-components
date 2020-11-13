import React from "react";
import { NavLink } from "react-router-dom";
import Icon from "../Icons";
import { useTheme } from "../../wrappers/with-theme"

export default ({ to, icon, customTheme, className, children, type='side' }) => {
	const theme = Object.assign({},useTheme(), customTheme),
    linkClasses = type === 'side' ? theme.navitemSide : theme.navitemTop,
    activeClasses = type === 'side' ? theme.navitemSideActive : theme.navitemTopActive;

  return (
    <NavLink to={ to } className={ className + ' ' + linkClasses } activeClassName={ `${ className } ${ activeClasses }` }>
      { icon ? <Icon icon={ icon } className={ theme.menuIcon } showBlank={ type === "side" }/> : '' }
      { children }
    </NavLink>
  );


};
