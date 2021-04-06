import React from "react"

import { useComponents } from "../index"

import { useTheme } from "../../wrappers/with-theme"
import withAuth from "../../wrappers/with-auth"

import { DEFAULT_TOP_NAV_HEIGHT } from "../constants"

const HeaderComponent = withAuth(({ title,
                            LeftComponent = null,
                            children,
                            RightComponent = null,
                            shadowed = false,
                            user, userMenu = false,
                            className = "",
                            customTheme = {} }) => {

  const theme = { ...useTheme(), ...customTheme },
    { TopUserMenu } = useComponents();

  const LeftComp = title || LeftComponent,
    RightComp = children || RightComponent;

  const tnHeight = theme.topNavHeight || DEFAULT_TOP_NAV_HEIGHT;

  return (
    <div className={ `
        w-full relative flex items-center justify-end
        ${ theme.headerBg } ${ className }
        h-${ tnHeight }
      ` }
      style={ shadowed ? { boxShadow: "0px 6px 3px -3px rgba(0, 0, 0, 0.25)" } : null }>
      <div className={ `
        absolute inset-0 z-0 text-3xl font-bold flex items-center
        h-${ tnHeight }
      ` }>
        { typeof LeftComp === "function" ? React.createElement(LeftComp) : LeftComp }
      </div>
      <div className="flex-0 flex items-center relative z-0 pr-8">

        { RightComp }

        { !user || !userMenu ? null :
          <div className="ml-8">
            <TopUserMenu />
          </div>
        }
      </div>
    </div>
  )
})
export default HeaderComponent
