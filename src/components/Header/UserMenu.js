import React from "react"

import { Link } from "react-router-dom"

import { useClickOutside } from "../utils"
import { useTheme } from "../../wrappers/with-theme"
import withAuth from "../../wrappers/with-auth"

export const TopUserMenu = withAuth(({ user = {}, children }) => {
  const [open, setOpen] = React.useState(false),
    toggle = React.useCallback(() => {
      setOpen(open => !open);
    }, []),
    clickedOutside = React.useCallback(() => setOpen(false), []),
    [setRef] = useClickOutside(clickedOutside),
    theme = useTheme();
  return (
    !user.authed ?
      <Link to="/auth/login">
        <div className={ `
            flex items-center rounded cursor-pointer ${ theme.textInfo }
            border-transparent flex items-center justify-center
            hover:${ theme.borderInfo } ${ theme.transition }
          ` }
          style={ {
            width: "2.5rem", height: "2.5rem",
            borderRadius: "1.25rem", fontSize: "1.15rem",
            borderWidth: "3px"
          } }>
          <span className="fas fa-user"/>
        </div>
      </Link>
    :
      <div className="relative" ref={ setRef }>
        <div className={ `
            flex items-center rounded cursor-pointer ${ theme.textInfo }
            ${ open ? theme.borderInfo : "border-transparent" }
            hover:${ theme.borderInfo } ${ theme.transition }
            flex items-center justify-center
          ` }
          style={ {
            width: "2.5rem", height: "2.5rem",
            borderRadius: "1.25rem", fontSize: "1.15rem",
            borderWidth: "3px"
          } }
          onClick={ toggle }>
          <span className="fas fa-user"/>
        </div>
        { !open ? null :
          <div className={ `${ theme.accent2 } mt-1 p-2 right-0 absolute ${ theme.text }` }
            style={ { top: "100%", minWidth: "8rem" } }>
            <div className="mb-1 border-b-2">
              { user.email }
            </div>
            { children }
          </div>
        }
      </div>
  )
})

export const SideUserMenu = withAuth(({ user = {}, children }) => {
  const [open, setOpen] = React.useState(false),
    toggle = React.useCallback(() => {
      setOpen(open => !open);
    }, []),
    clickedOutside = React.useCallback(() => setOpen(false), []),
    [setRef] = useClickOutside(clickedOutside),
    theme = useTheme();
  return (
    <div className="pb-6">
      { !user.authed ?
          <a className={ `
              w-full py-1 pl-4 transition cursor-pointer block
              ${ theme.menuBgHover } ${ theme.menuTextHover }
            ` }
            href="/auth/login">
            <span className="fas fa-user mr-2"/>Login
          </a>
        :
          <div className="relative" ref={ setRef }>
            <div className={ `
                w-full py-1 pl-4 transition cursor-pointer
                ${ open ? `${ theme.menuBgActive } ${ theme.menuTextActive }` :
                  `${ theme.menuBgHover } ${ theme.menuTextHover }`
                }
              ` }
              onClick={ toggle }>
              <span className="fas fa-user mr-2"/>User Menu
            </div>
            { !open ? null :
              <div className={ `${ theme.accent2 } mt-1 p-2 left-0 absolute ${ theme.text }` }
                style={ { bottom: "100%", minWidth: "8rem" } }>
                <div className="mb-1 border-b-2">
                  { user.email }
                </div>
                { children }
              </div>
            }
          </div>
      }
    </div>
  )
})

export const UserMenuItem = ({ to = "#", children }) => {
  const theme = useTheme();
  return (
    <Link to={ to }>
      <div className={ `
        rounded cursor-pointer px-2 whitespace-nowrap
        ${ theme.transition } hover:${ theme.accent3 }
      ` }>
        { children }
      </div>
    </Link>
  )
}

export const UserMenuSeparator = () =>
  <div className="border my-1"/>
