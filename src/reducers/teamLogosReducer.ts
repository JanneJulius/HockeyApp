import { SET_TEAM_LOGOS } from "./actions";

const initialState = {
  logos: []
};

const teamLogosReducer = (state = initialState, action) => {

  switch (action.type) {
    case SET_TEAM_LOGOS:
      console.log("Reducer action type:", action.type);
      return {
        ...state,
        logos: action.payload
      };
    default:
      return state;
  }
};

export default teamLogosReducer;