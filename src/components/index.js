import React from "react"

import HeaderComponent from "./Header/HeaderComponent"
import { FormSection, InputContainer } from './Forms/FormSection'
import { List, ListItemRemovable, ListItemAction } from './List/List'
import { NavMenu, NavMenuItem, NavMenuSeparator } from "./Nav/Menu"
import NavItem from './Nav/Item'
import Table from './Table'
import GridTable from "./Table/grid-table"
import SideNav from './Nav/Side'
import TopNav from './Nav/Top'
import Layouts from "./Layouts"
import Loading, { ScalableLoading } from "./Loading"

import {
	TopUserMenu, TopUserMenuControl,
	SideUserMenu, SideUserMenuControl,
	UserMenuItem, UserMenuSeparator,
	UserMenuItems
} from "./Header/UserMenu"

export * from "./Containers"
export * from './Inputs'
export * from "./Button"
export * from "./utils"
export * from "./List/DndList"

export * from "./Sidebar/collapsible-sidebar"
export * from "./Legend/legend"
export * from "./Draggable/draggable"

export { default as AvlModal } from "./Modal/avl-modal"

const ComponentContextDefaults = {
	TopUserMenu, TopUserMenuControl,
	SideUserMenu, SideUserMenuControl,
	UserMenuItem, UserMenuSeparator,
	UserMenuItems
}

const ComponentContext = React.createContext(ComponentContextDefaults)

export const useComponents = () => {
	return React.useContext(ComponentContext);
}

export const ComponentProvider = ({ children, ...props }) => {
	return (
		<ComponentContext.Provider value={ { ...ComponentContextDefaults, ...props } }>
			{ children }
		</ComponentContext.Provider>
	)
}

export {
	HeaderComponent,
	TopUserMenu,
	TopUserMenuControl,
	SideUserMenu,
	SideUserMenuControl,
	UserMenuItem,
	UserMenuSeparator,
	UserMenuItems,
	Table,
	GridTable,
	FormSection,
	InputContainer,
	List,
	ListItemRemovable,
	ListItemAction,
	SideNav,
	TopNav,
	NavItem,
	NavMenu,
	NavMenuItem,
	NavMenuSeparator,
	Layouts,
	Loading,
	ScalableLoading
}
