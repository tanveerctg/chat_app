import React from "react";

const initialState = {
  id: null,
  userName: null,
  avatarUrl: null
};

const index = (state = initialState, action) => {
  switch (action.type) {
    case "login": {
      return {
        id: action.id,
        userName: action.userName,
        avatarUrl: action.avatarUrl
      };
    }
    case "logout": {
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
export default index;
