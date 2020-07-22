import React from 'react'
// import TrackVisibility from 'react-on-screen';
// import CensusCharts from 'components/CensusCharts'

import BaseWrappers from "./wrappers"

import get from "lodash.get"

let ComponentLibrary = {
}

let WrapperLibrary = {
  ...BaseWrappers
}

export const addComponents = comps => {
  ComponentLibrary = {
    ...ComponentLibrary,
    ...comps
  }
}
export const addWrappers = wraps => {
  WrapperLibrary = {
    ...WrapperLibrary,
    ...wraps
  }
}

const getKey = (config, i) => get(config, "key", `key-${ i }`);

const getBasicJSX = config => ({ children, ...props }) =>
  <config.type { ...props }>
    { children }
  </config.type>

const getComponent = config =>
  typeof config === "function" ? config :
  typeof config === "string" ? () => <React.Fragment>{ config }</React.Fragment> :
  typeof config.type === "function" ? config.type :
  get(ComponentLibrary, config.type, getBasicJSX(config));

const applyWrappers = (Component, config) => {
  return get(config, "wrappers", [])
    .reduce((a, c) => {
      if (typeof c === "string") {
        return get(WrapperLibrary, c, d => d)(a);
      }
      else if (typeof c === "function") {
        return c(a);
      }
      else if (typeof c === "object") {
        const { type, options } = c;
        return get(WrapperLibrary, type, d => d)(a, options);
      }
      return a;
    }, Component);
}

const processConfig = (config, i = 0) => {
  const Component = applyWrappers(getComponent(config), config),
    children = get(config, "children", []);

// console.log("CHILDEN:", children)
// console.log("CONFIG PROPS:", config.props)
  return React.createElement(Component,
    { ...config.props, key: getKey(config, i) },
    children.map((child, i) => processConfig(child, i))
  );
}

export default ({ config }) => processConfig(config)
