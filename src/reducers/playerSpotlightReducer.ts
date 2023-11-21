import { SET_PLAYER_SPOTLIGHT } from "./actions";

const initialState = {
  players: []
};

const playerSpotlightReducer = (state = initialState, action) => {

  switch (action.type) {
    case SET_PLAYER_SPOTLIGHT:
      console.log("Reducer action type:", action.type);

      return {
        ...state,
        players: action.payload
      };
    default:
      return state;
  }
};

export default playerSpotlightReducer;