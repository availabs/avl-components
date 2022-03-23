import React, { useState } from "react";
import { Link } from "react-router-dom";

import get from "lodash.get";

import { useTheme } from "../../wrappers";

import SidebarItem from "./Item";
import { MobileMenu } from './Top'

const MobileSidebar = ({
   open,
   toggle,
   logo = null,
   topMenu,
   menuItems = [],
   bottomMenu,
   themeOptions={},
   ...props
}) => {
	let theme = useTheme()['sidenav'](themeOptions);
	// theme = props.theme || theme;

	return (
		<>
			<div className="md:hidden" onClick={() => toggle(!open)}>
				<span className={theme.menuOpenIcon} />
			</div>
			<div style={{ display: open ? "block" : "none" }} className={`md:hidden`} >
				<div className="fixed inset-0 z-20 transition-opacity ease-linear duration-300">
					<div className="absolute inset-0 bg-gray-600 opacity-75" />
				</div>
				<div className="fixed inset-0 flex z-40">
					<div className={`flex-1 flex flex-col max-w-xs w-full transform ease-in-out duration-300`}>
						<div className="absolute top-0 right-0 -mr-14 p-1">
							<button
								onClick={() => toggle(!open)}
								className="flex items-center justify-center h-12 w-12 rounded-full focus:outline-none focus:bg-gray-600 os-icon os-icon-x"
							/>
						</div>
						<div
							className={`flex-1 h-0 pt-2 pb-4 overflow-y-auto overflow-x-hidden ${theme.sidenavWrapper}`}
						>
							<div className="px-6 pt-4 pb-8 logo-text gray-900">
								<Link
									to={"/"}
									className={`flex-shrink-0 flex items-center ${theme.text}`}
								>
									{logo}
								</Link>
							</div>
							<div>{topMenu}</div>
							<nav className="flex-1">
								{menuItems.map((page, i) => (
									<div key={i} className={page.sectionClass}>
										<SidebarItem
											to={page.path}
											icon={page.icon}
											themeOptions={themeOptions}
											className={page.itemClass}
										>
											{page.name}
										</SidebarItem>
									</div>
								))}
							</nav>
							<div>
								{bottomMenu}
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

const DesktopSidebar = ({ 
	menuItems = [], 
	logo = null, 
	topMenu, 
	bottomMenu, 
	toggle, 
	open, 
	mobile,
	themeOptions={},
	...props }) => {
	let theme = useTheme()['sidenav'](themeOptions);
	console.log('SideNav', themeOptions, theme, useTheme()['sidenav'](themeOptions))

	return (
		<>
			<div
				className={`${theme.sidenavWrapper}`}
			>
				<div>
					{topMenu}
					<nav className={`${theme.itemsWrapper}`}>
						
						{menuItems.map((page, i) => (
							<SidebarItem
								key={i}
								to={page.path}
								icon={page.icon}
								className={page.className}
								themeOptions={themeOptions}
								subMenus={get(page, "subMenus", [])}
							>
								{page.name}
							</SidebarItem>
						))}
					</nav>
					{bottomMenu}
				</div>
			</div>
			{mobile === 'side' ? '' : 
				<div className={`${theme.topnavWrapper} md:hidden`}>
			      <div className={`${theme.topnavContent} justify-between`}>
			        <div>{topMenu}</div>
			        <div className="flex items-center justify-center h-full">
			          <div className={`${theme.topmenuRightNavContainer}`}>{bottomMenu}</div>

			          {/*<!-- Mobile menu button -->*/}
			          <button
			            type="button"
			            className={theme.mobileButton}
			            onClick={() => toggle(!open)}
			          >
			            <span className="sr-only">Open main menu</span>
			            <div className={`flex justify-center items-center text-2xl`}>
			              <span
			                className={!open ? theme.menuOpenIcon : theme.menuCloseIcon}
			              />
			            </div>
			          </button>
			        </div>
			      </div>
			    </div>
			}
		</>
	);
};

const SideNav = (props) => {
	const [open, setOpen] = useState(false);
	return (
		<>
			<DesktopSidebar {...props} open={open} toggle={setOpen} />
			{props.mobile === 'side'  ? 
				<MobileSidebar open={open} toggle={setOpen} {...props} /> :
				<MobileMenu open={open} {...props} themeOptions={{}}/>
			}
			
		</>
	);
};
export default SideNav;
