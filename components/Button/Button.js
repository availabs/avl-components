import React from "react"
import { Link } from "react-router-dom"

import { useTheme } from "../../wrappers/with-theme"

export const Button = ({
  large, small, block,
  buttonTheme = "button",
  className = "",
  disabled = false,
  type = "button",
  children,
  ...props }) => {

  const theme = useTheme();
  return (
    <button { ...props } type={ type } disabled={ disabled }
      className={ `${ theme[buttonTheme] } ${ className }` }>
      { children }
    </button>
  )
}

export const LinkButton = ({
  large, small, block,
  buttonTheme = "button",
  className = "",
  disabled = false,
  type,
  children,
  ...props }) => {

  const theme = useTheme();
  return (
  	<Link { ...props } disabled={ disabled } onClick={ e => e.stopPropagation() }
    	className={ ` ${ theme[buttonTheme] }  ${ className }` }>
    	{ children }
  	</Link>
  )
}
