import React from "react";
import { useTheme } from "../../wrappers";
import { hasValue } from "./utils";

export default React.forwardRef(
  (
    {
      large,
      small,
      className = "",
      onChange,
      value,
      showClear = false,
      placeholder = "type a value...",
        themeOptions = {color: 'white', size: 'small', width: 'block'},
      ...props
    },
    ref
  ) => {
    const theme = useTheme()['input'](themeOptions).input
    console.log('test', theme)
    const doOnChange = React.useCallback(
      (e) => {
        e.stopPropagation();
        onChange(e.target.value, e);
      },
      [onChange]
    );
    return showClear ? (
      <div className={`relative`}>
        <input
          {...props}
          ref={ref}
          onChange={doOnChange}
          value={hasValue(value) ? value : ""}
          className={`${theme} ${className}`}
          placeholder={placeholder}
        />
        {!hasValue(value) ? null : (
          <div
            className={`absolute right-0 ${
              small ? "mr-1" : "mr-2"
            } top-0 bottom-0 flex items-center`}
          >
            <div
              className={`
                ${theme.menuBgActive} ${theme.menuBgActiveHover} ${theme.textContrast}
                p-1 flex justify-center items-center rounded cursor-pointer
              `}
              onClick={() => onChange("")}
            >
              <svg width="8" height="8">
                <line
                  x2="8"
                  y2="8"
                  style={{ stroke: "currentColor", strokeWidth: 2 }}
                />
                <line
                  y1="8"
                  x2="8"
                  style={{ stroke: "currentColor", strokeWidth: 2 }}
                />
              </svg>
            </div>
          </div>
        )}
      </div>
    ) : (
      <input
        {...props}
        ref={ref}
        onChange={doOnChange}
        value={hasValue(value) ? value : ""}
        className={`${theme} ${className}`}
        placeholder={placeholder}
      />
    );
  }
);
