const compose = (themeType, theme) => {
	const [base, ...rest] = themeType.split(/(?<!^)(?=[A-Z])/);
	if (!theme.$compositions[base]) return "";

	return theme.$compositions[base].reduce((a, c) => {
		let option = c.default || "";
		for (const opt of rest) {
			if (opt in c) {
				option = c[opt];
			}
		}
		a.push(option);
		return a;
	}, []).filter(Boolean).join(" ");
}

const composeDefaults = theme => {
	const composedTheme = JSON.parse(JSON.stringify(theme));
	if (composedTheme.$compositions) {
		const { defaults = [], ...rest } = composedTheme.$compositions;

		for (const type in rest) {
			composedTheme.$compositions[type].forEach(options => {
				for (let option in options) {
					const atRegex = /^[@](.+)$/;
					options[option] = options[option].split(/\s/).map(o => {
						const match = atRegex.exec(o);
						if (match) {
							const [, key] = match;
							return composedTheme[key]
						}
						return o;
					}).join(" ");
					const $regex = /^\$(.+)$/,
						$match = $regex.exec(options[option]);
					if ($match) {
						const [, value] = $match;
						if (value in composedTheme) {
							options[option] = composedTheme[value];
							defaults.push(value);
						}
					}
				}
			});
		}
		defaults.forEach(themeType => {
			composedTheme[themeType] = compose(themeType, composedTheme);
		});
	}
	return composedTheme;
}
const handler = {
	get: (theme, definition, receiver) => {
		if (definition in theme) return theme[definition];
		return compose(definition, theme);
	}
}

export const flat = {
	bg: 'custom-bg',
	ySpace: 'py-4',
	menuBg: 'custom-bg',
	width: 'max-w-6xl mx-auto',
	text: 'text-blue-800',
	sidebarW: '64',
	sidebarBorder: '',
	menuIcon: 'mr-3 h-5 w-5',
	navitemTop: 'mr-4 inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium leading-5 text-gray-500 hover:text-gray-700 hover:border-gray-300 focus:outline-none focus:text-gray-700 focus:border-gray-300 transition duration-150 ease-in-out',
	navitemTopActive: 'mr-4 inline-flex items-center px-1 pt-1 border-b-2 border-indigo-500 text-sm font-medium leading-5 text-gray-900 focus:outline-none focus:border-indigo-700 transition duration-150 ease-in-out',
	navitemSide: 'mb-1 group flex pl-3 pr-4 py-2 border-l-4 border-transparent text-sm text-gray-600 hover:text-gray-800 hover:bg-gray-50 hover:border-gray-300 focus:outline-none focus:text-gray-800 focus:bg-gray-50 focus:border-gray-300 transition duration-150 ease-in-out',
	navitemSideActive: 'mb-1 group flex pl-3 pr-4 py-2 border-l-4 border-indigo-500 text-sm font-medium text-indigo-700 bg-indigo-50 focus:outline-none focus:text-indigo-800 focus:bg-indigo-100 focus:border-indigo-700 transition duration-150 ease-in-out',

	// header
	headerBg: 'custom-bg',
	headerShadow: '',

	//
	contentBg: '',
	accent1: 'bg-gray-200',
	accent2: 'bg-gray-300',
	accent3: 'bg-gray-400',
	lighter: 'bg-gray-50',
	// buttons
	button: 'inline-flex items-center px-4 py-2 border border-gray-300 text-sm leading-5 font-medium rounded-md text-gray-700 bg-white hover:text-gray-500 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 active:text-gray-800 active:bg-gray-50 transition duration-150 ease-in-out',
	buttonPrimary: 'inline-flex items-center px-4 py-2 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:shadow-outline-indigo focus:border-indigo-700 active:bg-indigo-700 transition duration-150 ease-in-out',
	buttonText: 'text-sm text-blue-500 hover:text-blue-300',

	// table
	tableRow: 'bg-white border-b border-blue-100 hover:bg-blue-50',
	tableRowStriped: 'bg-white even:bg-gray-50',
	tableCell: 'px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-600',
	tableCellCondensed: 'px-3 py-2 whitespace-no-wrap text-sm leading-5 text-gray-600'
	//tabl

}

export const dark = {
	bg: 'bg-gray-300',
	menuBg: 'bg-gray-800',
	sidebarW: '56',
	sidebarBorder: '',
	shadow: '',
	ySpace: 'py-5',
	text: 'text-gray-300',
	width: 'max-w-7xl mx-auto',
	menuIcon: 'mr-3 h-4 w-4',
	topNavHeight: 'h-16',
	navitemTop: 'ml-3 my-3 px-3 py-1 inline-flex items-center rounded-md text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700',
	navitemTopActive: 'ml-3 my-3 px-3 py-1 inline-flex items-center rounded-md text-sm font-medium text-white bg-gray-900 focus:outline-none focus:text-white focus:bg-gray-700',
	navitemSide: 'mt-1 group flex items-center px-2 py-2 text-sm leading-5 font-medium text-gray-300 rounded-md hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700 transition ease-in-out duration-150',
	navitemSideActive: 'group flex items-center px-2 py-2 text-sm leading-5 font-medium text-white rounded-md bg-gray-900 focus:outline-none focus:bg-gray-700 transition ease-in-out duration-150',
	headerBg: 'bg-gray-800',
	headerShadow: 'shadow',
	contentBg: 'bg-gray-100',
	accent1: 'bg-gray-600',
	accent2: 'bg-gray-500',
	accent3: 'bg-gray-400',
	lighter: 'bg-gray-700',
	button: 'inline-flex items-center px-4 py-2 border border-gray-300 text-sm leading-5 font-medium rounded-md text-gray-700 bg-white hover:text-gray-500 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 active:text-gray-800 active:bg-gray-50 transition duration-150 ease-in-out',
	buttonPrimary: 'inline-flex items-center px-4 py-2 border border-gray-300 text-sm leading-5 font-medium rounded-md text-gray-700 bg-white hover:text-gray-500 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 active:text-gray-800 active:bg-gray-50 transition duration-150 ease-in-out',
	buttonText: 'text-sm text-blue-500 hover:text-blue-300',
	tableRow: 'bg-white border-b border-gray-200',
	tableRowStriped: 'bg-white even:bg-gray-50'

}

export const blue = {
	bg: 'bg-gray-200',
	menuBg: 'bg-indigo-800',
	sidebarW: '56',
	sidebarBorder: '',
	shadow: 'shadow',
	ySpace: 'py-5',
	text: 'text-gray-300',
	width: 'max-w-7xl mx-auto',
	menuIcon: 'mr-3 h-4 w-4',
	topNavHeight: 'h-16',
	navitemTop: 'ml-3 my-3 px-3 py-1 inline-flex items-center rounded-md text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700',
	navitemTopActive: 'ml-3 my-3 px-3 py-1 inline-flex items-center rounded-md text-sm font-medium text-white bg-gray-900 focus:outline-none focus:text-white focus:bg-gray-700',
	navitemSide: 'mt-1 group flex items-center px-2 py-2 text-sm leading-5 font-medium text-gray-300 rounded-md hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700 transition ease-in-out duration-150',
	navitemSideActive: 'group flex items-center px-2 py-2 text-sm leading-5 font-medium text-white rounded-md bg-gray-900 focus:outline-none focus:bg-gray-700 transition ease-in-out duration-150',
	headerBg: 'bg-gray-800',
	headerShadow: 'shadow',
	contentBg: 'bg-gray-100',
	accent1: 'bg-gray-200',
	accent2: 'bg-gray-300',
	accent3: 'bg-gray-400',
	light: "bg-gray-50",
	button: 'inline-flex items-center px-4 py-2 border border-gray-300 text-sm leading-5 font-medium rounded-md text-gray-700 bg-white hover:text-gray-500 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 active:text-gray-800 active:bg-gray-50 transition duration-150 ease-in-out',
	buttonPrimary: 'inline-flex items-center px-4 py-2 border border-gray-300 text-sm leading-5 font-medium rounded-md text-gray-700 bg-white hover:text-gray-500 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 active:text-gray-800 active:bg-gray-50 transition duration-150 ease-in-out',
	tableRow: 'bg-white border-b border-gray-200',
	tableRowStriped: 'bg-white even:bg-gray-50'
}

export const light = {
	shadow: 'shadow',
	ySpace: 'py-4',
	sidebarBorder: 'border-r border-gray-200',
	text: 'text-gray-800',
	textContrast: "text-white",

	textInfo: "text-teal-400",
	bgInfo: "bg-teal-400",
	borderInfo: "border-teal-400",

	textSuccess: "text-green-400",
	bgSuccess: "bg-green-400",
	borderSuccess: "border-green-400",

	textDanger: "text-red-400",
	bgDanger: "bg-red-400",
	borderDanger: "border-red-400",

	textWarning: "text-yellow-400",
	bgWarning: "bg-yellow-400",
	borderWarning: "border-yellow-400",

	textLight: "text-gray-400", // <-- for text styled like placeholder but can't be selected with ::placeholder
	// these 2 should be equal
	placeholder: 'placeholder-gray-400',

	menuIcon: 'mr-3 h-6 w-6',
	topMenuBorder: 'border-b border-gray-200',
	headerShadow: '',
	navitemTop: 'mr-4 inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium leading-5 text-gray-500 hover:text-gray-700 hover:border-gray-300 focus:outline-none focus:text-gray-700 focus:border-gray-300 transition duration-150 ease-in-out',
	navitemTopActive: 'mr-4 inline-flex items-center px-1 pt-1 border-b-2 border-indigo-500 text-sm font-medium leading-5 text-gray-900 bg-indigo-100 focus:outline-none hover:bg-indigo-200 focus:border-indigo-700 transition duration-150 ease-in-out',
	navitemSide: 'mb-1 group flex pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 hover:text-gray-800 hover:bg-gray-300 hover:border-gray-300 focus:outline-none focus:text-gray-800 focus:bg-gray-50 focus:border-gray-300 transition duration-150 ease-in-out',
	navitemSideActive: 'mb-1 group flex pl-3 pr-4 py-2 border-l-4 border-indigo-500 text-base font-medium text-indigo-600 bg-indigo-100 focus:outline-none hover:text-indigo-800 focus:text-indigo-800 hover:bg-indigo-200 focus:bg-indigo-200 focus:border-indigo-700 transition duration-150 ease-in-out',

	bg: 'bg-gray-100',
	menuBg: 'bg-gray-200',
	menuBgHover: 'hover:bg-gray-300',
	menuBgActive: 'bg-teal-200',
	menuBgActiveHover: 'hover:bg-teal-300',
	headerBg: 'bg-gray-200',
	headerBgHover: "hover:bg-gray-400",

	inputBg: "bg-white disabled:bg-gray-200",
	inputBorder: "border-2 border-transparent hover:border-gray-300 focus:border-gray-600 disabled:border-gray-200",
	inputBgDisabled: "bg-gray-200",
	inputBoderDisabled: "border-2 border-gray-200",
	inputBgFocus: "bg-white",
	inputBorderFocus: "border-2 border-transparent focus:border-gray-600 border-gray-600",

	contentBg: 'bg-white',

	accent1: 'bg-gray-200',
	accent2: 'bg-gray-300',
	accent3: 'bg-gray-400',
	accent4: 'bg-gray-500',

	highlight1: "bg-teal-200",
	highlight2: "bg-teal-300",
	highlight3: "bg-teal-400",
	highlight4: "bg-teal-500",

	width: 'max-w-7xl mx-auto',
	sidebarW: '48',
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
	buttonPrimary: 'inline-flex items-center px-4 py-2 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:shadow-outline-indigo focus:border-indigo-700 active:bg-indigo-700 transition duration-150 ease-in-out disabled:cursor-not-allowed',

	tableRow: 'bg-gray-100 hover:bg-gray-200',
	tableRowStriped: 'bg-gray-100 even:bg-gray-200 hover:bg-gray-300',

	tableCell: 'px-4 py-2 whitespace-no-wrap text-sm',
	tableCellCondensed: 'px-2 py-1 whitespace-no-wrap text-sm'
}

// TEST THEME COMPOSITIONS BELOW!!!!!!!!!!

const button = [
	{ default: "rounded inline-flex items-center justify-center @transition disabled:cursor-not-allowed disabled:bg-transparent disabled:opacity-50 focus:outline-none border" }, // <-- applied to all buttons
	{ default: "$button", // <-- this is pulled from the theme during composeDefaults and overwritten
		Primary: "$buttonPrimary", // <-- this is pulled from the theme during composeDefaults and overwritten
		Success: "$buttonSuccess",
		Danger: "$buttonDanger",
		Info: "$buttonInfo"
	},
	{ default: "py-1 px-4", // <<-- padding based on size
		Large: "py-2 px-6 text-lg rounded-md",
		Small: "py-0 px-4 text-sm"
	},
	{ Block: "w-full" },
	// { Active: "*hover:" }
]
const input = [
	{ default: "w-full block rounded cursor-pointer disabled:cursor-not-allowed @transition @text @placeholder @inputBg @inputBorder" },
	{ default: "py-1 px-2", // <<-- padding based on size
		Large: "py-2 px-4 text-lg rounded-md",
		Small: "py-0 px-1 text-sm"
	}
]
const navitem = [
	{ default: "group border-transparent font-medium focus:outline-none @transition"},
	{ Top: "mr-4 inline-flex items-center px-1 pt-1 border-b-2 text-sm leading-5",
		Side: "mb-1 flex pl-3 pr-4 py-2 border-l-4 text-bas"
	},
	{ default: "text-gray-500 @menuBg @menuBgHover hover:text-gray-700 hover:border-gray-300 focus:text-gray-700 focus:border-gray-300",
		Active: "text-teal-500 @menuBgActive @menuBgActiveHover hover:text-teal-700 hover:border-teal-300 focus:text-teal-700 focus:border-teal-300" }
]
const $compositions = {
	defaults: [
		"input",
		"navitemTop",
		"navitemTopActive",
		"navitemSide",
		"navitemSideActive"
	], // <-- these are generated in theme during composeDefaults
		// these should be commonly used classNames
	button,
	input,
	navitem,

	textbutton: [
		{ default: "$textbutton" },
		{ default: "@transition hover:font-bold disabled:opacity-50 disabled:font-normal  focus:outline-none px-2" },
		{ default: "text-base",
			Large: "text-lg",
			Small: "text-sm"
		}
	]
}

const TEST_THEME_BASE = {
	...light,

	button: "border-gray-400 hover:bg-gray-400 text-gray-400 hover:text-white disabled:text-gray-400 didisabled:opacity-50 ",

	buttonPrimary: "text-blue-400 border-blue-400 hover:text-white hover:bg-blue-400 disabled:opacity-50 disabled:text-blue-400",

	buttonSuccess: "text-green-400 border-green-400 hover:bg-green-400 hover:text-white disabled:opacity-50 disabled:text-green-400",

	buttonDanger: "text-red-400 border-red-400 hover:text-white hover:bg-red-400 disabled:opacity-50 disabled:text-red-400",

	buttonInfo: "text-teal-400 border-teal-400 hover:bg-teal-400 hover:text-white disabled:text-teal-400",

	textbutton: "border-transparent text-teal-400 hover:text-teal-500 disabled:text-teal-400 disabled:opacity-50",

	$compositions
}
export const TEST_THEME =  new Proxy(composeDefaults(TEST_THEME_BASE), handler);

console.log("TEST_THEME", TEST_THEME)
