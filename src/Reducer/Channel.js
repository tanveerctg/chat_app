const ADD_NEWCHANNEL = "ADD_NEWCHANNEL";
const SET_INITIAL_CHANNEL = "SET_INITIAL_CHANNEL";
const CLEAR_CHANNELS = "CLEAR_CHANNELS";
const CLICKED_CHANNEL = "CLICKED_CHANNEL";

const initialState = {
  channels: [],
  clickedChannel: null
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
    case CLICKED_CHANNEL: {
      return {
        ...state,
        CLICKED_CHANNEL: action.channel
      };
    }
    default:
      return state;
  }
};

export {
  ADD_NEWCHANNEL,
  Channel,
  SET_INITIAL_CHANNEL,
  CLEAR_CHANNELS,
  CLICKED_CHANNEL
};
