import React from "react";
import { Link, useRouteMatch } from "react-router-dom";

import Icon from "../Icons";

import { useTheme } from "../../wrappers/with-theme";

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
}) => {
	const theme = useTheme();

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

	const [showSubMenu, setShowSubMenu] = React.useState(false);

	return (
		<div
			className={`
				items-stretch ${type === "side" ? "block" : "flex"}
			`}
			onMouseLeave={(e) => setShowSubMenu(false)}
			onMouseOver={(e) => setShowSubMenu(true)}
		>
			{To[0] ? (
				<Link to={To[0]} className={`${className ? className : navClass}`}>
					{!icon ? null : (
						<Icon
							icon={icon}
							className={
								type === "side" ? theme.menuIconSide : theme.menuIconTop
							}
						/>
					)}
					{children}
				</Link>
			) : (
				<div
					onClick={onClick ? onClick : () => {}}
					className={`${className ? className : navClass}`}
				>
					{!icon ? null : (
						<Icon
							icon={icon}
							className={
								type === "side" ? theme.menuIconSide : theme.menuIconTop
							}
						/>
					)}

					{children}
				</div>
			)}

			{!showSubMenu || !subMenus.length ? null : (
				<div className={`absolute ${type === "side" ? 'pt-1 -mt-14  left-full' : 'top-full'}`}>
					<div
						className={`
							flex
							
						`}
						
					>
						<div
							className={`
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
								<NavItem key={i} to={sm.path} icon={sm.icon} type={type}>
									{sm.name}
								</NavItem>
							))}
						</div>
					</div>
				</div>
			)}
		</div>
	);
};
export default NavItem;
