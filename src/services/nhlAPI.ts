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
