import React from 'react';
import "../style/notFoundPage.css";

export default class NotFoundPage extends React.Component {
  render() {
    return (
      <div className="not-found">
        <h1>404</h1>
        <h2>Page not found!</h2>
      </div>
    );
  }
}