import React from "react";
import { useLocation } from "react-router";
import "./App.css";
import { Route, Switch } from "react-router-dom";
import Login from "./Containers/Login/Login";
import SignUp from "./Containers/SignUp/SignUp";
import Dashboard from "./Containers/Dashboard/Dashboard";
import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import { Provider } from "react-redux";
import Credential from "./Reducer/Credential";
import thunk from "redux-thunk";
import { firebase } from "../src/firebase";

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = {
  credentialReducer: Credential
};
const store = createStore(
  combineReducers(rootReducer),
  composeEnhancer(applyMiddleware(thunk))
);

function App() {
  return (
    <Provider store={store}>
      <Switch>
        <Route path="/" exact component={Dashboard} />
        <Route path="/login" exact component={Login} />
        <Route path="/signup" exact component={SignUp} />
      </Switch>
    </Provider>
  );
}

export default App;
