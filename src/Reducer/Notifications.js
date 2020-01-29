const SET_INITIAL_NOTIFICATIONS = "SET_INITIAL_NOTIFICATIONS";

const initialState = {};

const Notifications = (state = initialState, action) => {
  switch (action.type) {
    case SET_INITIAL_NOTIFICATIONS: {
      return action.notifications;
    }

    default:
      return state;
  }
};

export { Notifications, SET_INITIAL_NOTIFICATIONS };
