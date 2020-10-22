import React, { Component } from 'react';

// import * as themes from '../Themes'

import SideNav from '../Nav/Side'
import TopNav from '../Nav/Top'
// import HeaderBar from '../HeaderBar'

import HeaderBar from "../Header/HeaderComponent"


class Layout extends Component {
  state = {
    menuOpen: false
  }
  static defaultProps = {
      fixed: false,
      maxWidth: '',
      headerBar: true,
      nav: 'side',
      theme: 'light'
  }

  toggleMenu = () => {
    this.setState({menuOpen: !this.state.menuOpen})
  }

  render () {
    const theme = this.props.theme;//themes[this.props.theme]
    return (
      <div className={`${theme.bg}`}>
        {this.props.nav === 'top' ? (
          <div className={this.props.fixed ? `fixed left-0 top-0 w-full z-10` : ''}>
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
          <div className={`${this.props.fixed ? `fixed left-0 top-0 w-full z-10 ${this.props.nav === 'top' ? '' : '' }` : ''}`}>
            <div className={`${this.props.maxWidth} mx-auto`} >
              <HeaderBar title=""
                toggle={this.toggleMenu}
                menu={this.props.headerMenu}
                fixed={this.props.fixed}
                
              />
            </div>
          </div>
        ) : null }
      	<div className={ `min-h-screen ${this.props.maxWidth} mx-auto` }>
          <div className="flex min-h-screen">
            { this.props.nav === 'side' ? (
              <SideNav
                open={this.state.menuOpen}
                toggle={this.toggleMenu}
                menuItems={this.props.menus}
                fixed={this.props.fixed}
                />) : null
            }
            <div className="flex-1">
              <main className={`
                  flex-1 z-0 focus:outline-none
                  ${this.props.headerBar ? "mt-16" : ''}
                  ${this.props.fixed && this.props.nav === 'side' ?  `md:ml-${theme.sidebarW}` : '' }
                  ${this.props.fixed && this.props.nav === 'top' ?  `` : '' }

                  `
                }
              >
                  { this.props.children }
              </main>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Layout
