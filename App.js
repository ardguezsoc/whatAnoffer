import React, { Component } from "react";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import ReduxThunk from "redux-thunk";
import reducer from "./src/reducers";
import Router from "./src/Router";

class App extends Component {
  render() {
    return (
      <Provider store={createStore(reducer, {}, applyMiddleware(ReduxThunk))}>
        <Router />
      </Provider>
    );
  }
}

const styles = {
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: "white"
  }
};

export default App;
