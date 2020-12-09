import React from "react"

import debounce from "lodash.debounce"

export * from "./falcorGraph"

const FalcorContext = React.createContext();

export const FalcorProvider = ({ falcor, children }) => {
  const [falcorCache, setFalcorCache] = React.useState({});

  const updateCache = React.useMemo(() =>
    debounce(() =>
      setFalcorCache(falcor.getCache())
    , 250)
  , [falcor]);

  React.useEffect(() => {
    falcor.onChange(updateCache);
    return () => {
      falcor.remove(updateCache);
    }
  }, [falcor, updateCache]);

  const falcorValue = React.useMemo(() =>
    ({ falcor, falcorCache })
  , [falcor, falcorCache]);

  return (
    <FalcorContext.Provider value={ falcorValue }>
      { children }
    </FalcorContext.Provider>
  )
}
export const avlFalcor = Component =>
  props => (
    <FalcorContext.Consumer>
      { falcor =>
          <Component { ...props } { ...falcor }/>
      }
    </FalcorContext.Consumer>
  )
