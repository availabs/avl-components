import React from "react"

import { ScalableLoading } from "../components/Loading/LoadingPage"

const DEFAULT_OPTIONS = {
  display: "fixed", // or absolute
  size: "screen", // or full
  scale: 1
}

export default (Component, options = {}) => {
  const OPTIONS = {
    ...DEFAULT_OPTIONS,
    ...options
  }
  return ({ ...props }) =>
    <>
      <Component { ...props }/>
      { !props.loading ? null :
        <div className={ `
            ${ OPTIONS.display } left-0 top-0
            w-${ OPTIONS.size } h-${ OPTIONS.size } z-50
            flex justify-center items-center
          ` }
          style={ { backgroundColor: "rgba(0, 0, 0, 0.5)" } }>
          <ScalableLoading scale={ OPTIONS.scale } color={ OPTIONS.color }/>
        </div>
      }
    </>
}
