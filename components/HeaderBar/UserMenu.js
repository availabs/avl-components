import React from "react"

import { Link } from "react-router-dom"

import { useClickOutside } from "../utils"
import { useTheme } from "../../wrappers/with-theme"

export const UserMenu = ({ children }) => {
  const [open, setOpen] = React.useState(false),
    clickedOutside = React.useCallback(() => setOpen(false), []),
    [setRef] = useClickOutside(clickedOutside),
    theme = useTheme();
  return (
    <div className={ `
        relative flex items-center rounded cursor-pointer ${ theme.textInfo }
        border-2 ${ open ? theme.borderInfo : "border-transparent" }
        hover:${ theme.borderInfo } ${ theme.transition } flex items-center justify-center
      ` } style={ { width: "2rem", height: "2rem", borderRadius: "1rem" } }
      onClick={ e => setOpen(!open) } ref={ setRef }>
      <span className="fas fa-user"/>
      { !open ? null :
        <div className={ `${ theme.accent2 } mt-1 p-2 right-0 absolute ${ theme.text }` }
          style={ { top: "100%", minWidth: "8rem" } }>
          { children }
        </div>
      }
    </div>
  )
}
export const UserMenuItem = ({ to = "#", children }) => {
  const theme = useTheme();
  return (
    <div className={ `rounded cursor-pointer ${ theme.transition } hover:${ theme.accent1 }` }>
      <Link className="block px-2" to={ to }>{ children }</Link>
    </div>
  )
}
