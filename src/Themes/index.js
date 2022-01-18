import { makeProxy, composeTheme } from "./utils";

import { $compositions } from "./compositions";

export const flat_base = {
	bg: "custom-bg",
	ySpace: "py-4",
	contentPadding: "py-4",
	menuBg: "custom-bg",
	contentWidth: "",
	text: "text-blue-800",
	sidebarW: "64",
	sidebarBorder: "",
	menuIcon: "mr-3 h-5 w-5",
	navitemTop:
		"mr-4 inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium leading-5 text-gray-500 hover:text-gray-700 hover:border-gray-300 focus:outline-none focus:text-gray-700 focus:border-gray-300 transition duration-150 ease-in-out",
	navitemTopActive:
		"mr-4 inline-flex items-center px-1 pt-1 border-b-2 border-indigo-500 text-sm font-medium leading-5 text-gray-900 focus:outline-none focus:border-indigo-700 transition duration-150 ease-in-out",
	navitemSide:
		"mb-1 group flex pl-3 pr-4 py-2 border-l-4 border-transparent text-sm text-gray-600 hover:text-gray-800 hover:bg-gray-50 hover:border-gray-300 focus:outline-none focus:text-gray-800 focus:bg-gray-50 focus:border-gray-300 transition duration-150 ease-in-out",
	navitemSideActive:
		"mb-1 group flex pl-3 pr-4 py-2 border-l-4 border-indigo-500 text-sm font-medium text-indigo-700 bg-indigo-50 focus:outline-none focus:text-indigo-800 focus:bg-indigo-100 focus:border-indigo-700 transition duration-150 ease-in-out",

	// header
	headerBg: "custom-bg",
	headerShadow: "",

	//
	contentBg: "",
	accent1: "bg-gray-200",
	accent2: "bg-gray-300",
	accent3: "bg-gray-400",
	accent4: "bg-gray-500",
	lighter: "bg-gray-50",
	// buttons
	button:
		"inline-flex items-center px-4 py-2 border border-gray-300 text-sm leading-5 font-medium rounded-md text-gray-700 bg-white hover:text-gray-500 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 active:text-gray-800 active:bg-gray-50 transition duration-150 ease-in-out",
	buttonPrimary:
		"inline-flex items-center px-4 py-2 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:shadow-outline-indigo focus:border-indigo-700 active:bg-indigo-700 transition duration-150 ease-in-out",
	textbutton: "text-sm text-blue-500 hover:text-blue-300 px-2",

	input: "block",

	// table
	tableRow: "bg-white border-b border-blue-100 hover:bg-blue-50",
	tableRowStriped: "bg-white even:bg-gray-50",
	tableCell: "px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-600",
	tableCellCondensed:
		"px-3 py-2 whitespace-no-wrap text-sm leading-5 text-gray-600",
	tableHeader:
		"px-6 pt-2 pb-1	border-b border-gray-400 bg-gray-200 text-left font-medium text-gray-700 uppercase first:rounded-tl-md last:rounded-tr-md",
};
export const flat = makeProxy(flat_base);

const dark_base = {
	bg: "bg-gray-300",
	menuBg: "bg-gray-800",
	sidebarW: "56",
	sidebarBorder: "",
	shadow: "",
	ySpace: "py-5",
	contentPadding: "py-5",
	text: "text-gray-300",
	contentWidth: "max-w-7xl mx-auto",
	menuIcon: "mr-3 h-4 w-4",
	navitemTop:
		"ml-3 my-3 px-3 py-1 inline-flex items-center rounded-md text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700",
	navitemTopActive:
		"ml-3 my-3 px-3 py-1 inline-flex items-center rounded-md text-sm font-medium text-white bg-gray-900 focus:outline-none focus:text-white focus:bg-gray-700",
	navitemSide:
		"mt-1 group flex items-center px-2 py-2 text-sm leading-5 font-medium text-gray-300 rounded-md hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700 transition ease-in-out duration-150",
	navitemSideActive:
		"group flex items-center px-2 py-2 text-sm leading-5 font-medium text-white rounded-md bg-gray-900 focus:outline-none focus:bg-gray-700 transition ease-in-out duration-150",
	headerBg: "bg-gray-800",
	headerShadow: "shadow",
	contentBg: "bg-gray-100",
	accent1: "bg-gray-600",
	accent2: "bg-gray-500",
	accent3: "bg-gray-400",
	lighter: "bg-gray-700",
	button:
		"inline-flex items-center px-4 py-2 border border-gray-300 text-sm leading-5 font-medium rounded-md text-gray-700 bg-white hover:text-gray-500 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 active:text-gray-800 active:bg-gray-50 transition duration-150 ease-in-out",
	buttonPrimary:
		"inline-flex items-center px-4 py-2 border border-gray-300 text-sm leading-5 font-medium rounded-md text-gray-700 bg-white hover:text-gray-500 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 active:text-gray-800 active:bg-gray-50 transition duration-150 ease-in-out",
	textbutton: "text-sm text-blue-500 hover:text-blue-300 px-2",
	tableRow: "bg-white border-b border-gray-200",
	tableRowStriped: "bg-white even:bg-gray-50",
};
export const dark = makeProxy(dark_base);

const blue_base = {
	bg: "bg-gray-200",
	menuBg: "bg-indigo-800",
	sidebarW: "56",
	sidebarBorder: "",
	shadow: "shadow",
	ySpace: "py-5",
	contentPadding: "py-5",
	text: "text-gray-300",
	contentWidth: "max-w-7xl mx-auto",
	menuIcon: "mr-3 h-4 w-4",
	navitemTop:
		"ml-3 my-3 px-3 py-1 inline-flex items-center rounded-md text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700",
	navitemTopActive:
		"ml-3 my-3 px-3 py-1 inline-flex items-center rounded-md text-sm font-medium text-white bg-gray-900 focus:outline-none focus:text-white focus:bg-gray-700",
	navitemSide:
		"mt-1 group flex items-center px-2 py-2 text-sm leading-5 font-medium text-gray-300 rounded-md hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700 transition ease-in-out duration-150",
	navitemSideActive:
		"group flex items-center px-2 py-2 text-sm leading-5 font-medium text-white rounded-md bg-gray-900 focus:outline-none focus:bg-gray-700 transition ease-in-out duration-150",
	headerBg: "bg-gray-800",
	headerShadow: "shadow",
	contentBg: "bg-gray-100",
	accent1: "bg-gray-200",
	accent2: "bg-gray-300",
	accent3: "bg-gray-400",
	light: "bg-gray-50",
	button:
		"inline-flex items-center px-4 py-2 border border-gray-300 text-sm leading-5 font-medium rounded-md text-gray-700 bg-white hover:text-gray-500 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 active:text-gray-800 active:bg-gray-50 transition duration-150 ease-in-out",
	buttonPrimary:
		"inline-flex items-center px-4 py-2 border border-gray-300 text-sm leading-5 font-medium rounded-md text-gray-700 bg-white hover:text-gray-500 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 active:text-gray-800 active:bg-gray-50 transition duration-150 ease-in-out",
	tableRow: "bg-white border-b border-gray-200",
	tableRowStriped: "bg-white even:bg-gray-50",
};
export const blue = makeProxy(blue_base);

const light_base = {
	shadow: "shadow",
	ySpace: "py-4",
	contentPadding: "py-4",
	sidebarBorder: "",
	text: "text-gray-800",
	textContrast: "text-white",
	border: "border-gray-400",

	textInfo: "text-teal-400",
	bgInfo: "bg-teal-400",
	borderInfo: "border-teal-400",

	textSuccess: "text-green-400",
	bgSuccess: "bg-green-400",
	borderSuccess: "border-green-400",

	textPrimary: "text-blue-400",
	bgPrimary: "bg-blue-400",
	borderPrimary: "border-blue-400",

	textDanger: "text-red-400",
	bgDanger: "bg-red-400",
	borderDanger: "border-red-400",

	textWarning: "text-yellow-400",
	bgWarning: "bg-yellow-400",
	borderWarning: "border-yellow-400",

	textLight: "text-gray-400", // <-- for text styled like placeholder but can't be selected with ::placeholder
	// these 2 should be equal
	placeholder: "placeholder-gray-400",
	borderLight: "border-gray-400",
	bgLight: "bg-gray-400",

	menuIcon: "mr-3 h-6 w-6",
	topMenuBorder: "border-b border-gray-200",
	headerShadow: "",
	navitemTop:
		"mr-4 inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium leading-5 text-gray-500 hover:text-gray-700 hover:border-gray-300 focus:outline-none focus:text-gray-700 focus:border-gray-300 transition duration-150 ease-in-out",
	navitemTopActive:
		"mr-4 inline-flex items-center px-1 pt-1 border-b-2 border-indigo-500 text-sm font-medium leading-5 text-gray-900 bg-indigo-100 focus:outline-none hover:bg-indigo-200 focus:border-indigo-700 transition duration-150 ease-in-out",
	navitemSide:
		"mb-1 group flex pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 hover:text-gray-800 hover:bg-gray-300 hover:border-gray-300 focus:outline-none focus:text-gray-800 focus:bg-gray-50 focus:border-gray-300 transition duration-150 ease-in-out",
	navitemSideActive:
		"mb-1 group flex pl-3 pr-4 py-2 border-l-4 border-indigo-500 text-base font-medium text-indigo-600 bg-indigo-100 focus:outline-none hover:text-indigo-800 focus:text-indigo-800 hover:bg-indigo-200 focus:bg-indigo-200 focus:border-indigo-700 transition duration-150 ease-in-out",

	bg: "bg-gray-100",
	mobileButton:
		"md:hidden bg-white inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-300",

	menuBg: "bg-gray-200",
	menuBgHover: "hover:bg-gray-300",
	menuBgActive: "bg-teal-200",
	menuBgActiveHover: "hover:bg-teal-300",
	menuText: "text-gray-500",
	menuTextHover: "hover:text-gray-700",
	menuTextActive: "text-teal-500",
	menuTextActiveHover: "hover:text-teal-700",

	topnavWrapper: `w-full bg-gray-100`,
	topnavContent: `flex w-full `,
	topnavMenu: `hidden md:flex flex-1 h-full overflow-x-auto overflow-y-hidden scrollbar-sm`,
	sidenavWrapper: `bg-gray-100 w-56 border-r border-gray-200 h-screen pt-16 z-50`,

	headerBg: "bg-gray-200",
	headerBgHover: "hover:bg-gray-400",

	inputBg: "bg-white disabled:bg-gray-200 cursor-pointer focus:outline-none",
	inputBorder:
		"rounded border border-transparent hover:border-gray-300 focus:border-gray-600 disabled:border-gray-200",
	inputBgDisabled: "bg-gray-200 cursor-not-allowed focus:outline-none",
	inputBorderDisabled: "rounded border border-gray-200 hover:border-gray-200",
	inputBgFocus: "bg-white cursor-pointer focus:outline-none",
	inputBorderFocus:
		"rounded border border-transparent hover:border-gray-600 focus:border-gray-600 border-gray-600",

	textBase: "text-base",
	textSmall: "text-sm",
	textLarge: "text-lg",
	paddingBase: "py-1 px-2",
	paddingSmall: "py-0 px-1",
	paddingLarge: "py-2 px-4",

	contentBg: "bg-white",
	contentWidth: "max-w-7xl mx-auto",

	accent1: "bg-gray-200",
	accent2: "bg-gray-300",
	accent3: "bg-gray-400",
	accent4: "bg-gray-500",

	highlight1: "bg-teal-200",
	highlight2: "bg-teal-300",
	highlight3: "bg-teal-400",
	highlight4: "bg-teal-500",

	sidebarW: "56",
	transition: "transition ease-in-out duration-150",

	button: `
		inline-flex items-center
		px-4 py-2 border border-gray-300
		text-sm leading-5 font-medium
		rounded-md text-gray-700 bg-white
		hover:text-gray-500
		focus:outline-none focus:shadow-outline-blue focus:border-blue-300
		active:text-gray-800 active:bg-gray-50 transition duration-150 ease-in-out
		disabled:cursor-not-allowed`,
	buttonPrimary:
		"inline-flex items-center px-4 py-2 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:shadow-outline-indigo focus:border-indigo-700 active:bg-indigo-700 transition duration-150 ease-in-out disabled:cursor-not-allowed",

	tableRow: "bg-gray-100 hover:bg-gray-200 transition ease-in-out duration-150",
	tableRowStriped:
		"bg-gray-100 even:bg-gray-200 hover:bg-gray-300 transition ease-in-out duration-150",

	tableCell: "px-4 py-1 whitespace-no-wrap",

	tableHeader:
		"px-4 py-2 pb-1 border-b-2 border-gray-300 bg-gray-200 text-left font-medium text-gray-700 uppercase first:rounded-tl-md last:rounded-tr-md",
};
export const light = makeProxy(light_base);

const TEST_THEME_BASE = {
	text: "text-gray-800",
	textContrast: "text-white",
	border: "border-gray-400",

	ySpace: "",

	textInfo: "text-teal-400",
	bgInfo: "bg-teal-400",
	borderInfo: "border-teal-400",

	textSuccess: "text-green-400",
	bgSuccess: "bg-green-400",
	borderSuccess: "border-green-400",

	textPrimary: "text-blue-400",
	bgPrimary: "bg-blue-400",
	borderPrimary: "border-blue-400",

	textDanger: "text-red-400",
	bgDanger: "bg-red-400",
	borderDanger: "border-red-400",

	textWarning: "text-yellow-400",
	bgWarning: "bg-yellow-400",
	borderWarning: "border-yellow-400",

	textLight: "text-gray-400", // <-- for text styled like placeholder but can't be selected with ::placeholder
	// these 2 should be equal
	placeholder: "placeholder-gray-400",

	menuIcon: "mr-3 h-6 w-6",
	topMenuBorder: "border-b border-gray-200",
	headerShadow: "",

	bg: "bg-gray-100",

	menuBg: "bg-gray-200",
	menuBgHover: "hover:bg-gray-300",
	menuBgActive: "bg-teal-200",
	menuBgActiveHover: "hover:bg-teal-300",
	menuText: "text-gray-500",
	menuTextHover: "hover:text-gray-700",
	menuTextActive: "text-teal-500",
	menuTextActiveHover: "hover:text-teal-700",
	menuOpenIcon: `fas fa-bars`,
	menuCloseIcon: `fas fa-times`,

	topnavWrapper: `w-full bg-gray-200 h-16`,
	topnavContent: `flex w-full max-w-7xl mx-auto h-full`,
	topnavMenu: `hidden md:flex flex-1 h-full overflow-x-auto overflow-y-hidden scrollbar-sm`,
	sidenavWrapper: `bg-gray-200 w-56 border-r border-gray-200 h-screen pt-16 z-50`,
	topmenuRightNavContainer: "h-full",
	mobileButton:
		"md:hidden bg-white inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-300",

	sidebarBg: "bg-gray-200",
	sidebarBorder: "",
	sidebarW: "56",

	headerBg: "bg-gray-200",
	headerBgHover: "hover:bg-gray-400",

	inputBg: "bg-white disabled:bg-gray-200 cursor-pointer focus:outline-none",
	inputBorder:
		"rounded border border-transparent hover:border-gray-300 focus:border-gray-600 disabled:border-gray-200",
	inputBgDisabled: "bg-gray-200 cursor-not-allowed focus:outline-none",
	inputBorderDisabled: "rounded border border-gray-200 hover:border-gray-200",
	inputBgFocus: "bg-white cursor-pointer focus:outline-none",
	inputBorderFocus:
		"rounded border border-transparent hover:border-gray-600 focus:border-gray-600 border-gray-600",
	booleanInputSlider: "bg-gray-300",

	textBase: "text-base",
	textSmall: "text-sm",
	textLarge: "text-lg",

	paddingBase: "py-1 px-2",
	paddingSmall: "py-0 px-1",
	paddingLarge: "py-2 px-4",

	accent1: "bg-gray-200",
	accent2: "bg-gray-300",
	accent3: "bg-gray-400",
	accent4: "bg-gray-500",

	highlight1: "bg-teal-200",
	highlight2: "bg-teal-300",
	highlight3: "bg-teal-400",
	highlight4: "bg-teal-500",

	contentBg: "bg-white",
	contentWidth: "w-full max-w-7xl mx-auto",
	contentPadding: "py-4",

	transition: "transition ease-in-out duration-150",

	tableInfoBar: "bg-white",
	tableRow: "bg-white hover:bg-gray-200 @transition",
	tableRowStriped: "bg-white even:bg-gray-100 hover:bg-gray-200 @transition",

	tableCell: "px-4 py-1 whitespace-no-wrap",

	tableHeader:
		"px-4 py-2 pb-1 border-b-2 border-gray-300 bg-gray-200 text-left font-medium text-gray-700 uppercase first:rounded-tl-md last:rounded-tr-md",

	$compositions,
};
export const TEST_THEME = composeTheme(TEST_THEME_BASE);

// console.log("TEST_THEME", TEST_THEME)

const colors = {
	transparent: {
		contentBg: "",
		accentColor: "blue-600",
		accentBg: "hover:bg-blue-600",
		borderColor: "border-gray-200",
		textColor: "text-gray-800",
		highlightColor: "text-white",
	},
	white: {
		contentBg: "bg-white",
		accentColor: "blue-600",
		accentBg: "hover:bg-blue-600",
		borderColor: "border-gray-100",
		textColor: "text-gray-600",
		highlightColor: "text-white",
	},
	dark: {
		contentBg: "bg-darkblue-600",
		accentColor: "blue-600",
		accentBg: "hover:bg-blue-600",
		borderColor: "border-gray-700",
		textColor: "text-gray-200",
		highlightColor: "text-white",
	},
	gray: {
		contentBg: "bg-gray-800",
		accentColor: "gray-500",
		accentBg: "hover:bg-gray-500",
		borderColor: "border-gray-600",
		textColor: "text-gray-300",
		highlightColor: "text-gray-200",
	},
	bright: {
		contentBg: "bg-blue-700",
		accentColor: "blue-400",
		accentBg: "hover:bg-blue-400",
		borderColor: "border-blue-600",
		textColor: "text-white",
		highlightColor: "text-white",
	},
};

const sizes = {
	compact: {
		wrapper: "w-64",
		sideItem: "flex mx-6 pr-4 py-2 text-sm font-light hover:pl-4",
		topItem: "flex items-center text-sm px-4 border-r h-12",
		icon: "mr-3 text-lg",
	},
	full: {
		wrapper: "w-64",
		sideItem: "flex mx-4 pr-4 py-4 text-base font-base border-b hover:pl-4",
		topItem: "flex pr-4 py-2 text-sm font-light",
		icon: "mr-4 text-2xl",
	},
	mini: {
		wrapper: "w-20 overflow-x-hidden",
		sideItem: "flex pr-4 py-4 text-base font-base border-b",
		topItem: "flex px-4 items-center text-sm font-light ",
		icon: "w-20 mr-4 text-4xl",
	},
	micro: {
		wrapper: "w-14 overflow-x-hidden",
		sideItem: "flex pr-4 py-4 text-base font-base border-b",
		topItem: "flex mx-6 pr-4 py-2 text-sm font-light",
		icon: "w-14 mr-4 text-2xl",
	},
};

// let color = "white";
// let size = "compact";

const avl_design = (color, size ) => {

	return {
		/* -----
         Side Nav Theme Components Minimal
      ------*/

		sidenavWrapper: `${colors[color].contentBg} ${sizes[size].wrapper} border-r border-gray-200 h-full`,
		menuIconSide: ` text-${colors[color].accentColor} ${sizes[size].icon} group-hover:${colors[color].highlightColor}`,
		navitemSide: ` 
    group font-sans 
    ${sizes[size].sideItem} ${colors[color].textColor} ${colors[color].borderColor} 
    ${colors[color].accentBg} hover:${colors[color].highlightColor} 
    focus:outline-none focus:text-gray-800 focus:bg-gray-50 focus:border-gray-300 
    transition-all cursor-pointer
  `,

		navitemSideActive: `
    group flex pl-8 pr-4 py-2 bg-${colors[color].highlightColor} text-base font-medium text-darkblue-500 focus:outline-none hover:text-indigo-800 focus:text-indigo-800 focus:bg-blue-200 focus:border-indigo-700 transition duration-150 ease-in-out`,

		/* -----
         Top Nav Theme Components Minimal
      ------*/
		topnavWrapper: `w-full ${colors[color].contentBg}`,
		topnavContent: `flex w-full h-full`,
		topnavMenu: `hidden md:flex flex-1 h-full overflow-x-auto overflow-y-hidden scrollbar-sm`,
		menuIconTop: `text-${colors[color].accentColor} ${sizes[size].icon} group-hover:${colors[color].highlightColor}`,
		menuOpenIcon: `os-icon os-icon-menu`,
		menuCloseIcon: `os-icon os-icon-x`,

		navitemTop: `
    group font-sans 
    ${sizes[size].topItem} ${colors[color].textColor} ${colors[color].borderColor} 
    ${colors[color].accentBg} hover:${colors[color].highlightColor} 
    focus:outline-none focus:text-gray-800 focus:bg-gray-50 focus:border-gray-300 
    transition cursor-pointer`,
		//`px-4 text-sm font-medium tracking-widest uppercase inline-flex items-center  border-transparent  leading-5 text-white hover:bg-white hover:text-darkblue-500 border-gray-200 focus:outline-none focus:text-gray-700 focus:border-gray-300 transition duration-150 ease-in-out h-full`,
		topmenuRightNavContainer: "hidden md:block h-full",
		navitemTopActive: `group font-sans
    ${sizes[size].topItem} ${colors[color].textColor} ${colors[color].borderColor} 
    ${colors[color].accentBg} hover:${colors[color].highlightColor} 
    focus:outline-none focus:text-gray-800 focus:bg-gray-50 focus:border-gray-300 
    transition cursor-pointer`,
		mobileButton:
			"md:hidden bg-white inline-flex items-center justify-center p-2  text-gray-400 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-300",

		/* ------------------------- */
		shadow: "shadow",
		ySpace: "py-4",
		text: "text-gray-800",
		textContrast: "text-white",
		border: "broder-gray-400",

		textInfo: "text-blue-400",
		bgInfo: "bg-blue-400",
		borderInfo: "border-blue-400",

		textSuccess: "text-blue-400",
		bgSuccess: "bg-blue-400",
		borderSuccess: "border-blue-400",

		textDanger: "text-red-400",
		bgDanger: "bg-red-400",
		borderDanger: "border-red-400",

		textWarning: "text-yellow-400",
		bgWarning: "bg-yellow-400",
		borderWarning: "border-yellow-400",

		textLight: "text-gray-400", // <-- for text styled like placeholder but can't be selected with ::placeholder
		placeholder: "placeholder-gray-400",

		topMenuBorder: "border-b border-gray-200",
		topMenuScroll: "",
		headerShadow: "",
		navText: "text-gray-100",

		navMenu: "h-full relative",
		navMenuOpen: "bg-darkblue-500 text-white shadow-lg w-56 rounded-t-lg",
		navMenuBg: "bg-darkblue-500 bb-rounded-10 shadow-lg text-white rounded-b-lg",
		navMenuItem:
			"hover:font-medium cursor-pointer px-2 py-1 text-lg font-semibold",

		bg: "bg-gray-50",

		menuBg: "bg-white z-50",
		menuBgHover: "",
		menuBgActive: "bg-blue-200",
		menuBgActiveHover: "hover:bg-blue-300",
		menuText: "text-gray-100",
		menuTextHover: "hover:text-gray-700",
		menuTextActive: "text-blue-500",
		menuTextActiveHover: "hover:text-blue-700",

		headerBg: "bg-gray-200",
		headerBgHover: "hover:bg-gray-400",

		inputBg: "bg-white disabled:bg-gray-200 cursor-pointer focus:outline-none",
		inputBorder:
			"rounded border-0 border-transparent hover:border-gray-300 focus:border-gray-600 disabled:border-gray-200",
		inputBgDisabled: "bg-gray-200 cursor-not-allowed focus:outline-none",
		inputBorderDisabled: "rounded border-2 border-gray-200 hover:border-gray-200",
		inputBgFocus: "bg-white cursor-pointer focus:outline-none",
		inputBorderFocus:
			"rounded border-2 border-transparent hover:border-gray-600 focus:border-gray-600 border-gray-600",

		textBase: "text-base",
		textSmall: "text-sm",
		textLarge: "text-lg",
		paddingBase: "py-1 px-2",
		paddingSmall: "py-0 px-1",
		paddingLarge: "py-2 px-4",

		contentBg: "bg-white",

		accent1: "bg-blue-100",
		accent2: "bg-gray-300",
		accent3: "bg-gray-400",
		accent4: "bg-gray-500",

		highlight1: "bg-blue-200",
		highlight2: "bg-blue-300",
		highlight3: "bg-blue-400",
		highlight4: "bg-blue-500",

		width: "",

		transition: "transition ease-in-out duration-150",
		button: `
        inline-flex items-center
        px-4 py-2 border border-gray-300
        text-sm leading-5 font-medium
        rounded-md text-gray-700 bg-white
        hover:text-gray-500
        focus:outline-none focus:shadow-outline-blue focus:border-blue-300
        active:text-gray-800 active:bg-gray-50 transition duration-150 ease-in-out
        disabled:cursor-not-allowed`,
		buttonPrimary:
			"inline-flex items-center px-4 py-2 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:shadow-outline-indigo focus:border-indigo-700 active:bg-indigo-700 transition duration-150 ease-in-out disabled:cursor-not-allowed",

		tableRow: "bg-gray-100 hover:bg-gray-200 transition ease-in-out duration-150",
		tableRowStriped:
			"bg-gray-100 even:bg-gray-200 hover:bg-gray-300 transition ease-in-out duration-150",

		tableCell: "px-4 py-1 whitespace-no-wrap",

		tableHeader:
			"px-4 py-2 pb-1 border-b-2 border-gray-300 bg-gray-200 text-left font-medium text-gray-700 uppercase first:rounded-tl-md last:rounded-tr-md",
	}
};

export const AVL_THEME = composeTheme(avl_design('white', 'compact'));
export const AVL_THEME_dynamic = (color, size) => composeTheme(avl_design(color, size));
