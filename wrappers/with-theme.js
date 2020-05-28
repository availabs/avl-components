import React from "react"

import * as themes from "../components/Themes"

export const ThemeContext = React.createContext(themes["light"])

export default Component =>
  (props = {}) =>
    <ThemeContext.Consumer>
      { theme => <Component { ...props } theme={ theme }/> }
    </ThemeContext.Consumer>
