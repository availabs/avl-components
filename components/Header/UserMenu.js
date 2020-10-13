import React from "react"

import { Link } from "react-router-dom"

import { useClickOutside } from "../utils"
import { useTheme } from "../../wrappers/with-theme"
import withAuth from "../../wrappers/with-auth"

export const UserMenu = withAuth(({ user, children }) => {
  const [open, setOpen] = React.useState(false),
    clickedOutside = React.useCallback(() => setOpen(false), []),
    [setRef] = useClickOutside(clickedOutside),
    theme = useTheme();
  return !user.authed ?
      <Link to="/auth/login">
        <div className={ `
            flex items-center rounded cursor-pointer ${ theme.textInfo }
            border-2 border-transparent hover:${ theme.borderInfo }
            ${ theme.transition } flex items-center justify-center
          ` } style={ { width: "2rem", height: "2rem", borderRadius: "1rem" } }>
          <span className="fas fa-user"/>
        </div>
      </Link>
    :
      <div className="relative" ref={ setRef }>
        <div className={ `
            flex items-center rounded cursor-pointer ${ theme.textInfo }
            border-2 ${ open ? theme.borderInfo : "border-transparent" }
            hover:${ theme.borderInfo } ${ theme.transition } flex items-center justify-center
          ` } style={ { width: "2rem", height: "2rem", borderRadius: "1rem" } }
          onClick={ e => setOpen(!open) }>
          <span className="fas fa-user"/>
        </div>
        { !open ? null :
          <div className={ `${ theme.accent2 } mt-1 p-2 right-0 absolute ${ theme.text }` }
            style={ { top: "100%", minWidth: "8rem" } }>
            <div className="mb-1 border-b-2" style={ { borderColor: "currentColor" } }>
              { user.email }
            </div>
            { children }
          </div>
        }
      </div>
})

export const UserMenuItem = ({ to = "#", children }) => {
  const theme = useTheme();
  return (
    <Link to={ to }>
      <div className={ `rounded cursor-pointer px-2 ${ theme.transition } hover:${ theme.accent1 }` }>
        { children }
      </div>
    </Link>
  )
}
