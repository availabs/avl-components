import React, { useState } from "react";

import get from "lodash.get";

import { useTheme } from "../../wrappers/with-theme";
import NavItem from "./Item";

const MobileMenu = ({ open, toggle, menuItems = [], rightMenu = null }) => {
  const theme = useTheme();

  return (
    <div
      className={`${open ? "md:hidden" : "hidden"} ${
        theme.topnavMobileContainer
      }`}
      id="mobile-menu"
    >
      <div className="">
        {menuItems.map((page, i) => (
          <NavItem
            key={i}
            type="top"
            to={page.path}
            icon={page.icon}
            subMenus={get(page, "subMenus", [])}
          >
            {page.name}
          </NavItem>
        ))}
      </div>
      <div className="">{rightMenu}</div>
    </div>
  );
};

const DesktopMenu = ({
  open,
  toggle,
  menuItems = [],
  rightMenu = null,
  leftMenu = null,
}) => {
  const theme = useTheme();
  return (
    <div className={`${theme.topnavWrapper}`}>
      <div className={`${theme.topnavContent} justify-between`}>
        <div>{leftMenu}</div>
        <div className={`${theme.topnavMenu}`}>
          {menuItems.map((page, i) => (
            <NavItem
              key={i}
              type="top"
              to={page.path}
              icon={page.icon}
              subMenus={get(page, "subMenus", [])}
            >
              {page.name}
            </NavItem>
          ))}
        </div>

        <div className="flex items-center justify-center h-full">
          <div className={`${theme.topmenuRightNavContainer}`}>{rightMenu}</div>

          {/*<!-- Mobile menu button -->*/}
          <button
            type="button"
            className="md:hidden bg-white inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-300"
            onClick={() => toggle(!open)}
          >
            <span className="sr-only">Open main menu</span>
            <div className={`flex justify-center items-center text-2xl`}>
              <span
                className={!open ? theme.menuOpenIcon : theme.menuCloseIcon}
              />
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

const TopNav = ({ ...props }) => {
  const [open, setOpen] = useState(false);
  return (
    <nav>
      <DesktopMenu open={open} toggle={setOpen} {...props} />
      <MobileMenu open={open} {...props} />
    </nav>
  );
};
export default TopNav;
