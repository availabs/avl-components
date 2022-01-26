import { Button } from "./index";
//import { useTheme } from "../../wrappers";

// const Identity = (i) => i;

export default {
	name: "Button",
	description: "A button, click it. ",
	
	props: [],
	theme: [""],
	dependencies: [],
	examples:[
		{
			title: 'Simple Button',
			props: [],
			Component: (props) => {
				return (
					<div className="h-full w-full bg-gray-100">
						<div className="w-96 mx-auto p-12">
							<Button {...props} primary>
								<span className="os-icon os-icon-package pr-2" /> Button Text
							</Button>
						</div>
					</div>
				);
			},
		}
	]
};
