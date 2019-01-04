import React from "react";
import "../style/table.css";
import Row from "./Row";

export default class Table extends React.Component {
  render() {
    const { head, rows } = this.props;
    
    return (
      <table>
        <thead>
          <tr>
            {head.map(cell => (
              <th key={head.indexOf(cell)}>{cell}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map(cells => (
            <Row key={rows.indexOf(cells)} cells={cells} />
          ))}
        </tbody>
      </table>
    );
  }
}
