import React from 'react'
import { useTheme } from "../../wrappers/with-theme"

export const div = ({children, ...rest}) => <div {...rest}>{children}</div>
export const card = ({children, ...rest}) => <div {...rest} className={'bg-white rounded shadow ' +rest.className}>{children}</div>
export const Content = ({children, ...rest}) => {
	const theme = useTheme();
	return (<div className={`${theme.width} ${theme.ySpace}`}{...rest}>{children}</div>)
} 
