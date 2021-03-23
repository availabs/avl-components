import React from "react"

import { useComponents } from "../index"
import { UserMenuSeparator } from "./UserMenu"

import { useTheme } from "../../wrappers/with-theme"
import withAuth from "../../wrappers/with-auth"

import get from "lodash.get"

export default withAuth(({ title, shadowed = false, user, userMenu = true, className="", children }) => {
  const theme = useTheme();
	const { TopUserMenu, UserMenuItem } = useComponents();
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
      <div className="flex-0 flex items-center relative z-0">
        { children }
        { !user || !userMenu ? null :
          <div className="mx-8">
            <TopUserMenu>
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
            </TopUserMenu>
          </div>
        }
      </div>
    </div>
  )
})
