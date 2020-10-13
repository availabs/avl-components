import React from "react"

import { UserMenu, UserMenuItem } from "./UserMenu"

import { useTheme } from "../../wrappers/with-theme"
import withAuth from "../../wrappers/with-auth"

export default withAuth(({ title, shadowed = true, user, children }) => {
  const theme = useTheme();
  return (
    <div className={ `
        fixed top-0 left-0 right-0 z-50 flex items-center px-8
        md:ml-${ theme.sidebarW } ${ theme.headerBg }
      ` }
      style={ shadowed ? { boxShadow: "0px 6px 3px -3px rgba(0, 0, 0, 0.25)" } : null }>
      <div className="flex-1 text-3xl font-bold h-10 mb-1">
        { title }
      </div>
      <div className="flex-0 flex items-center">
        { children }
        <div className="ml-8">
          <UserMenu>
            <UserMenuItem to="/auth/profile">
              Profile
            </UserMenuItem>
            <UserMenuItem to="/auth">
              Auth Directory
            </UserMenuItem>
            <div className="border-b-2 my-1" style={ { borderColor: "currentColor" } }/>
            <UserMenuItem to="/auth/logout">
              Logout
            </UserMenuItem>
          </UserMenu>
        </div>
      </div>
    </div>
  )
})
