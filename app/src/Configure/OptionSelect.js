import React, { Component } from 'react';
import './OptionSelect.css'

class OptionSelect extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  render() {
    return (
      <div
      className="select"
      htmlFor={this.props.id}>
          <select
            id={this.props.id}
            onChange={this.handleChange}
            value={this.props.selected}>
            {
              this.props.choices.map((choice) => {
                return (
                  <option
                      key={choice.value}
                      value={choice.value}>
                      {choice.label}
                  </option>);
              })
            }
          </select>
          <div className="select__arrow"></div>
          <span>{this.props.label}</span>
      </div>);
  }

  handleChange(event) {
    event.stopPropagation();

    let selectedValue = parseInt(event.target.options[event.target.selectedIndex].value, 10)

    this.props.onValueChange(this.props.id, selectedValue);
  }
};
/*
OptionSelect.propTypes = {
  onValueChange: PropTypes.func,
  selected: PropTypes.bool,
  id: PropTypes.string,
  label: PropTypes.string,
  choices: PropTypes.object, // [{value, label}]
};
*/
export default OptionSelect;
