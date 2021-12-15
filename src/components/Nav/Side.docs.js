import SideNav from "./Side";

const SideNavDocs = {
	name: "Side Nav",
	description: "A responsive vertical navigation component.",
	examples: [
		{
			Component: (props) => (
				<div className="h-full w-full bg-gray-100">
					<SideNav {...props} />
				</div>
			),
			title: 'Side bar with icons',
			props: [
				{
					name: "menuItems",
					type: "data",
					default: [
						{
							name: "Layouts",
							className: "font-light text-xs uppercase pl-6 text-blue-500 py-3",
						},
						{
							name: "Dashboard",
							icon: "os-icon os-icon-layout",
							active: true,
						},
						{
							name: "Menu Styles",
							icon: "os-icon os-icon-layers",
						},
						{
							name: "Options",
							className: "font-light text-xs uppercase pl-6 text-blue-500 py-3",
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
							name: "UI Kit",
							icon: "os-icon os-icon-life-buoy",
						},
						{
							name: "Elements",
							className: "font-light text-xs uppercase pl-6 text-blue-500 py-3",
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
						{
							name: "Tables",
							icon: "os-icon os-icon-zap",
						},
					],
				},
			],
			dependencies: [
				{
					name: "Nav Item",
					theme: ["navitemSide", "navitemSideActive", "menuIcon", "menuIcon"],
				},
			],
			code: `
			import {SideNav} from "@availabs/avl-components"; 
				
			const MySideBar = (props) => {
				return (
					<div className="h-full w-full bg-gray-100">
								<SideNav {...props} />
						</div>
					);
			};			
			`,
		},

		{
			Component: (props) => (
				<div className="h-full w-full bg-gray-100">
					<SideNav {...props} />
				</div>
			),
			title: 'Side bar without icons',
			props: [
				{
					name: "menuItems",
					type: "data",
					default: [
						{
							name: "Layouts",
							className: "font-light text-xs uppercase pl-6 text-blue-500 py-3",
						},
						{
							name: "Dashboard",
							active: true,
						},
						{
							name: "Menu Styles",
						},
						{
							name: "Options",
							className: "font-light text-xs uppercase pl-6 text-blue-500 py-3",
						},
						{
							name: "Applications",
						},
						{
							name: "Pages",
						},
						{
							name: "UI Kit",
						},
						{
							name: "Elements",
							className: "font-light text-xs uppercase pl-6 text-blue-500 py-3",
						},
						{
							name: "Emails",
						},
						{
							name: "Users",
						},
						{
							name: "Forms",
						},
						{
							name: "Tables",
						},
						{
							name: "Tables",
						},
					],
				},
			],
			dependencies: [
				{
					name: "Nav Item",
					theme: ["navitemSide", "navitemSideActive"],
				},
			],
			code: `
			import {SideNav} from "@availabs/avl-components"; 
				
			const MySideBar = (props) => {
				return (
					<div className="h-full w-full bg-gray-100">
								<SideNav {...props} />
						</div>
					);
			};			
			`,
		},
	],
};

export default SideNavDocs;
