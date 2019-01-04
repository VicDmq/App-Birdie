import React from "react";
import "../style/dropdownButton.css";

export default class DropdownButton extends React.Component {
  onOptionClicked(newOptionSelected) {
    if (newOptionSelected != this.props.optionSelected) {
      this.props.onOptionChanged(newOptionSelected);
    }
  }

  render() {
    const { optionSelected, options } = this.props;

    return (
      <div className="dropdown">
        <button className="dropbtn">{optionSelected}</button>
        <div className="dropdown-content">
          {options.map(option => (
            <a
              key={options.indexOf(option)}
              onClick={() => this.onOptionClicked(option)}
            >
              {option}
            </a>
          ))}
        </div>
      </div>
    );
  }
}
