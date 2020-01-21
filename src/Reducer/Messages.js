const SET_INITIAL_MESSAGES = "SET_INITIAL_MESSAGES";
const ADD_MESSAGE="ADD_MESSAGE";

const initialState = {};

const Messages = (state = initialState, action) => {
  switch (action.type) {
    case SET_INITIAL_MESSAGES: {
      return action.messages;
    }
    case ADD_MESSAGE:{

      if(state[action.data.channelId]){
        state[action.data.channelId].push(action.data)
      }else{
        state[action.data.channelId]=[action.data]

      }
      return{
        ...state
      }
    }

    default:
      return state;
  }
};

export { SET_INITIAL_MESSAGES, Messages };
