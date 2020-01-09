import React from "react";

const LOG_IN = "login";
const LOG_OUT = "logout";

const initialState = {
  id: null,
  userName: null,
  avatarUrl: null
};

const credentialReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOG_IN: {
      return {
        id: action.id,
        userName: action.userName,
        avatarUrl: action.avatarUrl
      };
    }
    case LOG_OUT: {
      return {
        id: null,
        userName: null,
        avatarUrl: null
      };
    }
    default:
      return state;
  }
};
export { credentialReducer, LOG_IN, LOG_OUT };
