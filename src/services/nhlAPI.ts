export const fetchTeamLogos = async () => {
  try {
    const response = await fetch('https://api-web.nhle.com/v1/standings/2023-11-15');
    const json = await response.json();
    return json.standings.map(team => team.teamLogo);
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const fetchPlayerSpotlight = async () => {
  try {
    const response = await fetch('https://api-web.nhle.com/v1/player-spotlight');
    const json = await response.json();
    return json;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const searchPlayers = async (word) => {
  try {
    const response = await fetch(`https://search.d3.nhle.com/api/v1/search/player?culture=en-us&limit=20&q=${word}%2A&active=true`)
    const json = await response.json();
    return json;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const fetchPlayerDetails = async (playerId) => {
  try {
    const response = await fetch(`https://api-web.nhle.com/v1/player/${playerId}/landing`);
    const json = await response.json();
    return json;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const fetchPlayerBio = async (playerId) => {
  try {
    const response = await fetch(`https://forge-dapi.d3.nhle.com/v2/content/en-US/players?tags.slug=playerid-${playerId}`);
    const json = await response.json();
    return json;
  } catch (error) {
    console.error(error);
    return [];
  }
};
