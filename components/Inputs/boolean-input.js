import React from "react"

import { composeOptions } from "../utils"
import { useTheme } from "../../wrappers/with-theme"

export default React.forwardRef(({
  large, small, className = "",
  labels = ["False", "True"],
  value, onChange, disabled = false, ...props }, ref) => {

  const theme = useTheme(),
    inputTheme = theme[`input${ composeOptions({ large, small }) }`];

  return (
    <div { ...props } onClick={ disabled ? null : e => onChange(!value) }
      className={ `${ inputTheme } ${ className }` } ref={ ref }>
      <div className="flex">
        <div className="flex-0">
          <Slider value={ value }/>
        </div>
        <div className="flex-1 ml-4">
          { labels[+Boolean(value)] }
        </div>
      </div>
    </div>
  )
})

const Slider = ({ value }) => {
  const theme = useTheme();

  return (
    <div className="px-1 h-full flex justify-center items-center">
      <div className="relative h-3">
        <div className={ `relative w-10 h-3 rounded-lg overflow-hidden` }>
          <div className={ `absolute top-0 w-20 h-full ${ theme.accent4 }` }
            style={ { left: value ? "100%" : "0", transition: "left 0.25s" } }/>
          <div className={ `absolute top-0 w-20 h-full ${ theme.bgInfo }` }
            style={ { right: value ? "0" : "100%", transition: "right 0.25s" } }/>
        </div>
        <div className={ `absolute h-4 w-4 rounded-lg ${ theme.accent2 }` }
          style={ {
            top: "50%", left: value ? "calc(100% - 0.625rem)" : "-0.125rem",
            transform: "translateY(-50%)", transition: "left 0.25s"
          } }/>
      </div>
    </div>
  )
}
