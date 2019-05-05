import React, { Component } from "react";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import ReduxThunk from "redux-thunk";
import reducer from "./src/reducers";
import Router from "./src/Router";
import {firebaseM} from "./src/actions";

class App extends Component {
  componentWillMount() {
    firebaseM();
  }

  render() {
    console.disableYellowBox = true;
    return (
      <Provider store={createStore(reducer, {}, applyMiddleware(ReduxThunk))}>
        <Router />
      </Provider>
    );
  }
}

export default App;
