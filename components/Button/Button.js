import React from "react"
import { Link } from "react-router-dom"

import { useTheme } from "../../wrappers/with-theme"

export const Button = ({
  buttonTheme = "button",
  className = "",
  type = "button",
  children,
  ...props }) => {

  const theme = useTheme();
  return (
    <button type={ type } { ...props }
      className={ `${ theme[buttonTheme] } ${ className }` }>
      { children }
    </button>
  )
}

export const LinkButton = ({
  buttonTheme = "button",
  className = "",
  type,
  children,
  ...props }) => {

  const theme = useTheme();
  return (
  	<Link { ...props } onClick={ e => e.stopPropagation() }
    	className={ ` ${ theme[buttonTheme] } ${ className }` }>
    	{ children }
  	</Link>
  )
}
