import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import thunk from "redux-thunk";
import { Provider } from "react-redux";
import { credentialReducer } from "./Reducer/Credential";
import { LoadingReducer } from "./Reducer/LoadingReducer";
import { Channel } from "./Reducer/Channel";
import { Messages } from "./Reducer/Messages";
import { Users } from "./Reducer/Users";
import { FilterMessage, FILTER_MESSAGE } from "./Reducer/FilterMessage";
import { Notifications } from "./Reducer/Notifications";

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = {
  credentialReducer: credentialReducer,
  Loading: LoadingReducer,
  Channel: Channel,
  Messages: Messages,
  FilterMessage: FilterMessage,
  Notifications: Notifications,
  Users: Users
};
export const store = createStore(
  combineReducers(rootReducer),
  composeEnhancer(applyMiddleware(thunk))
);
ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
