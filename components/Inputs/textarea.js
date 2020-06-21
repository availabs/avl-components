import React from "react"

import { composeOptions } from "../utils"
import { useTheme } from "../../wrappers/with-theme"

export default ({ large, small, className = "", children="TESTING", onChange, ...props }) => {
  const theme = useTheme(),
    inputTheme = theme[`input${ composeOptions({ large, small }) }`];
  return (
    <textarea { ...props } onChange={ e => onChange(e.target.value) }
      className={ `${ inputTheme } ${ className }` }>
      { children }
    </textarea>
  )
}
