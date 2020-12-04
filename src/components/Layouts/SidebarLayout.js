import React, { Component } from 'react';

import SideNav from '../Nav/Side'
import TopNav from '../Nav/Top'

import HeaderBar from "../Header/HeaderComponent"

import get from "lodash.get"

class Layout extends Component {
  state = {
    menuOpen: false
  }
  static defaultProps = {
      fixed: false,
      maxWidth: '',
      headerBar: true,
      navBar: 'side'
  }

  toggleMenu = () => {
    this.setState({menuOpen: !this.state.menuOpen})
  }

  render () {
    const theme = this.props.theme;//themes[this.props.theme]
    return (
      <div className={ `
          ${ theme.bg } ${ theme.text } min-h-screen w-full flex flex-col
        ` }>
        {this.props.navBar === 'top' ? (
          <div className={this.props.fixed ? `fixed left-0 top-0 w-full z-10` : `w-full`}>
            <TopNav
              logo={this.props.logo}
              open={this.state.menuOpen}
              toggle={this.toggleMenu}
              menuItems={this.props.menus}
              fixed={this.props.fixed}
              width={this.props.maxWidth}
            />
          </div>
        ) : null }
        {this.props.headerBar ? (
          <div className={`${this.props.fixed ? `fixed left-0 top-0 w-full z-10 ${this.props.navBar === 'top' ? '' : '' }` : ''}`}>
            <div className={`${this.props.maxWidth} mx-auto`} >
              <HeaderBar
                title={ get(this.props, ["headerBar", "title"], null) }>
                { get(this.props, ["headerBar", "children"], [])
                    .map((child, i) =>
                      typeof child === "function" ?
                        React.createElement(child, { key: i }) :
                      typeof child === "string" ? child :
                        React.cloneElement(child, { key: i })
                    )
                }
              </HeaderBar>
            </div>
          </div>
        ) : null }

      	<div className={ `flex-1 flex items-stretch flex-col  ${this.props.maxWidth ? this.props.maxWidth : 'w-full'}` }>

            { this.props.navBar === 'side' ? (
              <SideNav
                open={this.state.menuOpen}
                toggle={this.toggleMenu}
                menuItems={this.props.menus}
                fixed={this.props.fixed}
                />) : null
            }

            <div className={`
                h-full flex-1 flex flex-col
                ${this.props.headerBar || this.props.navBar === "top" ? "mt-16" : ''}
                ${this.props.fixed && this.props.navBar === 'side' ?  `md:ml-${theme.sidebarW}` : '' }
                ${this.props.fixed && this.props.navBar === 'top' ?  `` : '' }`
              }
            >
                { this.props.children }
            </div>


        </div>
      </div>
    )
  }
}

export default Layout
