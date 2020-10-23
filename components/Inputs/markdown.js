import React from "react"

import { Button } from "../Button"

import { composeOptions } from "../utils"
import { useTheme } from "../../wrappers/with-theme"

import MarkdownRenderer from "react-markdown-renderer"

import "./styles.css"

export default React.forwardRef(({ large, small, className = "", children, onChange, value, ...props }, ref) => {
  const [editing, setEditing] = React.useState(false);

  const theme = useTheme(),
    inputTheme = theme[`input${ composeOptions({ large, small }) }`];

  return (
    <div onClick={ e => setEditing(true) }>
      { editing ?
        <div>
          <div className="mb-2">
            <Button onClick={ e => (e.stopPropagation(), setEditing(false)) }>
              preview
            </Button>
          </div>
          <div>
            <textarea { ...props } onChange={ e => onChange(e.target.value) } value={ value || "" }
              className={ `${ inputTheme } ${ className }` } ref={ ref } rows={ 6 }/>
          </div>
        </div>
      :
     		<MarkdownRenderer markdown={ value || "" }
          className={ `markdown-renderer ${ inputTheme } ${ className }` }
          style={ { minHeight: "2rem" } }
          options={ { html: true } }/>
      }
    </div>
  )
})
