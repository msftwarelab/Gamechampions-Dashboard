import AuthenticatedApiService from "../authenticatedApiService";

export default class PlayerDetailsMockService extends AuthenticatedApiService {
  constructor() {
    super();

    this.playerMatches = gameId => ({
      personalDetails: {
        name: "Nanda Slays",
        thumbnail: [
          {
            title: "portrait.jpg",
            imageUrl: "/img/mock_images/player/portrait.jpg",
            alternateText: "portrait.jpg",
            width: 150,
            height: 150
          }
        ],
        currentStaus: "Offline",
        lastLogin: "3 months"
      },
      statistics: {
        numberOfMatches: 150,
        winRate: 56,
        xpPoints: 3400
      },
      matches: !gameId
        ? [
            {
              id: 1001,
              opponent: "John Doe",
              teammate: "Patrick Keenan",
              format: "2v2 Club rules",
              prize: 5,
              time: 35,
              result: "win"
            },
            {
              id: 1002,
              opponent: "Yahiro Ayuko",
              teammate: "Vicente de la Cruz",
              format: "2v2 Club rules",
              prize: 5,
              time: 20,
              result: "loss"
            },
            {
              id: 1003,
              opponent: "John Doe",
              teammate: "Patrick Keenan",
              format: "2v2 Club rules",
              prize: 12,
              time: 30,
              result: "win"
            },
            {
              id: 1004,
              opponent: "Ham Chuwon",
              teammate: "Erika Mateo",
              format: "2v2 Club rules",
              prize: 5,
              time: 45,
              result: "win"
            },
            {
              id: 1005,
              opponent: "John Doe",
              teammate: "Patrick Keenan",
              format: "2v2 Club rules",
              prize: 10,
              time: 20,
              result: "loss"
            }
          ]
        : [
            {
              id: 1001,
              opponent: "John Doe",
              teammate: "Patrick Keenan",
              format: "2v2 Club rules",
              prize: 5,
              time: 35,
              result: "win"
            },
            {
              id: 1002,
              opponent: "Yahiro Ayuko",
              teammate: "Vicente de la Cruz",
              format: "2v2 Club rules",
              prize: 5,
              time: 20,
              result: "loss"
            }
          ]
    });

    this.gamerTags = [
      {
        id: 1101,
        title: "Faze_Nanda",
        iconUrl: "/img/mock_images/games/playstation_logo.svg"
      },
      {
        id: 1102,
        title: "NOT_nanda",
        iconUrl: "/img/mock_images/games/xbox_logo.svg"
      },
      {
        id: 1103,
        title: "Flip_360",
        iconUrl: "/img/mock_images/games/playstation_logo.svg"
      }
    ];

    this.games = [
      {
        id: 0,
        title: "All games"
      },
      {
        id: 1201,
        title: "FIFA 20"
      },
      {
        id: 1202,
        title: "Fortnite"
      },
      {
        id: 1203,
        title: "NBA 2K"
      },
      {
        id: 1204,
        title: "The Show"
      }
    ];
  }

  getPlayerMatches({ data }) {
    if (data.id) {
      return Promise.resolve(this.playerMatches(data.gameId));
    } else {
      return Promise.reject("ID is missing in getPlayerMatches");
    }
  }

  getGamerTags({ data }) {
    if (data.id) {
      return Promise.resolve(this.gamerTags);
    } else {
      return Promise.reject("ID is missing in getGamerTags");
    }
  }

  getGames() {
    return Promise.resolve(this.games);
  }
}
