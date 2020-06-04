import React from "react"

import { light } from "../components/Themes"

export const ThemeContext = React.createContext(light)

export default Component =>
  ({ ...props }) =>
    <ThemeContext.Consumer>
      { theme => <Component { ...props } theme={ theme }/> }
    </ThemeContext.Consumer>
