import React from "react"

import { ScalableLoading } from "../components/Loading/LoadingPage"

export default (Component, options = {}) =>
  ({ loading, ...props }) =>
    !loading ? <Component { ...props }/> :
    <div>
      <Component { ...props }/>
      <div className="fixed left-0 top-0 w-screen h-screen z-50 flex justify-center items-center"
        style={ { backgroundColor: "rgba(0, 0, 0, 0.5)" } }>
        <ScalableLoading scale={ options.scale || 1 }/>
      </div>
    </div>
