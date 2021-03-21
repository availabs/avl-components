import React from 'react'
import { useTheme } from "../../wrappers/with-theme"

export const Content = ({ children, className = "", ...rest }) => {
	const theme = useTheme();
	return (
		<div { ...rest }
			className={ `
				mx-auto ${ className }
				${ theme.contentWidth } ${ theme.contentPadding }
			` }>
				{ children }
			</div>
	)
}
