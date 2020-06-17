import React from "react"
import { Link } from "react-router-dom"

import { useTheme } from "../../wrappers/with-theme"

export const Button = ({ children, className = "", disabled = false, type = "button", ...props }) => {
  const theme = useTheme();
  return (
    <button { ...props } type={ type } disabled={ disabled }
      className={ `${ theme[type] } ${ className }` }>
      { children }
    </button>
  )
}

export const LinkButton = ({ children, className = "", disabled = false, type='button', ...props}) => {
  const theme = useTheme();
  return (
  	<Link { ...props } disabled={ disabled } onClick={ e => e.stopPropagation() }
    	className={ ` ${ theme[type] }  ${ className }` }>
    	{ children }
  	</Link>
  )
}
