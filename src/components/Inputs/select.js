import React from "react"

import Input from "./input"
import { hasValue } from "./utils"
import { ValueContainer, ValueItem } from "./parts"

import { useTheme } from "../../wrappers/with-theme"

import deepequal from "deep-equal"
import get from "lodash.get"
import { matchSorter } from "match-sorter"

const Dropdown = React.forwardRef(({ children, searchable, opened, direction, customTheme }, ref) => {
  const theme = {...useTheme(), ...customTheme};
  return (
    <div className={ `
      absolute left-0 z-40 overflow-hidden w-full
      ${ opened ? "block" : "hidden" }
    ` }
      style={ direction === "down" ? { top: "100%" } : { bottom: "100%" } } ref={ ref }>
      <div className={ `${ theme.accent3 } my-1 ${ searchable ? "pt-1" : "" }` }>
        { children }
      </div>
    </div>
  )
})
const DropdownItem = ({ children, isActive, customTheme, ...props }) => {
  const theme = {...useTheme(), ...customTheme};
  return (
    <div { ...props }
      className={ `
        px-2 whitespace-no-wrap
        ${theme.itemText}
        ${ isActive ?
          `cursor-not-allowed ${ theme.accent2 }` :
          `cursor-pointer hover:${ theme.accent2 }`
        }
      ` }>
      { children }
    </div>
  )
}

const Identity = i => i;

class Select extends React.Component {
  static defaultProps = {
    multi: true,
    searchable: true,
    domain: [],
    options: [],
    value: null,
    placeholder: "Select a value...",
    accessor: Identity,
    displayAccessor: null,
    listAccessor: null,
    id: "avl-select",
    autoFocus: false,
    disabled: false,
    removable: true,
    customTheme:{},
    valueAccessor: Identity
  }


  constructor(...args) {
    super(...args);

    this.node = null;
    this.vcNode = null;
    this.dropdown = null;

    this.state = {
      opened: false,
      direction: "down",
      hasFocus: false,
      search: ""
    }

  }

  checkOutside = e => {
    if (this.node.contains(e.target)) {
      return;
    }
    this.closeDropdown();
  }
  openDropdown = e => {
    e.stopPropagation();
    this.setState({ opened: true, hasFocus: true });
  }
  closeDropdown = e => {
    this.state.opened && this.vcNode && this.vcNode.focus();
    this.setState({ opened: false, direction: "down", search: "" });
  }

  componentDidMount() {
    this.props.autoFocus && this.focus();
  }
  focus() {
    this.vcNode && this.vcNode.focus();
  }
  componentDidUpdate() {
    document.addEventListener("mousedown", this.checkOutside)
    if (this.dropdown && this.state.opened && (this.state.direction === "down")) {
      const rect = this.dropdown.getBoundingClientRect();
      if ((rect.top + rect.height) > window.innerHeight) {
        this.setState({ direction: "up" });
      }
    }
  }
  componentWillUnmount() {
    document.removeEventListener("mousedown", this.checkOutside)
  }
  getValues() {
    let values = [];

    if (!hasValue(this.props.value)) return [];

    if (!Array.isArray(this.props.value)) {
      values = [this.props.value];
    }
    else {
      values = this.props.value;
    }
    return this.getOptions().filter(option => {
      return values.includes(this.props.valueAccessor(option));
    });
  }
  addItem(e, v) {
    e.stopPropagation();
    this.closeDropdown();

    v = this.props.valueAccessor(v);

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

    v = this.props.valueAccessor(v);

    if (this.props.multi) {
      this.props.onChange(this.props.value.filter(d => !deepequal(d, v)));
    }
    else {
      this.props.onChange(null);
    }
  }
  setSearch(search) {
    this.setState({ search })
  }
  getOptions() {
    return this.props.options.length ? this.props.options : this.props.domain;
  }
  render() {
    const { disabled, accessor, searchable, customTheme } = this.props,
      values = this.getValues(),
      search = this.state.search,
      _options = this.getOptions(),
      activeOptions = _options
        .filter(d => values.includes(d)),

      listAccessor = this.props.listAccessor || accessor,

      options = !search ? _options :
        matchSorter(_options, search, { keys: [listAccessor] });

    return (
      <div ref={ n => this.node = n }
        className="relative" onMouseLeave={ e => this.closeDropdown() }>
        <div className="cursor-pointer">
          <ValueContainer id={ this.props.id } ref={ n => this.vcNode = n }
            onBlur={ e => this.setState({ hasFocus: false }) }
            onFocus={ e => this.setState({ hasFocus: true }) }
            hasFocus={ this.state.opened || this.state.hasFocus }
            disabled={ disabled } tabIndex={ disabled ? -1 : 0 }
            onClick={ this.openDropdown } customTheme={customTheme}>
            { values.length ?
              values.map((v, i, a) =>
                <ValueItem key={ i } disabled={ disabled } customTheme={customTheme}
                  remove={ this.props.removable ? e => this.removeItem(e, v) : null }>
                  { accessor(v, a) }
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
            searchable={ searchable } ref={ n => this.dropdown = n } customTheme={customTheme}>
            { !searchable ? null :
              <div className="p-2 pt-1">
                <Input 
                  customTheme={customTheme}
                  type="text" autoFocus placeholder="search..."
                  value={ this.state.search } onChange={ v => this.setSearch(v) }/>
              </div>
            }
            { !options.length ?
              <div className="p-1 text-center">No Selections</div> :
              <div className="scrollbar overflow-y-auto"
                style={ { maxHeight: "15rem" } }>
                { options.map((d, i) =>
                    <DropdownItem key={ `${ accessor(d) }-${ i }` }
                      customTheme={customTheme}
                      onClick={
                        activeOptions.includes(d) ?
                          e => e.stopPropagation() :
                          e => this.addItem(e, d)
                        }
                      isActive={ activeOptions.includes(d) }>
                      { get(d, "OptionComponent") ?
                          <d.OptionComponent option={ d }/> :
                          listAccessor(d)
                      }
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
