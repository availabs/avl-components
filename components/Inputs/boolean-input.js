import React from "react"

import { composeOptions } from "../utils"
import { useTheme } from "../../wrappers/with-theme"

export default React.forwardRef(({ large, small, className = "", trueText = "Active", falseText = "Inactive", value, onChange, ...props }, ref) => {
  const theme = useTheme(),
    inputTheme = theme[`input${ composeOptions({ large, small }) }`];
  return (
    <div { ...props } onClick={ e => onChange(!value) }
      className={ `${ inputTheme } ${ className }` } ref={ ref }>
      <div className="flex">
        <div className="flex-0">
          <Slider value={ value }/>
        </div>
        <div className="flex-1 text-right">
          { value ? trueText : falseText }
        </div>
      </div>
    </div>
  )
})

const Slider = ({ value }) => {
  const [ref, setRef] = React.useState(null),
    [width, setWidth] = React.useState(0),
    [hasWidth, setHasWidth] = React.useState(false);
  React.useEffect(() => {
    if (ref) {
      const rect = ref.getBoundingClientRect();
      setWidth(rect.height)
    }
  }, [ref]);
  React.useEffect(() => {
    setHasWidth(Boolean(width));
  }, [width])

  const theme = useTheme();

  return (
    <div className="relative w-20 h-full rounded-lg overflow-hidden">
      <div className={ `w-full h-full ${ theme.bgDanger }` }/>
      <div className={ `absolute top-0 w-full h-full` }
        style={ {
          right: value ? "0px" : `calc(100% - ${ width }px)`,
          transition: `right ${ hasWidth ? 0.25 : 0 }s`
        } }>
        <div className={ `absolute w-full h-full ${ theme.bgSuccess }` }
          style={ { right: `calc(0px + ${ width * 0.5 }px)`}}/>
        <div className={ `absolute right-0 rounded-lg h-full ${ theme.accent2 }` }
          style={ { width: `${ width }px` } } ref={ setRef }/>
      </div>
    </div>
  )
}
