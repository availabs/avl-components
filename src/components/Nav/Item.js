import React from "react";
import { Link, useRouteMatch } from "react-router-dom";

import Icon from "../Icons";

import { useTheme } from "../../wrappers/with-theme"

import get from "lodash.get"

const STYLES = {
	side: {
		top: "0%", left: "100%"
	},
	top: {
		top: "100%", left: "50%",
		transform: "translateX(-50%)"
	}
}

const NavItem = ({ to, icon, customTheme = {}, className = "", children, type='side', subMenus = [] }) => {

	const theme = { ...useTheme(), ...customTheme };

	const To = React.useMemo(() => {
		if (!Array.isArray(to)) {
			return [to];
		}
		return to;
	}, [to])

	const subTos = React.useMemo(() => {
		const subs = subMenus.reduce((a, c) => {
			if (Array.isArray(c.path)) {
				a.push(...c.path);
			}
			else if (c.path) {
				a.push(c.path);
			}
			return a;
		}, []);
		return [...To, ...subs];
	}, [To, subMenus]);

	const routeMatch = Boolean(useRouteMatch({ path: subTos, exact: true }));

	const linkClasses = type === 'side' ? theme.navitemSide : theme.navitemTop,
		activeClasses = type === 'side' ? theme.navitemSideActive : theme.navitemTopActive;

	const navClass = routeMatch ? activeClasses : linkClasses;

	const [showSubMenu, setShowSubMenu] = React.useState(false);

  return (
		<div className={ `
				relative ${ type === "side" ? "block" : "flex" }
			` }
			style={ { alignItems: "stretch" } }
			onMouseLeave={ e => setShowSubMenu(false) }
			onMouseOver={ e => setShowSubMenu(true) }>

	    <Link to={ To[0] } className={ `${ className } ${ navClass }` }>

	      { !icon ? null :
					<Icon icon={ icon }
						className={ theme.menuIcon || null }
						showBlank={ type === "side" }/>
				}

	      { children }

	    </Link>

			{ !showSubMenu || !subMenus.length ? null :
				<div className={ `
						absolute flex
						${ type === "side" ? `pl-1` : "h-10" }
					` }
					style={ STYLES[type] }>
					<div className={ `
							flex whitespace-nowrap
							${ type === "side" ? `flex-col` : "flex-row" }
						` }
						style={ {
							minWidth: type === "top" ? null :
								`${ +get(theme, "sidebarW", 64) * 0.25 }rem`
						} }>

						{ subMenus.map((sm, i) => (
								<NavItem key={ i } to={ sm.path } icon={ sm.icon }
									customTheme={ customTheme } type={ type }>
									{ sm.name }
								</NavItem>
							))
						}
					</div>
				</div>
			}
		</div>
  );
};
export default NavItem;
