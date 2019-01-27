import React, { Component } from "react";
import firebase from "@firebase/app"
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import ReduxThunk from "redux-thunk";
import reducer from "./src/reducers";
import Router from "./src/Router";


class App extends Component {

componentWillMount() {
  
  const config = {
    apiKey: "AIzaSyAwehWbuJ00EF-39-w-k8FDRAaNR9gApXY",
    authDomain: "waodb-3cd34.firebaseapp.com",
    databaseURL: "https://waodb-3cd34.firebaseio.com",
    projectId: "waodb-3cd34",
    storageBucket: "waodb-3cd34.appspot.com",
    messagingSenderId: "177586486195"
  };

  firebase.initializeApp(config);
}


  render() {
    return (
      <Provider store={createStore(reducer, {}, applyMiddleware(ReduxThunk))}>
        <Router />
      </Provider>
    );
  }
}

export default App;
