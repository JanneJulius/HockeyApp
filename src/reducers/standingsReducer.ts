import { SET_STANDINGS } from "./actions";

const initialState = {
  standings: {},
};

const standingsReducer = (state = initialState, action) => {

  switch (action.type) {
    case SET_STANDINGS:
      console.log("Reducer action type:", action.type);

      return {
        ...state,
        standings: action.payload
      };
    default:
      return state;
  }
};

export default standingsReducer;