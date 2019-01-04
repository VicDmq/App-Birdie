import React from "react";
import "../style/error.css";

export default class ErrorComponent extends React.Component {
  render() {
    const { message } = this.props;

    return (
      <div className="not-found">
        <h1>{message}</h1>
      </div>
    );
  }
}
