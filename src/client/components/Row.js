import React from "react";
import "../style/table.css";
//TODO

export default class Row extends React.Component {
  render() {
    const { cells } = this.props;

    return (
      <tr>
        {cells.map(cell => (
          <td key={cells.indexOf(cell)}>{cell}</td>
        ))}
      </tr>
    );
  }
}
