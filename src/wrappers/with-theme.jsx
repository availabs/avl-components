import React, { useContext } from "react"

//import { light } from "../Themes"

export const ThemeContext = React.createContext({});

export const useTheme = () => useContext(ThemeContext);

export default Component =>
  ({ ...props }) =>
    <ThemeContext.Consumer>
      { theme => <Component { ...props } theme={ theme }/> }
    </ThemeContext.Consumer>