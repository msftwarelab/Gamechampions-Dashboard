import AuthenticatedApiService from "../authenticatedApiService";

export default class GamesMockService extends AuthenticatedApiService {
  constructor() {
    super();

    this.recentPlayers = [];
    this.games = [
      {
        id: 101,
        title: "FORTNITE",
        platform: "PS2",
        thumbnailUrl: "/images/game_1_thumb.jpg"
      },
      {
        id: 102,
        title: "NBA 2K",
        platform: "PS2",
        thumbnailUrl: "/images/game_2_thumb.jpg"
      },
      {
        id: 103,
        title: "COD",
        platform: "PS2",
        thumbnailUrl: "/images/game_3_thumb.jpg"
      },
      {
        id: 104,
        title: "Fortnite",
        platform: "PS2",
        thumbnailUrl: "/images/game_1_thumb.jpg"
      },
      {
        id: 105,
        title: "NBA 2K",
        platform: "PS2",
        thumbnailUrl: "/images/game_2_thumb.jpg"
      },
      {
        id: 106,
        title: "COD",
        platform: "PS2",
        thumbnailUrl: "/images/game_3_thumb.jpg"
      },
      {
        id: 107,
        title: "Fortnite",
        platform: "PS2",
        thumbnailUrl: "/images/game_1_thumb.jpg"
      },
      {
        id: 108,
        title: "The Show ",
        platform: "PS2",
        thumbnailUrl: "/images/game_4_thumb.jpg"
      }
    ];

    this.leaderBoards = [
      {
        id: 1,
        rank: 1,
        country: "USA",
        name: "MAMMUTH2012",
        matches: 124,
        wins: 86,
        xp: 153537,
        earnings: 550
      },
      {
        id: 2,
        rank: 2,
        country: "Spain",
        name: "F00FIGHTER",
        matches: 64,
        wins: 45,
        xp: 38234,
        earnings: 347
      },
      {
        id: 3,
        rank: 3,
        country: "Malta",
        name: "BILL2",
        matches: 51,
        wins: 28,
        xp: 28234,
        earnings: 274
      },
      {
        id: 4,
        rank: 4,
        country: "Italy",
        name: "MADMAX",
        matches: 64,
        wins: 25,
        xp: 8234,
        earnings: 75
      },
      {
        id: 5,
        rank: 5,
        country: "USA",
        name: "JOHN_DOE",
        matches: 24,
        wins: 5,
        xp: 234,
        earnings: 17
      },
      {
        id: 6,
        rank: 6,
        country: "Spain",
        name: "AMIGO",
        matches: 4,
        wins: 1,
        xp: 81,
        earnings: 5
      }
    ];

    this.gameRules = [
      {
        id: 1,
        subtitle: "<h3>FIFA Standard Rule</h3>",
        html:
          "<p>FIFA Standard Rule -Being the savage's bowsman, that is, the person who pulled the bow-oar in his boat (the second one from forward), it was my cheerful duty to attend upon him while taking that hard-scrabble scramble upon the dead whale's back. You have seen Italian organ-boys holding a dancing-ape by a long cord. Just so, from the ship's steep side, did I hold Queequeg down there in the sea, by what is technically called in the fishery a monkey-rope, attached to a strong strip of canvas belted round his waist.</p>"
      },
      {
        id: 2,
        subtitle: "<h3>FIFA Club Rule</h3>",
        html:
          "<p>FIFA Club Rule- Being the savage's bowsman, that is, the person who pulled the bow-oar in his boat (the second one from forward), it was my cheerful duty to attend upon him while taking that hard-scrabble scramble upon the dead whale's back. You have seen Italian organ-boys holding a dancing-ape by a long cord. Just so, from the ship's steep side, did I hold Queequeg down there in the sea, by what is technically called in the fishery a monkey-rope, attached to a strong strip of canvas belted round his waist</p>"
      }
    ];
  }

  get() {
    return Promise.resolve(this.games);
  }

  getGameRules() {
    return Promise.resolve({
      title: "<h1>FIFA 20 rules</h1>",
      rules: this.gameRules
    });
  }

  getGame({ data }) {
    const game = this.games.find(n => n.id === data.gameId);

    if (game) {
      return Promise.resolve(game);
    }

    return Promise.reject("Game not found or gameId is missing");
  }

  getLeaderBoards() {
    return Promise.resolve(this.leaderBoards);
  }
  getRecentPlayers() {
    return Promise.resolve(this.recentPlayers);
  }

  getInstantMatches() {
    return Promise.resolve([
      {
        id: 101,
        prize: 10,
        format: "1v1 Club rules",
        startedBy: "Rambo TK"
      },
      {
        id: 102,
        prize: 30,
        format: "1v1 Club rules",
        startedBy: "Chelseathesea"
      },
      {
        id: 103,
        prize: 15,
        format: "1v1 Club rules",
        startedBy: "Shutdaball"
      },
      {
        id: 104,
        prize: 50,
        format: "1v1 Club rules",
        startedBy: "Whatdoino"
      },
      {
        id: 105,
        prize: 5,
        format: "1v1 Club rules",
        startedBy: "Udaman12"
      }
    ]);
  }
}
