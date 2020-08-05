import React from "react"

import Input from "./input"
import { hasValue } from "./utils"
import { ValueContainer, ValueItem } from "./parts"

import { useTheme } from "../../wrappers/with-theme"

import deepequal from "deep-equal"

const Dropdown = React.forwardRef(({ children, searchable, opened, direction }, ref) => {
  const theme = useTheme();
  return (
    <div className={ `
      absolute left-0 z-40 overflow-hidden w-full
      ${ opened ? "block" : "hidden" }
    ` }
      style={ direction === "down" ? { top: "100%" } : { bottom: "100%" } } ref={ ref }>
      <div className={ `${ theme.accent1 } my-1 ${ searchable ? "pt-1" : "" }` }>
        { children }
      </div>
    </div>
  )
})
const DropdownItem = ({ children, ...props }) => {
  const theme = useTheme();
  return (
    <div { ...props } className={ `cursor-pointer hover:${ theme.accent2 } px-2` }>
      { children }
    </div>
  )
}

class Select extends React.Component {
  static defaultProps = {
    multi: true,
    searchable: true,
    domain: [],
    value: null,
    placeholder: "Select a value...",
    accessor: d => d,
    id: "avl-select",
    autoFocus: false,
    disabled: false
  }

  node = null;
  dropdown = null;

  constructor(...args) {
    super(...args);
    this.state = {
      opened: false,
      direction: "down",
      hasFocus: false,
      search: ""
    }
  }
  componentDidMount() {
    this.props.autoFocus && this.focus();
  }
  focus() {
    this.node && this.node.focus();
  }
  componentDidUpdate() {
    if (this.dropdown && this.state.opened && (this.state.direction === "down")) {
      const rect = this.dropdown.getBoundingClientRect();
      if ((rect.top + rect.height) > window.innerHeight) {
        this.setState({ direction: "up" });
      }
    }
  }
  getValues() {
    if (!hasValue(this.props.value) || !hasValue(this.props.accessor(this.props.value))) return [];
    if (!Array.isArray(this.props.value)) {
      return [this.props.value];
    }
    return this.props.value;
  }
  openDropdown(e) {
    e.stopPropagation();
    this.setState({ opened: true, hasFocus: true });
  }
  closeDropdown() {
    this.state.opened && this.node && this.node.focus();
    this.setState({ opened: false, direction: "down", search: "" });
  }
  addItem(e, v) {
    e.stopPropagation();
    this.closeDropdown();

    if (this.props.multi) {
      if (!hasValue(this.props.value)) {
        this.props.onChange([v]);
      }
      else if (this.props.value.reduce((a, c) => a && !deepequal(c, v), true)) {
        this.props.onChange([...this.props.value, v]);
      }
    }
    else {
      this.props.onChange(v);
    }
  }
  removeItem(e, v) {
    e.stopPropagation();

    if (this.props.multi) {
      const newValue = this.props.value.filter(d => d !== v);
      this.props.onChange(newValue.length ? newValue : null);
    }
    else {
      this.props.onChange(null);
    }
  }
  setSearch(search) {
    this.setState({ search })
  }
  render() {
    const { disabled } = this.props,
      values = this.getValues(),
      domain = this.props.domain
        .filter(d => values.reduce((a, c) => a && !deepequal(c, d), true))
        .filter(d =>
          this.props.accessor(d).toString().includes(this.state.search)
        );

    return (
      <div className="relative" onMouseLeave={ e => this.closeDropdown() }>
        <div className="cursor-pointer">
          <ValueContainer id={ this.props.id } ref={ n => this.node = n }
            onBlur={ e => this.setState({ hasFocus: false }) }
            onFocus={ e => this.setState({ hasFocus: true }) }
            hasFocus={ this.state.opened || this.state.hasFocus }
            disabled={ disabled } tabIndex={ disabled ? -1 : 0 }
            onClick={ e => this.openDropdown(e) }>
            { values.length ?
              values.map((v, i) =>
                <ValueItem key={ i } disabled={ disabled }
                  remove={ e => this.removeItem(e, v) }>
                  { this.props.accessor(v) }
                </ValueItem>
              ) :
              <ValueItem key="placeholder" isPlaceholder={ true }>
                { this.props.placeholder }
              </ValueItem>
            }
          </ValueContainer>
        </div>

        { disabled || !this.state.opened ? null :
          <Dropdown opened={ this.state.opened } direction={ this.state.direction }
            searchable={ this.props.searchable } ref={ n => this.dropdown = n }>
            { !this.props.searchable ? null :
              <div className="p-2 pt-1">
                <Input type="text" autoFocus placeholder="search..."
                  value={ this.state.search } onChange={ v => this.setSearch(v) }/>
              </div>
            }
            { !domain.length ?
              <div className="p-1 text-center">No Selections</div> :
              <div className="scrollbar overflow-y-auto"
                style={ { maxHeight: "15rem" } }>
                { domain.map(d =>
                    <DropdownItem key={ this.props.accessor(d) }
                      onClick={ e => this.addItem(e, d) }>
                      { this.props.accessor(d) }
                    </DropdownItem>
                  )
                }
              </div>
            }
          </Dropdown>
        }
      </div>
    )
  }
}
export default Select
