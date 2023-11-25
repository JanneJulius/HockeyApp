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

export const headShotUrl = (playerId) => `https://assets.nhle.com/mugs/nhl/latest/${playerId}.png`


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

export const fetchStandings = async () => {
  const today = new Date();
  const dateString = today.toISOString().slice(0, 10);  

  const initialSort = {
    rank: undefined,
    name: undefined,
    GP: undefined,
    W: undefined,
    L: undefined,
    OTL: undefined,
    P: undefined,
    GF: undefined,
    GA: undefined,
    DIFF: undefined
  }

  try {
    const response = await fetch(`https://api-web.nhle.com/v1/standings/${dateString}`);
    const json = await response.json();

    const atlanticStandings = await json.standings
      .filter(team => team.divisionName === "Atlantic")
      .map(team => ({
        division: team.divisionName,

        rank: team.divisionSequence,
        name: team.teamAbbrev.default,
        logo: team.teamLogo,
        GP: team.gamesPlayed,
        W: team.wins,
        L: team.losses,
        OTL: team.otLosses,
        P: team.points,
        GF: team.goalFor,
        GA: team.goalAgainst,
        DIFF: team.goalDifferential,
      }));

    const metropolitanStandings = await json.standings
      .filter(team => team.divisionName === "Metropolitan")
      .map(team => ({
        division: team.divisionName,

        rank: team.divisionSequence,
        name: team.teamAbbrev.default,
        logo: team.teamLogo,
        GP: team.gamesPlayed,
        W: team.wins,
        L: team.losses,
        OTL: team.otLosses,
        P: team.points,
        GF: team.goalFor,
        GA: team.goalAgainst,
        DIFF: team.goalDifferential,
      }))

    const centralStandings = await json.standings
      .filter(team => team.divisionName === "Central")
      .map(team => ({
        division: team.divisionName,
        rank: team.divisionSequence,
        name: team.teamAbbrev.default,
        logo: team.teamLogo,
        GP: team.gamesPlayed,
        W: team.wins,
        L: team.losses,
        OTL: team.otLosses,
        P: team.points,
        GF: team.goalFor,
        GA: team.goalAgainst,
        DIFF: team.goalDifferential,
      }))

    
    const pacificStandings = await json.standings
      .filter(team => team.divisionName === "Pacific")
      .map(team => ({
        division: team.divisionName,
        rank: team.divisionSequence,
        name: team.teamAbbrev.default,
        logo: team.teamLogo,
        GP: team.gamesPlayed,
        W: team.wins,
        L: team.losses,
        OTL: team.otLosses,
        P: team.points,
        GF: team.goalFor,
        GA: team.goalAgainst,
        DIFF: team.goalDifferential,
      }))


    return  {
      atlantic: {
        sort: initialSort,
        teams: atlanticStandings
      },
      metropolitan: {
        sort: initialSort,
        teams: metropolitanStandings
      },
      central: {
        sort: initialSort,
        teams: centralStandings
      },
      pacific: {
        sort: initialSort,
        teams: pacificStandings
      }
    };
 
  } catch (error) {
    console.error(error);
    return null;
  }
};
