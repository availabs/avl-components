import React from "react"

import { Link } from "react-router-dom"

import { useClickOutside } from "../utils"
import { useTheme } from "../../wrappers/with-theme"

const Dropdown = ({ control, children, customTheme,className }) => {
    const [open, setOpen] = React.useState(false),
        clickedOutside = React.useCallback(() => setOpen(false), []),
        [setRef] = useClickOutside(clickedOutside),
        theme = {...useTheme(), ...customTheme};
    return (
        <div ref={ setRef }
             className={`h-full relative cursor-pointer ${className}` }
             onMouseEnter={ e => setOpen(true) }
             onMouseLeave={ e => setOpen(false) }
             onClick={ e => {
                 e.preventDefault();
                 setOpen(!open)
             } }
        >
            {control}
            {open ?
                <div className={ `shadow fixed w-full rounded-b-lg ${open ? `block` : `hidden`} z-10` }>
                    { children }
                </div> : ''
                
            }
        </div>
    )
}

export default Dropdown

