import React from 'react';

import SideNav from '../Nav/Side'
import TopNav from '../Nav/Top'
import { useTheme } from "../../wrappers/with-theme"

import HeaderComponent from "../Header/HeaderComponent"

import get from "lodash.get"

import { DEFAULT_TOP_NAV_HEIGHT } from "../constants"

const FixedLayout = ({ header, headerBar = true,
                        nav, navBar = "side",
                        userMenu = "header",
                        menus = [], menuItems, ...props }) => {
  const [open, setOpen] = React.useState(false),
    toggle = React.useCallback(e => {
      setOpen(open => !open);
    }, []);

  const theme = useTheme();

  navBar = nav || navBar;
  headerBar = header || headerBar;
  menuItems = menuItems || menus;

  return (
    <div className={ `
      ${ theme.bg } ${ theme.text }
      min-h-screen w-full flex flex-col
    ` }>
      { navBar !== 'top' ? null : (
          <div className={ `fixed left-0 top-0 right-0 z-10` }>
            <TopNav { ...props }
              menuItems={ menuItems }
              open={ open }
              toggle={ toggle }
              userMenu={ !headerBar || userMenu === "nav" }/>
          </div>
        )
      }
      { !headerBar ? null : (
          <div className={ `
            fixed left-0 top-0 right-0 z-10
            ${ navBar === 'side' ? `md:ml-${ theme.sidebarW } ` : '' }
          ` }>
            <HeaderComponent
              userMenu={ userMenu === "header" }
              title={ get(headerBar, "title", null) }>
              { get(props, ["headerBar", "children"], [])
                  .map((child, i) =>
                    typeof child === "function" ?
                      React.createElement(child, { key: i }) :
                    typeof child === "string" ? child :
                    React.cloneElement(child, { key: i })
                  )
              }
            </HeaderComponent>
          </div>
        )
      }

      { navBar !== 'side' ? null : (
        <SideNav { ...props }
          menuItems={ menuItems }
          open={ open }
          toggle={ toggle }
          userMenu={ !headerBar || userMenu === "nav" }/>
        )
      }

      <div className={ `
        flex-1 flex
        ${ headerBar || (navBar === "top") ?
          `pt-${ theme.topNavHeight || DEFAULT_TOP_NAV_HEIGHT }` : ''
        }
        ${ navBar === 'side' ? `md:pl-${ theme.sidebarW }` : '' }
      ` } style={ { alignItems: "stretch", justifyContent: "stretch" } }>
        <div className="w-full">
          <div className="w-full h-full">
            { props.children }
          </div>
        </div>
      </div>

    </div>
  )
}
export default FixedLayout
