import React from "react"

import { UserMenu, UserMenuItem, UserMenuSeparator } from "./UserMenu"

import { useTheme } from "../../wrappers/with-theme"
import withAuth from "../../wrappers/with-auth"

import get from "lodash.get"

export default withAuth(({ title, shadowed = false, user, children }) => {
  const theme = useTheme();
  return (
    <div className={ `
        fixed top-0 left-0 right-0 z-50 flex items-center px-8
        md:ml-${ theme.sidebarW } ${ theme.headerBg }
      ` }
      style={ shadowed ? { boxShadow: "0px 6px 3px -3px rgba(0, 0, 0, 0.25)" } : null }>
      <div className="flex-1 text-3xl font-bold h-16 flex items-center">
        { title }
      </div>
      <div className="flex-0 flex items-center">
        { children }
        { !user ? null :
          <div className="ml-8">
            <UserMenu>
              <UserMenuItem to="/auth/profile">
                Profile
              </UserMenuItem>
              { get(user, "authLevel", -1) < 5 ? null :
                <UserMenuItem to="/auth/project-management">
                  Project Management
                </UserMenuItem>
              }
              <UserMenuSeparator />
              <UserMenuItem to="/auth/logout">
                Logout
              </UserMenuItem>
            </UserMenu>
          </div>
        }
      </div>
    </div>
  )
})
