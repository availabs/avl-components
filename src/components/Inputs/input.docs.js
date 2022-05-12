import { Input } from "./index";
import React from "react";
//import { useTheme } from "../../wrappers";

// const Identity = (i) => i;

export default {
	name: "Input",
	themeVar: 'input',
	description: "Input",
	props: [],
	examples:[
		{
			title: 'Simple Input',
			props: [{}],
			Component: (props) => {
				const [content, setContent] = React.useState('')
				return (
					<div className="h-full w-full bg-gray-100">
						<div className="w-96 mx-auto p-12">
							<Input
								{...props}
								value={content}
								onChange={e => setContent(e)}
							/>
						</div>
					</div>
				);
			},
		}
	]
};
