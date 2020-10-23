import React from "react"

import { Button } from "../Button"

import { composeOptions, useSetRefs } from "../utils"
import { useTheme } from "../../wrappers/with-theme"

import MarkdownRenderer from "react-markdown-renderer"

import "./styles.css"

export default React.forwardRef(({ large, small, className = "", children, onChange, value, ...props }, ref) => {
  const [editing, setEditing] = React.useState(false);

  const theme = useTheme(),
    inputTheme = theme[`input${ composeOptions({ large, small }) }`];

  const [innerRef, setInnerRef] = React.useState({}),
    [height, setHeight] = React.useState("40px");

  React.useEffect(() => {
    if (innerRef.scrollHeight > innerRef.clientHeight) {
      setHeight(`calc(${ innerRef.scrollHeight }px + 0.25rem)`);
    }
  });

  return (
    <div onClick={ e => setEditing(true) }>
      <div style={ { display: editing ? "block" : "none" } }>
        <div className="mb-2">
          <Button onClick={ e => { e.stopPropagation(); setEditing(false); } }>
            preview
          </Button>
        </div>
        <div>
          <textarea { ...props } style={ { height } }
            onChange={ e => onChange(e.target.value) } value={ value || "" }
            className={ `${ inputTheme } ${ className }` }
            ref={ useSetRefs(ref, setInnerRef) } rows={ 6 }/>
        </div>
      </div>
        <div style={ { display: editing ? "none" : "block" } }>
     		<MarkdownRenderer markdown={ value || "" }
          className={ `markdown-renderer ${ inputTheme } ${ className }` }
          style={ { minHeight: "2rem" } }
          options={ { html: true } }/>
      </div>
    </div>
  )
})
