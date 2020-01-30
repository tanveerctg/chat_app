const SET_PRIVATE_MESSAGES_NOTIFICATIONS = "SET_PRIVATE_MESSAGES_NOTIFICATIONS";

const initialState = {};

const Private_Messages_Notifications = (state = initialState, action) => {
  switch (action.type) {
    case SET_PRIVATE_MESSAGES_NOTIFICATIONS: {
      // console.log(action.Messages, action.OtherPersonsId, action.Notifications);
      // if (state[action.OtherPersonsId]) {
      //   console.log("yes");
      // } else {
      //   console.log("no");
      // }
      if (state[action.OtherPersonsId]) {
        state[action.OtherPersonsId] = {
          Messages: action.Messages,
          Notifications: action.Notifications
        };
      } else {
        state[action.OtherPersonsId] = {
          Messages: action.Messages,
          Notifications: action.Notifications
        };
      }
      return { ...state };
    }
    default:
      return state;
  }
};

export { Private_Messages_Notifications, SET_PRIVATE_MESSAGES_NOTIFICATIONS };
