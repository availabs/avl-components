import React from 'react'
// import TrackVisibility from 'react-on-screen';
// import CensusCharts from 'components/CensusCharts'

// import DmsComponents from "components/DMS"
// import DmsWrappers from "components/DMS/wrappers"

import BaseWrappers from "./wrappers"

import get from "lodash.get"

const ComponentLibrary = {
    //...CensusCharts,
    //...DmsComponents
}

const Wrappers = {
  //...DmsWrappers,
  ...BaseWrappers
}

const getKey = (config, i) => get(config, "key", `key-${ i }`);

const BasicJSX = ({ Comp, props, children }) =>
  <Comp { ...props }>{ children }</Comp>

const getBasicJSX = config => ({ children }) =>
  <BasicJSX Comp={ config.type } props={ get(config, "props", {}) }>
    { children }
  </BasicJSX>

const getComponent = config =>
  typeof config === "function" ? config :
  typeof config === "string" ? () => <React.Fragment>{ config }</React.Fragment> :
  get(ComponentLibrary, config.type, getBasicJSX(config));

const applyWrappers = (Component, config) => {
  return get(config, "wrappers", [])
    .reduce((a, c) => {
      if (typeof c === "string") {
        return get(Wrappers, c, d => d)(a);
      }
      else if (typeof c === "function") {
        return c(a);
      }
      else if (typeof c === "object") {
        const { type, options } = c;
        return get(Wrappers, type, d => d)(a, options);
      }
      return a;
    }, Component);
}

const processConfig = (config, i = 0) => {
  const Component = applyWrappers(getComponent(config), config),
    children = get(config, "children", []);

// console.log("CONFIG PROPS:", config.props)
  return React.createElement(Component,
    { ...config.props, key: getKey(config, i) },
    children.map((child, i) => processConfig(child, i))
  );
}

export default ({ config, ...rest }) => processConfig(config)
