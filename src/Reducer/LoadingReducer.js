const LOADING_ON = "loading_on";
const LOADING_OFF = "loading_off";

const LoadingReducer = (state = false, action) => {
  switch (action.type) {
    case LOADING_ON:
      return true;
    case LOADING_OFF:
      return false;
    default:
      return state;
  }
};

export { LOADING_ON, LOADING_OFF, LoadingReducer };
