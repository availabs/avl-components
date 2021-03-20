import React from "react"

import HeaderComponent from "./Header/HeaderComponent"
import { Content } from './Containers'
import { FormSection, InputContainer } from './Forms/FormSection'
import { List, ListItemRemovable, ListItemAction } from './List/List'
import { NavMenu, NavMenuItem, NavMenuSeparator } from "./Nav/Menu"
import NavItem from './Nav/Item'
import Table from './Table'
import SideNav from './Nav/Side'
import TopNav from './Nav/Top'
import Layouts from "./Layouts"
import Loading, { ScalableLoading } from "./Loading"

import { TopUserMenu, SideUserMenu, UserMenuItem } from "./Header/UserMenu"

export * from './Inputs'
export * from "./Button"
export * from "./utils"
export * from "./List/DndList"

export * from "./Sidebar/collapsible-sidebar"
export * from "./Legend/legend"
export * from "./Draggable/draggable"

export { default as AvlModal } from "./Modal/avl-modal"

const ComponentContextDefaults = {
	TopUserMenu,
	SideUserMenu,
	UserMenuItem
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
	SideUserMenu,
	UserMenuItem,
	Content,
	Table,
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
