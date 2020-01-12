const ADD_NEWCHANNEL = "ADD_NEWCHANNEL";
const SET_INITIAL_CHANNEL = "SET_INITIAL_CHANNEL";
const CLEAR_CHANNELS = "CLEAR_CHANNELS";

const initialState = {
  channels: []
};

const Channel = (state = initialState, action) => {
  switch (action.type) {
    case ADD_NEWCHANNEL: {
      return {
        channels: [...state.channels, action.channelInfo]
      };
    }
    case SET_INITIAL_CHANNEL: {
      return {
        channels: action.allChannels
      };
    }
    case CLEAR_CHANNELS: {
      return {
        channels: []
      };
    }
    default:
      return state;
  }
};

export { ADD_NEWCHANNEL, Channel, SET_INITIAL_CHANNEL, CLEAR_CHANNELS };
