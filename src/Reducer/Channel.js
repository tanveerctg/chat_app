const ADD_NEWCHANNEL = "ADD_NEWCHANNEL";
const SET_INITIAL_CHANNEL = "SET_INITIAL_CHANNEL";
const CLEAR_CHANNELS = "CLEAR_CHANNELS";
const CLICKED_CHANNEL = "CLICKED_CHANNEL";

const initialState = {
  channels: [],
  clickedChannel: null,
  isPrivateChannel: false
};

const Channel = (state = initialState, action) => {
  switch (action.type) {
    case ADD_NEWCHANNEL: {
      return {
        ...state,
        channels: [...state.channels, action.channelInfo]
      };
    }
    case SET_INITIAL_CHANNEL: {
      return {
        ...state,
        channels: action.allChannels,
        clickedChannel: action.clickedChannel
      };
    }
    case CLEAR_CHANNELS: {
      return {
        ...state,
        channels: []
      };
    }
    case CLICKED_CHANNEL: {
      return {
        ...state,
        isPrivateChannel: action.isPrivateChannel,
        clickedChannel: action.channel
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
