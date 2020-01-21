const FILTER_MESSAGE = "FILTER_MESSAGE";

const initialState = null;

const FilterMessage = (state = initialState, action) => {
  switch (action.type) {
    case FILTER_MESSAGE: {
      return action.filterText;
    }
    default:
      return state;
  }
};
export { FilterMessage, FILTER_MESSAGE };
