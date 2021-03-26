import React from "react"

import { useComponents } from "../index"

import { useTheme } from "../../wrappers/with-theme"
import withAuth from "../../wrappers/with-auth"

const HeaderComponent = withAuth(({ title,
                            shadowed = false,
                            user, userMenu = true,
                            className = "",
                            children }) => {

  const theme = useTheme(),
    { TopUserMenu } = useComponents();

  return (
    <div className={ `
        w-full relative flex items-center justify-end
        ${ theme.headerBg } ${ className }
        h-${ theme.topNavHeight || 16 }
      ` }
      style={ shadowed ? { boxShadow: "0px 6px 3px -3px rgba(0, 0, 0, 0.25)" } : null }>
      <div className={ `
        absolute top-0 left-0 right-0 bottom-0 z-0
        text-3xl font-bold flex items-center
        h-${ theme.topNavHeight || 16 }
      ` }>
        { typeof title === "function" ? React.createElement(title) : title }
      </div>
      <div className="flex-0 flex items-center relative z-0 pr-8">

        { children }

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
