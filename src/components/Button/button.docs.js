import { Button } from "./index";
//import { useTheme } from "../../wrappers";

const Identity = (i) => i;

export default {
	Component: (props) => {
		return (
			<div className="h-full w-full bg-gray-100">
				<div className="w-96 mx-auto py-12">
					<div>Button:</div>
					<Button {...props} block={true}>
						<span className="os-icon os-icon-package pr-2" /> Button Text
					</Button>
				</div>
			</div>
		);
	},
	name: "Button",
	description: "A button, click it. ",
	props: [],
	theme: [""],
	dependencies: [],
};
