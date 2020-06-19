const compose = (definition, theme) => {
	const [type, ...rest] = definition.split(/(?<!^)(?=[A-Z])/);
	if (!theme.compositions[type]) return "";

	return theme.compositions[type].reduce((a, c) => {
		let option = c.default || "";
		for (const o in c) {
			if (rest.includes(o)) option = c[o];
		}
		a.push(option);
		return a;
	}, []).filter(Boolean).join(" ");
}

const composeDefaults = theme => {
	const composedTheme = JSON.parse(JSON.stringify(theme));
	if (composedTheme.compositions) {
		const { defaults = [], ...rest } = composedTheme.compositions;

		for (const type in rest) {
			composedTheme.compositions[type].forEach(options => {
				for (const option in options) {
					let value = options[option],
						doRemove = true;
					if (/^@.+$/.test(value)) {
						doRemove = false;
						value = value.slice(1);
					}
					if (value in composedTheme) {
						const remove = value;
						options[option] = composedTheme[value];
						doRemove && delete composedTheme[remove];
					}
				}
			});
		}
		defaults.forEach(definition => {
			const composed = compose(definition, composedTheme);
			composedTheme[definition] = composed;
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
	bg: 'bg-white',
	ySpace: 'py-4',
	menuBg: 'custom-bg',
	width: 'max-w-6xl mx-auto',
	text: 'text-blue-800',
	sidebarW: '64',
	sidebarBorder: '',
	menuIcon: 'mr-3 h-5 w-5',
	topnavItem: 'mr-4 inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium leading-5 text-gray-500 hover:text-gray-700 hover:border-gray-300 focus:outline-none focus:text-gray-700 focus:border-gray-300 transition duration-150 ease-in-out',
	topnavItemActive: 'mr-4 inline-flex items-center px-1 pt-1 border-b-2 border-indigo-500 text-sm font-medium leading-5 text-gray-900 focus:outline-none focus:border-indigo-700 transition duration-150 ease-in-out',
	sidebarItem: 'mb-1 group flex pl-3 pr-4 py-2 border-l-4 border-transparent text-sm text-gray-600 hover:text-gray-800 hover:bg-gray-50 hover:border-gray-300 focus:outline-none focus:text-gray-800 focus:bg-gray-50 focus:border-gray-300 transition duration-150 ease-in-out',
	sidebarItemActive: 'mb-1 group flex pl-3 pr-4 py-2 border-l-4 border-indigo-500 text-sm font-medium text-indigo-700 bg-indigo-50 focus:outline-none focus:text-indigo-800 focus:bg-indigo-100 focus:border-indigo-700 transition duration-150 ease-in-out',
	headerBg: 'bg-white',
	headerShadow: '',
	contentBg: 'custom-bg',
	accent1: 'bg-gray-200',
	accent2: 'bg-gray-300',
	accent3: 'bg-gray-400',
	lighter: 'bg-gray-50',
	// buttons
	button: 'inline-flex items-center px-4 py-2 border border-gray-300 text-sm leading-5 font-medium rounded-md text-gray-700 bg-white hover:text-gray-500 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 active:text-gray-800 active:bg-gray-50 transition duration-150 ease-in-out',
	buttonPrimary: 'inline-flex items-center px-4 py-2 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:shadow-outline-indigo focus:border-indigo-700 active:bg-indigo-700 transition duration-150 ease-in-out',
	buttonText: 'text-sm text-blue-500 hover:text-blue-300',

	// table
	tableRow: 'bg-gray-50 border-b border-blue-100 hover:bg-blue-50',
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
	topnavItem: 'ml-3 my-3 px-3 py-1 inline-flex items-center rounded-md text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700',
	topnavItemActive: 'ml-3 my-3 px-3 py-1 inline-flex items-center rounded-md text-sm font-medium text-white bg-gray-900 focus:outline-none focus:text-white focus:bg-gray-700',
	sidebarItem: 'mt-1 group flex items-center px-2 py-2 text-sm leading-5 font-medium text-gray-300 rounded-md hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700 transition ease-in-out duration-150',
	sidebarItemActive: 'group flex items-center px-2 py-2 text-sm leading-5 font-medium text-white rounded-md bg-gray-900 focus:outline-none focus:bg-gray-700 transition ease-in-out duration-150',
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
	topnavItem: 'ml-3 my-3 px-3 py-1 inline-flex items-center rounded-md text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700',
	topnavItemActive: 'ml-3 my-3 px-3 py-1 inline-flex items-center rounded-md text-sm font-medium text-white bg-gray-900 focus:outline-none focus:text-white focus:bg-gray-700',
	sidebarItem: 'mt-1 group flex items-center px-2 py-2 text-sm leading-5 font-medium text-gray-300 rounded-md hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700 transition ease-in-out duration-150',
	sidebarItemActive: 'group flex items-center px-2 py-2 text-sm leading-5 font-medium text-white rounded-md bg-gray-900 focus:outline-none focus:bg-gray-700 transition ease-in-out duration-150',
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
	bg: 'bg-gray-100',
	shadow: 'shadow',
	ySpace: 'py-4',
	width: 'max-w-7xl mx-auto',
	menuBg: 'bg-gray-50',
	sidebarW: '48',
	sidebarBorder: 'border-r border-gray-200',
	text: 'text-gray-800',
	textLight: "text-gray-400",
	textContrast: "text-white",
	placeholder: 'placeholder-gray-400',
	menuIcon: 'mr-3 h-6 w-6',
	topMenuBorder: 'border-b border-gray-200',
	headerShadow: '',
	topnavItem: 'mr-4 inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium leading-5 text-gray-500 hover:text-gray-700 hover:border-gray-300 focus:outline-none focus:text-gray-700 focus:border-gray-300 transition duration-150 ease-in-out',
	topnavItemActive: 'mr-4 inline-flex items-center px-1 pt-1 border-b-2 border-indigo-500 text-sm font-medium leading-5 text-gray-900 bg-indigo-100 focus:outline-none hover:bg-indigo-200 focus:border-indigo-700 transition duration-150 ease-in-out',
	sidebarItem: 'mb-1 group flex pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 hover:text-gray-800 hover:bg-gray-200 hover:border-gray-300 focus:outline-none focus:text-gray-800 focus:bg-gray-50 focus:border-gray-300 transition duration-150 ease-in-out',
	sidebarItemActive: 'mb-1 group flex pl-3 pr-4 py-2 border-l-4 border-indigo-500 text-base font-medium text-indigo-600 bg-indigo-100 focus:outline-none hover:text-indigo-800 focus:text-indigo-800 hover:bg-indigo-200 focus:bg-indigo-200 focus:border-indigo-700 transition duration-150 ease-in-out',

	inputBg: "bg-white",

	headerBg: '',
	contentBg: 'bg-gray-100',
	accent1: 'bg-gray-200',
	accent2: 'bg-gray-300',
	accent3: 'bg-gray-400',
	accent4: 'bg-gray-500',
	lighter: 'bg-gray-50',

	scrollbar: "",

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

	tableRow: 'bg-white border-b border-gray-200 hover:bg-gray-50',
	tableRowStriped: 'bg-white even:bg-gray-50'
}

const button = [
	{ default: "rounded inline-flex items-center justify-center transition duration-150 ease-in-out disabled:cursor-not-allowed" }, // <-- applied to all buttons
	{ default: "button", // <-- this is pulled from the theme during composeDefaults and deleted
		Primary: "buttonPrimary", // <-- this is pulled from the theme during composeDefaults and deleted
		Success: "buttonSuccess",
		Danger: "buttonDanger",
		Text: "buttonText"
	},
	{ default: "py-1 px-4",
		Large: "py-2 px-6 text-lg rounded-md",
		Small: "py-0 px-4 text-sm"
	},
	{ Block: "w-full" }
]
const input = [
	{ default: "w-full block rounded cursor-pointer disabled:cursor-not-allowed" },
	{ default: "@text" }, // <-- text color pulled from theme, key reamins in theme
	{ default: "@placeholder" }, // <-- placeholder text color
	{ default: "@inputBg" }, // <== input BG color
	{ default: "py-1 px-2", // <<-- padding based on size
		Large: "py-2 px-4 text-lg rounded-md",
		Small: "py-0 px-1 text-sm"
	}
]
const compositions = {
	defaults: ["button", "buttonPrimary", "input"], // <-- these are generated in theme during composeDefaults
																				// these should be commonly used classNames
	button,
	input
}

const TEST_THEME_BASE = {
	...light,

	// button: "border border-gray-500 hover:border-gray-800 text-gray-500 hover:text-gray-800 disabled:text-gray-300 disabled:border-gray-300 disabled:bg-transparent",
	button: "border border-gray-500 hover:bg-gray-500 text-gray-500 hover:text-white disabled:text-gray-400 disabled:border-gray-400 disabled:bg-transparent",

	// buttonPrimary: "text-blue-400 border border-blue-400 hover:text-blue-700 hover:border-blue-700 disabled:opacity-50 disabled:text-blue-400 disabled:border-blue-400",
	buttonPrimary: "text-blue-400 border border-blue-400 hover:text-white hover:bg-blue-400 disabled:opacity-50 disabled:text-blue-400 disabled:border-blue-400 disabled:bg-transparent",

	// buttonSuccess: "text-green-400 border border-green-400 hover:bg-green-200 hover:text-green-700 hover:border-green-700 disabled:opacity-50 disabled:text-green-400 disabled:border-green-400",
	buttonSuccess: "text-green-400 border border-green-400 hover:bg-green-400 hover:text-white disabled:opacity-50 disabled:text-green-400 disabled:border-green-400 disabled:bg-transparent",

	// buttonDanger: "text-red-400 border border-red-400 hover:text-red-700 hover:border-red-700 disabled:opacity-50 disabled:text-red-400 disabled:border-red-400",
	buttonDanger: "text-red-400 border border-red-400 hover:text-white hover:bg-red-400 disabled:opacity-50 disabled:text-red-400 disabled:border-red-400 disabled:bg-transparent",

	buttonText: "border border-transparent hover:bg-gray-200 hover:border-gray-400",

	compositions
}
export const TEST_THEME =  new Proxy(composeDefaults(TEST_THEME_BASE), handler);

console.log("TEST_THEME", TEST_THEME)
