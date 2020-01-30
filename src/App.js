import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
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
import { SET_INITIAL_NOTIFICATIONS } from "./Reducer/Notifications";
import { SET_INITIAL_CHANNEL } from "../src/Reducer/Channel";
import { SET_INITIAL_MESSAGES } from "./Reducer/Messages";
import { useSelector, useDispatch } from "react-redux";
//ALL HELPER FUNCTIONS
import FetchUsers from "./Functions/FetchUsers";
import FetchChannels from "./Functions/FetchChannels";
import FetchChannelMessages from "./Functions/FetchChannelMessages";
import FetchOtherUsersInfo from "./Functions/FetchOtherUsersInfo";
import FetchPrivateMessages from "./Functions/FetchPrivateMessages";

function App(props) {
  const history = useHistory();
  const { Notifications, credentialReducer } = useSelector(state => state);
  const NotificationsRef = firebase.database().ref("Notifications");

  firebase
    .database()
    .ref(".info/connected")
    .on("value", function(snap) {
      if (snap.val()) {
        if (credentialReducer.id) {
          const ref = firebase
            .database()
            .ref("online")
            .child(credentialReducer.id);
          ref.set(true);
          ref.onDisconnect().remove(err => {
            if (err !== null) {
              console.log(err);
            }
          });
        }
      } else {
        if (credentialReducer.id) {
          const ref = firebase
            .database()
            .ref("online")
            .child(credentialReducer.id);
          ref.onDisconnect().remove(err => {
            if (err !== null) {
              console.log(err);
            }
          });
        }
      }
    });

  useEffect(() => {
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        history.push("/");
        //LOG In
        store.dispatch({ type: LOG_IN });
        store.dispatch({ type: LOADING_ON });

        // FETCH PRIVATE MESSAGES AND NOTIFICATIONS AND THEN SET THEM TO REDUX
        FetchPrivateMessages(user);

        //FETCH OTHER USERS INFO
        FetchOtherUsersInfo(user);

        // Fetch out all info of the USER
        FetchUsers(user);

        // Fetch out all Channels info
        FetchChannels(user);

        // Fetch Out Messages of All Channels
        FetchChannelMessages(user);

        //SET NOTIFICATIONS TO REDUX
        NotificationsRef.child(user.uid).on("value", snap => {
          store.dispatch({
            type: SET_INITIAL_NOTIFICATIONS,
            notifications: snap.val()
          });
        });
      } else {
        // User is signed out.
        // ...
        //Clear user info from Redux

        history.push("/login");
        store.dispatch({
          type: LOG_OUT
        });
        console.log("signout");
      }
    });
  }, props.loading);

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

export default connect(mapStateToProps)(App);
