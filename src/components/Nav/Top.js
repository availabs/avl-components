import React from "react"
import { Link } from 'react-router-dom'
import { useTheme } from "../../wrappers/with-theme"
import NavItem from './Item'

import HeaderComponent from "../Header/HeaderComponent"

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

const DesktopMenu = ({ menuItems = [], open, toggle, logo, customTheme = {}, home = "/", userMenu = false }) => {
  const theme = { ...useTheme(), ...customTheme };
  return (
    <HeaderComponent userMenu={ userMenu }
      className={ `
        h-${ theme.topNavHeight || 16 }
        ${ theme.sidebarBg }
        ${ theme.topMenuBorder }
      ` }
      title={
        <div className={ `
          ${ theme.contentWidth } h-${ theme.topNavHeight || 16 } flex
        ` }>

          <Link to={ home }
            className={ `flex-0 flex items-center ${ theme.text }`}>
            { logo }
          </Link>
          <div className="hidden sm:flex">
            { menuItems.map((page, i) => (
                <NavItem key={ i } to={ page.path } icon={ page.icon }
                  customTheme={ customTheme } type='top'>
                  { page.name }
                </NavItem>
              ))
            }
          </div>

        </div>
      }/>
  )
}

const TopNav = ({ customTheme = {}, ...props }) => {
  const theme = { ...useTheme(), ...customTheme };
  return (
    <nav className={ `${ theme.menuBg } h-${ theme.topNavHeight || 16 }` }>
      <DesktopMenu { ...props }/>
      <MobileMenu { ...props }/>
    </nav>
  )
}
export default TopNav;
