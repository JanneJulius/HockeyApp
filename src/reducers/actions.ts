export const THEME_CHANGE = "THEME_CHANGE";
export const SHOW_TABBAR = 'SHOW_TABBAR';
export const HIDE_TABBAR = 'HIDE_TABBAR';
export const SET_TEAM_LOGOS = 'SET_TEAM_LOGOS';
export const SET_PLAYER_SPOTLIGHT = 'SET_PLAYER_SPOTLIGHT';
export const SET_STANDINGS = 'SET_STANDINGS';
export const SORT_STANDINGS = 'SORT_STANDINGS';


export const switchMode = (mode) => ({
  type: THEME_CHANGE,
  payload: mode,
});

export const showTabBar = () => ({
  type: SHOW_TABBAR,
});

export const hideTabBar = () => ({
  type: HIDE_TABBAR,
});

export const setTeamLogos = (logos) => {
  return {
    type: SET_TEAM_LOGOS,
    payload: logos
  };
};

export const setPlayerSpotlight = (players) => {
  return {
    type: SET_PLAYER_SPOTLIGHT,
    payload: players
  };
};

export const setStandings = (standings) => {
  return {
    type: SET_STANDINGS,
    payload: standings
  };
};
