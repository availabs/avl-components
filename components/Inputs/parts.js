import React from "react"

import { useTheme } from "components/avl-components/wrappers/with-theme"

export const ValueItem = ({ isPlaceholder, children, remove }) => {
  const theme = useTheme();
  return (
    <div className={ `
        ${ isPlaceholder ? theme.textLight : `${ theme.accent1 } mr-1 pl-2 pr-1` }
        rounded whitespace-no-wrap mt-1 relative flex items-center
      ` }>
      { children }
      { isPlaceholder ? null :
        <div className={ `
            ${ theme.menuBgActive } ${ theme.menuBgActiveHover } ${ theme.textContrast }
            ml-2 p-1 flex justify-center items-center rounded cursor-pointer
          ` }
          onClick={ remove }>
          <svg width="8" height="8">
            <line x2="8" y2="8" style={ { stroke: "currentColor", strokeWidth: 2 } }/>
            <line y1="8" x2="8" style={ { stroke: "currentColor", strokeWidth: 2 } }/>
          </svg>
        </div>
      }
    </div>
  )
}
export const ValueContainer = React.forwardRef(({ children, hasFocus, large, small, className = "", ...props }, ref) => {
  const theme = useTheme();
  return (
    <div { ...props } ref={ ref }
      className={ `
        w-full flex flex-row flex-wrap ${ hasFocus ? theme.inputFocus : theme.inputBg }
        ${ large ? "pt-1 pb-2 px-4" : small ? "pb-1 px-1" : "pb-1 px-2" }
        ${ large ? "text-lg" : small ? "text-sm" : "" }
        ${ large ? "rounded-md" : "rounded" }
        ${ className }
      ` }>
      { children }
    </div>
  )
})
