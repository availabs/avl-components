import TopNav from "./Top";
//import { useTheme } from "../../wrappers";

export default {
	name: "Top Nav",
	description: "A responsive horizontal navigation component.",
	examples: [
		{
			Component: (props) => {
				return (
					<div className="h-full w-full bg-gray-100">
						<TopNav {...props} />
					</div>
				);
			},
			props: [
				{
					name: "menuItems",
					type: "data",
					default: [
						{
							name: "Hello",
							icon: "os-icon os-icon-layout",
							active: true,
						},

						{
							name: "Applications",
							icon: "os-icon os-icon-package",
						},
						{
							name: "Pages",
							icon: "os-icon os-icon-file-text",
						},

						{
							name: "Emails",
							icon: "os-icon os-icon-mail",
						},
						{
							name: "Users",
							icon: "os-icon os-icon-users",
						},
						{
							name: "Forms",
							icon: "os-icon os-icon-edit-32",
						},
						{
							name: "Tables",
							icon: "os-icon os-icon-grid",
						},
					],
				},
				{
					name: "leftMenu",
					type: "Component",
					default: (
						<div className="flex items-center p-4 justify-center h-12">
							<span className="text-lg font-medium uppercase">AVL Design</span>
						</div>
					),
				},
				{
					name: "rightMenu",
					type: "Component",
					default: (
						<div className="flex items-center md:w-32 justify-center h-12 w-full hover:bg-gray-400 hover:text-white">
							<span className="text-sm cursor-pointer">Login</span>
						</div>
					),
				},
			],
			theme: ["sidebarWrapper"],
			dependencies: [
				{
					name: "Nav Item",
					theme: ["navitemTop", "navitemTopActive", "menuIcon", "menuIcon"],
				},
			],
		},
	],
};
