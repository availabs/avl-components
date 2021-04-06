import React from "react"
import { Link } from 'react-router-dom'

import get from "lodash.get"

import { useTheme } from "../../wrappers/with-theme"
import NavItem from './Item'

import HeaderComponent from "../Header/HeaderComponent"

import { DEFAULT_TOP_NAV_HEIGHT } from "../constants"

const MobileMenu = ({ open, menuItems = [], customTheme = {}, home = "/" }) => {
  const theme = { ...useTheme(), ...customTheme };
  return (
    <div className={ `${ open ? 'sm:hidden relative' : 'hidden' } ${ theme.menuBg }` }>
      <div className="pt-2 pb-3">
        { menuItems.map((page, i) => (
            <NavItem key={ i } to={ page.path } icon={ page.icon }>
              { page.name }
            </NavItem>
          ))
        }
      </div>
    </div>
  )
}

const DesktopMenu = ({ menuItems = [],
                      open, toggle, logo,
                      customTheme = {}, home = "/",
                      userMenu = false,
                      rightMenu = null,
                      RightComponent = null }) => {

  const theme = { ...useTheme(), ...customTheme };

  const RightComp = rightMenu || RightComponent;

  const tnHeight = theme.topNavHeight || DEFAULT_TOP_NAV_HEIGHT;

  return (
    <HeaderComponent userMenu={ userMenu }
      customTheme={ customTheme }
      className={ `
        h-${ tnHeight }
        ${ theme.sidebarBg }
        ${ theme.topMenuBorder }
      ` }
      LeftComponent={
        <div className={ `
          ${ theme.contentWidth } h-${ tnHeight } flex relative
        ` }>
          { !logo ? null :
            <Link to={ home }
              className={ `flex-0 flex items-center ${ theme.text }`}>
              { logo }
            </Link>
          }
          <div className="hidden sm:flex">
            { menuItems.map((page, i) => (
                <NavItem key={ i } type='top'
                  to={ page.path } icon={ page.icon }
                  customTheme={ customTheme }
									subMenus={ get(page, "subMenus", []) }>
                  { page.name }
                </NavItem>
              ))
            }
          </div>

        </div>
      }
      RightComponent={ RightComp }/>
  )
}

const TopNav = ({ customTheme = {}, ...props }) => {
  const theme = { ...useTheme(), ...customTheme };
  const tnHeight = theme.topNavHeight || DEFAULT_TOP_NAV_HEIGHT;
  return (
    <nav className={ `${ theme.menuBg } h-${ tnHeight }` }>
      <DesktopMenu customTheme={ customTheme } { ...props }/>
      <MobileMenu customTheme={ customTheme } { ...props }/>
    </nav>
  )
}
export default TopNav;
