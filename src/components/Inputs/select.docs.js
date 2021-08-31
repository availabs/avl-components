import Select from "./select";
//import { useTheme } from "../../wrappers";

const Identity = (i) => i;

export default {
	Component: (props) => {
		return (
			<div className="h-full w-full bg-gray-100">
				<div className="w-96 mx-auto py-12">
					Select:
					<Select {...props} />
				</div>
			</div>
		);
	},
	name: "Select",
	description: "Select component supports, multi, search ",
	props: [
		{ name: "multi", default: true, type: "Boolean" },
		{ name: "searchable", default: true, type: "Boolean" },
		{ name: "domain", default: [], type: "Array" },
		{ name: "options", default: [], type: "Array" },
		{ name: "value", default: null, type: "String" },
		{ name: "placeholder", default: "Select a value...", type: "String" },
		{ name: "accessor", default: Identity, type: "Boolean" },
		{ name: "valueAccessor", default: Identity, type: "Boolean" },
		{ name: "displayAccessor", default: null, type: "Function" },
		{ name: "listAccessor", default: null, type: "Function" },
		{ name: "id", default: "avl-select", type: "String" },
		{ name: "autoFocus", default: false, type: "Boolean" },
		{ name: "disabled", default: false, type: "Boolean" },
		{ name: "removable", default: true, type: "Boolean" },
	],
	theme: ["sidebarWrapper"],
	dependencies: [],
};
