import React from "react"
import { Link } from "react-router-dom"

import { useTheme } from "../../wrappers/with-theme"
import { composeOptions } from "../utils"

export const Button = ({
  buttonTheme = "button",
  className = "",
  type = "button",
  children,
  large, small, block, active,
  ...props }) => {
  const theme = useTheme();
  buttonTheme = `${ buttonTheme }${ composeOptions({ large, small, block, active }) }`;
  return (
    <button type={ type } { ...props }
      className={ `${ theme[buttonTheme] || theme["button"] } ${ className }` }>
      { children }
    </button>
  )
}

export const LinkButton = ({
  buttonTheme = "button",
  className = "",
  type,
  children, disabled,
  large, small, block, active,
  ...props }) => {
  const theme = useTheme();
  buttonTheme = `${ buttonTheme }${ composeOptions({ large, small, block, disabled, active }) }`;
  return (
  	<Link { ...props } onClick={ e => e.stopPropagation() }
    	className={ ` ${ theme[buttonTheme] || theme["button"] } ${ className }` }>
    	{ children }
  	</Link>
  )
}
