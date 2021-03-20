import React from "react"
import { Link } from 'react-router-dom'

import get from "lodash.get"

import { useTheme, withAuth } from "../../wrappers"
import SidebarItem from './Item'

import { UserMenuSeparator } from "../Header/UserMenu"
import { useComponents } from "../index"

const MobileSidebar = ({ open, toggle,logo = null, menuItems=[] }) => {
	const theme = useTheme();
	return (
	<div style={{display: open ? 'block' : 'none' }} className="md:hidden">
	    <div className="fixed inset-0 z-20 transition-opacity ease-linear duration-300">
	      <div className="absolute inset-0 bg-gray-600 opacity-75" />
	    </div>
	    <div  className="fixed inset-0 flex z-40">
	      <div  className="flex-1 flex flex-col max-w-xs w-full transform ease-in-out duration-300">
	        <div className="absolute top-0 right-0 -mr-14 p-1">
	          <button onClick={toggle} className="flex items-center justify-center h-12 w-12 rounded-full focus:outline-none focus:bg-gray-600">
	            <svg className="h-6 w-6 text-gray-900" stroke="currentColor" fill="none" viewBox="0 0 24 24">
	              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
	            </svg>
	          </button>
	        </div>
	        <div className={`flex-1 h-0 pt-2 pb-4 overflow-y-auto overflow-x-hidden ${theme.menuBg}`}>
	          	<div className='px-6 pt-4 pb-8 logo-text gray-900' >
	          		<Link to={'/'} className={`flex-shrink-0 flex items-center ${theme.text}`}>
          			{ logo }
          			</Link>
          	 	</div>
	          <nav className="flex-1">
	            { menuItems.map((page, i) => (
									<div key={ i } className={ page.sectionClass }>
		            		<SidebarItem  to={ page.path } icon={page.icon} theme={theme} className={page.itemClass}>
		    							{ page.name }
		  							</SidebarItem>
	  							</div>
	            	))
							}
	          </nav>
	        </div>

	      </div>

	    </div>
 	</div>
	)
}

const DesktopSidebar = ({ menuItems = [], logo = null, home = "/", user, userMenu = false }) => {
	const theme = useTheme();
	const { SideUserMenu, UserMenuItem } = useComponents();
	return(
		<div className={ `
			hidden md:flex z-20 fixed top-0 bottom-0
			${ theme.sidebarBg } ${ theme.sidebarBorder }
		` }>

      <div className={ `
				w-${ theme.sidebarW } flex-1 flex flex-col scrollbar
			` }>

				{ !logo ? null :
	      	<Link to={ home }
						className={ `
							${ theme.text } flex-1
							h-${ theme.topNavHeight || 16 }
						` }>
	      		{ logo }
	      	</Link>
				}

        <nav className={ `
					flex-1 ${ !logo ? `pt-${ theme.topNavHeight || 16 }` : "" }
				` }>
          { menuItems.map((page, i) => (
          		<SidebarItem key={ i } to={ page.path } icon={ page.icon }>
  							{ page.name }
							</SidebarItem>
          	))
         	}
        </nav>

				{ !userMenu ? null :
					<SideUserMenu>
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
					</SideUserMenu>
				}

      </div>

	  </div>
  )
}


const SideNav = props => (
	<React.Fragment>
		<MobileSidebar { ...props }/>
		<DesktopSidebar { ...props }/>
	</React.Fragment>
)
export default withAuth(SideNav)
