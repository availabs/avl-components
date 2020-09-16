import React, { Component } from 'react';

class Layout extends Component {
  static defaultProps = {
      fixed: false,
      maxWidth: '',
      nav: 'side',
      theme: 'light'
  }

  render () {
    const theme = this.props.theme;//themes[this.props.theme]
    return (
      <div className={`${theme.bg}`}>
      	<div className={`min-h-screen ${this.props.maxWidth} mx-auto overflow-hidden`} >
          <div className="flex h-full">
            <div className="w-0 flex-1 overflow-hidden">
              <main className={`flex-1 z-0 focus:outline-none min-h-screen h-full`}>
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
