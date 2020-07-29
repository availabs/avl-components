import React from "react"

import { composeOptions } from "../utils"
import { useTheme } from "../../wrappers/with-theme"
import { hasValue } from "./utils"

export default React.forwardRef(({ large, small, className = "", onChange, value, ...props }, ref) => {
  const theme = useTheme(),
    inputTheme = theme[`input${ composeOptions({ large, small }) }`];
  return (
    <input { ...props } onChange={ e => onChange(e.target.value) } value={ hasValue(value) ? value : "" }
      className={ `${ inputTheme } ${ className }` } ref={ ref }/>
  )
})
