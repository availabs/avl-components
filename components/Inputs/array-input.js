import React, { useState, useEffect } from "react"

import { Button } from "../Button"
import Input from "./input"
import { ValueContainer, ValueItem } from "./parts"

import { verifyValue, hasValue } from "./utils"

export default ({ verify, ...props }) => {
  const [newValue, setValue] = useState(""),
    [buttonDisabled, setDisabled] = useState(false);

  const { value, type, disabled, ...rest } = props;

  let node = null;
  const addToArray = () => {
    const asArray = value || [];
    props.onChange([...asArray, newValue]);
    setValue("");
    node && node.focus();
  }
  const removeFromArray = v => {
    let value = Array.isArray(props.value) ? props.value : [];
    if (value.includes(v)) {
      value = value.filter(vv => vv !== v);
    }
    if (value.length === 0) {
      value = null;
    }
    props.onChange(value);
  }

  useEffect(() => {
    setDisabled(disabled ||
      !hasValue(newValue) ||
      (value || []).includes(newValue) ||
      !verifyValue(newValue, type, verify) ||
      (type === "number" && !(value || []).reduce((a, c) => a && (+c !== +newValue), true))
    );
  }, [value, newValue, verify, disabled, type])

  return (
    <div className="w-full" ref={ n => { node = n; } }>
      <div className="flex">
        <Input { ...rest } type={ type } className="mr-1"
          value={ newValue }  min={ rest.min } max={ rest.max }
          onChange={ v => setValue(v) } disabled={ disabled }
          placeholder={ `Type a value...`}>
        </Input>
        <Button onClick={ e => addToArray() }
          buttonTheme="buttonInfo"
          disabled={ buttonDisabled }>
          add
        </Button>
      </div>
      { !value ? null :
        <div className="mt-1 ml-10">
          <ValueContainer className="cursor-default">
            { value.map((v, i) =>
                <ValueItem key={ v }
                  remove={ e => removeFromArray(v) }>
                  { v }
                </ValueItem>
              )
            }
          </ValueContainer>
        </div>
      }
    </div>
  )
}
