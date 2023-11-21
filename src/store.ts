import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "./reducers/themeReducer";
import tabBarReducer from "./reducers/tabBarReducer";
import teamLogosReducer from "./reducers/teamLogosReducer";
import playerSpotlightReducer from "./reducers/playerSpotlightReducer";

const store = configureStore({
  reducer: {
    theme: themeReducer,
    tabBar: tabBarReducer,
    teamLogos: teamLogosReducer,
    playerSpotlight: playerSpotlightReducer
  },
});

export default store;
