const SET_USERS = "SET_USERS";
const initialState = [];

const Users = (state = initialState, action) => {
  switch (action.type) {
    case SET_USERS:
      return action.users;
    default:
      return state;
  }
};

export { SET_USERS, Users };
