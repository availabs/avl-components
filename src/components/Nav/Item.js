import React from "react";
import { useRouteMatch, useHistory } from "react-router-dom";

import Icon from "../Icons";

import { useTheme } from "../../wrappers";

import get from "lodash.get";

const NavItem = ({
	children,
	icon,
	to,
	onClick,
	className = null,
	type = "side",
	active = false,
	subMenus = [],
	themeOptions,
	subMenuActivate = 'onClick',
	subMenuStyle = 'inline'
}) => {
	const theme = useTheme()[type === 'side' ? 'sidenav' : 'topnav'](themeOptions);
	const subMenuArrowHeadMapping = {
		inline: 'down',
		flyout: 'right2'
	}
	const history = useHistory();
	const To = React.useMemo(() => {
		if (!Array.isArray(to)) {
			return [to];
		}
		return to;
	}, [to]);

	const subTos = React.useMemo(() => {
		const subs = subMenus.reduce((a, c) => {
			if (Array.isArray(c.path)) {
				a.push(...c.path);
			} else if (c.path) {
				a.push(c.path);
			}
			return a;
		}, []);
		return [...To, ...subs];
	}, [To, subMenus]);

	const routeMatch = Boolean(useRouteMatch({ path: subTos, exact: true }));

	const linkClasses = type === "side" ? theme.navitemSide : theme.navitemTop;
	const activeClasses =
		type === "side" ? theme.navitemSideActive : theme.navitemTopActive;

	const navClass = routeMatch || active ? activeClasses : linkClasses;

	const [showSubMenu, setShowSubMenu] = React.useState(subMenuActivate === 'active');

	return (
		<div
			onClick={() => subMenuActivate === 'onClick' ? setShowSubMenu(!showSubMenu) : ''}
			onMouseLeave={() => subMenuActivate === 'onHover' ? setShowSubMenu(false) : ''}
			 onMouseOver={() => subMenuActivate === 'onHover' ? setShowSubMenu(true) : ''}
		>
			<div
				onClick={
					!subMenus.length && onClick ? onClick
							: () => {
								if (!subMenus.length && To[0]) {
									history.push(To[0]);
								}
							}
				}
				className={`${className ? className : navClass}`}
			>
				{!icon ? null : (
					<Icon
						icon={icon}
						className={type === "side" ? theme.menuIconSide : theme.menuIconTop}
					/>
				)}
				{children}
				{subMenus.length ? <Icon icon={`os-icon os-icon-arrow-${subMenuArrowHeadMapping[subMenuStyle]}`}/> : null}
			</div>
			<SubMenu showSubMenu={showSubMenu} subMenus={subMenus} type={type} subMenuStyle={subMenuStyle} themeOptions={themeOptions} className={className}/>
		</div>
	);
};
export default NavItem;

const SubMenu = ({ showSubMenu, subMenus, type, subMenuStyle, themeOptions, className }) => {
	const theme = useTheme()[type === 'side' ? 'sidenav' : 'topnav'](themeOptions);
	if (!showSubMenu || !subMenus.length) {
		return null;
	}
	return (
		<div
			className={
				subMenuStyle === 'inline' ? `ml-5`:
				`absolute ${
				type === "side" ? "absolute -mt-10" : "top-full"
			}`}

			style={subMenuStyle === 'flyout' ? {
				marginLeft:
					type === "top"
						? null
						: `${+get(theme, "sidebarW", 64) * 0.10}rem`,
				paddingLeft:
					type === "top"
						? null
						: `${+get(theme, "sidebarW", 64) * 0.05}rem`,
			} : null}
		>
			<div className={`flex`}>
				<div
					className={` ${subMenuStyle === 'flyout' ? theme.contentBg : ''}
						flex whitespace-nowrap 
						${type === "side" ? "flex-col" : "flex-row"}
					`}
					style={{
						minWidth:
							type === "top"
								? null
								: `${+get(theme, "sidebarW", 64) * 0.25}rem`,
					}}
				>
					{subMenus.map((sm, i) => (
						<NavItem key={i} to={sm.path} icon={sm.icon} type={type} className={className} themeOptions={themeOptions}>
							{sm.name}
						</NavItem>
					))}
				</div>
			</div>
		</div>
	);
};
