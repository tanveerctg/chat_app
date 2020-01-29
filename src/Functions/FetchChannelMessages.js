import React, { useState } from "react";
import { store } from "../index";
import { firebase } from "../firebase";
import { SET_INITIAL_MESSAGES } from "../Reducer/Messages";
import { LOADING_OFF } from "../Reducer/LoadingReducer";
import { useSelector, useDispatch } from "react-redux";

export default function FetchChannelMessages() {
  let messages = {};
  firebase
    .database()
    .ref("Messages")
    .on("value", snapshot => {
      for (let channelId in snapshot.val()) {
        messages[channelId] = [];
        for (let msgKey in snapshot.val()[channelId]) {
          messages[channelId].push(snapshot.val()[channelId][msgKey]);
        }
      }
      store.dispatch({ type: SET_INITIAL_MESSAGES, messages: messages });
      store.dispatch({ type: LOADING_OFF });
    });
}
