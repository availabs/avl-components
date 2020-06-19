import React from "react"

import Input from "./input"
import { hasValue } from "./utils"
import { ValueContainer, ValueItem } from "./parts"

import { useTheme } from "../../wrappers/with-theme"

const Dropdown = ({ children, searchable }) => {
  const theme = useTheme();
  return (
    <div className={ `absolute left-0 z-40 overflow-hidden w-full rounded-b-lg` }
      style={ { top: "100%" } }>
      <div className={ `${ theme.accent1 } mt-1 ${ searchable ? "pt-1" : "" }` }>
        { children }
      </div>
    </div>
  )
}
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
    placeholder: "Select a value..."
  }
  constructor(...args) {
    super(...args);
    this.state = {
      opened: false,
      search: ""
    }
  }
  getValues() {
    if (!hasValue(this.props.value)) return [this.props.placeholder];
    if (!Array.isArray(this.props.value)) {
      return [this.props.value];
    }
    return this.props.value;
  }
  openDropdown(e) {
    e.stopPropagation();
    this.setState({ opened: true });
  }
  closeDropdown() {
    this.setState({ opened: false, search: "" });
  }
  addItem(e, v) {
    e.stopPropagation();
    this.closeDropdown();

    if (this.props.multi) {
      if (!hasValue(this.props.value)) {
        this.props.onChange([v]);
      }
      else if (!this.props.value.includes(v)) {
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
    const values = this.getValues(),
      domain = this.props.domain
        .filter(d => !values.includes(d))
        .filter(d => d.toString().includes(this.state.search));
    return (
      <div className="relative" onMouseLeave={ e => this.closeDropdown() }>
        <div className="cursor-pointer border-2" tabIndex="0"
          style={ { borderColor: this.state.opened ? "black" : "transparent" } }>
          <ValueContainer id={ this.props.id }
            onClick={ e => this.openDropdown(e) }>
            { values.map((v, i) =>
                <ValueItem key={ i } isPlaceholder={ v === this.props.placeholder }
                  remove={ e => this.removeItem(e, v) }>
                  { v }
                </ValueItem>
              )
            }
          </ValueContainer>
        </div>
        { !this.state.opened ? null :
          <Dropdown searchable={ this.props.searchable }>
            { !this.props.searchable ? null :
              <div className="m-2 mt-1">
                <Input id={ `${ this.props.id }-search` } type="text"
                  value={ this.state.search } onChange={ v => this.setSearch(v) }
                  autoFocus placeholder="search..."/>
              </div>
            }
            { !domain.length ? null :
              <div className="scrollbar overflow-y-auto"
                style={ { maxHeight: "300px" } }>
                { domain.map(d =>
                    <DropdownItem key={ d } onClick={ e => this.addItem(e, d) }>
                      { d }
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
