// import React from 'react'
// import { useTheme } from "../../wrappers/with-theme"
//
//
// const TabPanel = ({tabs,activeIndex=0,setActiveIndex=null}, ...rest) => {
// 	const [activeTabIndex, setActiveTabIndex] = React.useState(activeIndex)
//
// 	// ----------
// 	// when activeIndex is passed by props
// 	// update it on change
// 	// ----------
// 	React.useEffect(()=>{
// 		setActiveTabIndex(activeIndex)
// 	},[activeIndex])
//
// 	return(
// 		<div>
// 			<div>
// 	            { tabs.map(({ icon }, i) => (
// 	                <div key={ i } onClick={ e => setActiveIndex ? setActiveIndex(i) : setActiveTabIndex(i)  }
// 	                  className={ `
// 	                    p-1 rounded-t-lg  first:ml-l
// 	                    ${ theme.menuBg } inline-block
// 	                  ` }>
// 	                  <div className={ `
// 	                      w-10 h-9 hover:${ theme.bg } rounded-t-lg transition
// 	                      ${ i === sidebarTabIndex ?
// 	                        `${ theme.bg } ${ theme.menuTextActive }` :
// 	                        `${ theme.menuBg} cursor-pointer`
// 	                      } hover:${ theme.menuTextActive }
// 	                      flex items-center justify-center
// 	                    ` }>
// 	                      <span className={ `fa fa-lg ${ icon }` }/>
// 	                    </div>
// 	                  </div>
// 	                ))
// 	            }
//           	</div>
// 	        <div>
// 	            { tabs.map(({ Component }, i) => (
// 	                <div key={ i } className="relative z-10"
// 	                  style={ { display: i === sidebarTabIndex ? "block" : "none" } }>
// 	                  <Component { ...rest } />
// 	                </div>
// 	              ))
// 	            }
// 	        </div>
// 		<div>
// 	)
// }