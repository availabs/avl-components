import React from "react"

import { ScalableLoading } from "../components/Loading/LoadingPage"

export default (Component, options = {}) => {
  const {
    display = "fixed",
    scale = 1
  } = options;
  const size = options.size || (display === "fixed" ? "screen" : "full")
  return ({ ...props }) =>
    <>
      <Component { ...props }/>
      { !props.loading ? null :
        <div className={ `
            ${ display } left-0 top-0
            w-${ size } h-${ size } z-50
            flex justify-center items-center
          ` }
          style={ { backgroundColor: "rgba(0, 0, 0, 0.5)" } }>
          <ScalableLoading scale={ scale } color={ options.color }/>
        </div>
      }
    </>
}
