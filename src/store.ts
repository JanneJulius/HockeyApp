import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "./reducers/themeReducer";
import tabBarReducer from "./reducers/tabBarReducer";
import teamLogosReducer from "./reducers/teamLogosReducer";
import playerSpotlightReducer from "./reducers/playerSpotlightReducer";
import standingsReducer from "./reducers/standingsReducer";

const store = configureStore({
  reducer: {
    theme: themeReducer,
    tabBar: tabBarReducer,
    teamLogos: teamLogosReducer,
    playerSpotlight: playerSpotlightReducer,
    standings: standingsReducer
  },
  middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware({
    immutableCheck: false,
    serializableCheck: true,
  }),
});

export default store;
