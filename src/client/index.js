import React from "react";
import ReactDOM from "react-dom";
import Main from "./components/Main";
import { createStore } from "redux";
import { Provider } from "react-redux";

// Import the reducer and create a store
import { reducer } from "./appRedux";
const store = createStore(reducer);

ReactDOM.render(
  <Provider store={store}>
    <Main />
  </Provider>,
  document.getElementById("index")
);
