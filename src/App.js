import React, { useEffect } from "react";
import { useLocation } from "react-router";
import "./App.css";
import { Route, Switch } from "react-router-dom";
import Login from "./Containers/Login/Login";
import SignUp from "./Containers/SignUp/SignUp";
import Dashboard from "./Containers/Dashboard/Dashboard";
import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import { Provider } from "react-redux";
import { credentialReducer, LOG_IN, LOG_OUT } from "./Reducer/Credential";
import {
  LOADING_ON,
  LOADING_OFF,
  LoadingReducer
} from "./Reducer/LoadingReducer";
import thunk from "redux-thunk";
import { firebase } from "../src/firebase";
import { connect } from "react-redux";
import Loading from "./Component/Loading/Loading";
import { store } from "../src/index";
import { SET_INITIAL_CHANNEL } from "../src/Reducer/Channel";
function App(props) {
  useEffect(() => {
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        firebase
          .database()
          .ref(`Users/${user.uid}`)
          .once("value")
          .then(snapshot => {
            const { name, avatarUrl, id } = snapshot.val();
            store.dispatch({
              type: LOG_IN,
              id: id,
              userName: name,
              avatarUrl: avatarUrl
            });
          });

        firebase
          .database()
          .ref("Channels")
          .once("value")
          .then(function(snapshot) {
            let allChannels = [];
            for (let k in snapshot.val()) {
              for (let d in snapshot.val()[k]) {
                allChannels.push(snapshot.val()[k][d]);
              }
            }
            return allChannels;
          })
          .then(res => {
            console.log(res);
            store.dispatch({
              type: SET_INITIAL_CHANNEL,
              allChannels: [...res]
            });
          });
      } else {
        // User is signed out.
        // ...
        console.log("signout");
      }
    });
  });

  return props.loading ? (
    <Loading />
  ) : (
    <Switch>
      <Route path="/" exact component={Dashboard} />
      <Route path="/login" exact component={Login} />
      <Route path="/signup" exact component={SignUp} />
    </Switch>
  );
}
const mapStateToProps = state => {
  return {
    loading: state.Loading
  };
};
// const mapDispatchToProps = dispatch => {
//   return {
//     id: state.credentialReducer.id
//   };
// };

export default connect(mapStateToProps)(App);
