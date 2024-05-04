import { UMBRACO_API_URL } from "../constants";

export const toTeam = data => {
  if (data) {
    return {
      id: data.Id,
      matchId: data.matchId,
      title: data.title,
      code: data.code,
      rating: data.rating,
      colour: data.colour,
      thumbnailUrl: `${UMBRACO_API_URL}${data.thumbnailUrl}`
    };
  }
};

export const toTeamArray = data => {
  if (data && data.length) {
    return data.map(item => {
      return toTeam(item);
    });
  } else {
    return [];
  }
};
