import AuthenticatedApiService from "../authenticatedApiService";
import { MATCH_ACTION, MATCH_STATUS } from "~containers/matchLobby/constants";

export default class MockService extends AuthenticatedApiService {
  constructor() {
    super();

    this.matchStatus = {
      status: MATCH_STATUS.UPCOMING,
      isChallenger: true,
      refreshFlag: false
    };

    this.matchData = {
      gameTitle: "FIFA 20",
      platform: "PS4",
      format: "1v1 Club rules",
      platformLogoUrl: "/images/ps4-logo.png",
      bannerImageUrl: "/images/stadium.jpg",
      challenger: {
        name: "JimmyBro",
        platformId: "Salied_Zebra",
        thumbnailUrl: "/images/portrait.jpg",
        xpPoints: 3400
      },
      challengee: {
        name: "Michael_9",
        platformId: "OJ_STICKS0070",
        thumbnailUrl: "/images/player1.jpg",
        xpPoints: 200
      },
      score: {
        challenger: 0,
        challengee: 0
      },
      suggestedScoreAdvantage: {
        challenger: 0,
        challengee: 3
      },
      betAmount: 5,
      prize: 9
    };
  }

  getMatch() {
    return Promise.resolve(this.matchData);
  }

  getMatchStatus({ data }) {
    if (data.userId === 7) {
      this.matchStatus.isChallenger = false;
    } else {
      this.matchStatus.isChallenger = true;
    }

    return Promise.resolve(this.matchStatus);
  }

  setScoreAdvantage({ data }) {
    if (data) {
      this.matchData.suggestedScoreAdvantage.challenger =
        data.challengerScoreAdvantage;
      this.matchData.suggestedScoreAdvantage.challengee =
        data.challengeeScoreAdvantage;
      this.matchStatus.refreshFlag = !this.matchStatus.refreshFlag;
      return Promise.resolve();
    } else {
      return Promise.reject("Data is missing");
    }
  }

  setResult({ data }) {
    if (data) {
      if (
        data.userId === 7 &&
        this.matchStatus.status === MATCH_STATUS.WAITING
      ) {
        this.matchStatus.status = MATCH_STATUS.AWAITING_CHALLENGER_REPORT;
        this.matchData.score.challenger = data.challengerFinalScore;
        this.matchData.score.challengee = data.challengeeFinalScore;
        this.matchStatus.refreshFlag = !this.matchStatus.refreshFlag;
        return Promise.resolve();
      } else if (
        data.userId === 6 &&
        this.matchStatus.status === MATCH_STATUS.WAITING
      ) {
        this.matchStatus.status = MATCH_STATUS.AWAITING_CHALLENGEE_REPORT;
        this.matchData.score.challenger = data.challengerFinalScore;
        this.matchData.score.challengee = data.challengeeFinalScore;
        this.matchStatus.refreshFlag = !this.matchStatus.refreshFlag;
        return Promise.resolve();
      } else if (
        (data.userId === 7 &&
          this.matchStatus.status ===
            MATCH_STATUS.AWAITING_CHALLENGEE_REPORT) ||
        (data.userId === 6 &&
          this.matchStatus.status === MATCH_STATUS.AWAITING_CHALLENGER_REPORT)
      ) {
        if (
          this.matchData.score.challenger === data.challengerFinalScore &&
          this.matchData.score.challengee === data.challengeeFinalScore
        ) {
          this.matchStatus.status = MATCH_STATUS.COMPLETED;
        } else {
          this.matchStatus.status = MATCH_STATUS.UNDER_REVIEW;
        }
        return Promise.resolve();
      } else {
        return Promise.reject("Data is missing");
      }
    }
  }

  updateMatchStatus({ data }) {
    if (data && data.matchId) {
      if (data.action === MATCH_ACTION.ACCEPT_CHALLENGE) {
        this.matchStatus.status = MATCH_STATUS.LIVE;
      } else if (data.action === MATCH_ACTION.START_MATCH) {
        this.matchStatus.status = MATCH_STATUS.WAITING;
      }

      return Promise.resolve();
    }

    return Promise.reject("match ID is missing");
  }

  get() {
    return Promise.resolve({
      pending: [
        {
          id: 101,
          title: "Fortnite",
          prize: 5,
          opponent: {
            id: 401,
            name: "Papa John",
            xpPoints: 3400
          },
          message:
            "The match is ongoing, you can report the results from the lobby",
          format: "2v2 Club rules",
          thumbnail: [
            {
              title: "game_1_thumb.jpg",
              imageUrl: "/images/game_1_thumb.jpg",
              alternateText: "game_1_thumb.jpg",
              width: 182,
              height: 164
            }
          ]
        },
        {
          id: 102,
          title: "NBA 2K",
          prize: 5,
          opponent: {
            id: 401,
            name: "Papa John",
            xpPoints: 3400
          },
          message:
            "The match is ongoing, you can report the results from the lobby",
          format: "2v2 Club rules",
          thumbnail: [
            {
              title: "game_2_thumb.jpg",
              imageUrl: "/images/game_2_thumb.jpg",
              alternateText: "game_2_thumb.jpg",
              width: 182,
              height: 164
            }
          ]
        },
        {
          id: 103,
          title: "COD",
          prize: 5,
          opponent: {
            id: 401,
            name: "Papa John",
            xpPoints: 3400
          },
          message:
            "The match is ongoing, you can report the results from the lobby",
          format: "2v2 Club rules",
          thumbnail: [
            {
              title: "game_3_thumb.jpg",
              imageUrl: "/images/game_3_thumb.jpg",
              alternateText: "game_3_thumb.jpg",
              width: 182,
              height: 164
            }
          ]
        }
      ],
      lobby: [
        {
          id: 101,
          title: "Fortnite",
          prize: 5,
          opponent: {
            id: 401,
            name: "Papa John",
            xpPoints: 3400
          },
          message:
            "The match is ongoing, you can report the results from the lobby",
          format: "2v2 Club rules",
          thumbnail: [
            {
              title: "game_1_thumb.jpg",
              imageUrl: "/images/game_1_thumb.jpg",
              alternateText: "game_1_thumb.jpg",
              width: 182,
              height: 164
            }
          ]
        },
        {
          id: 102,
          title: "NBA 2K",
          prize: 5,
          opponent: {
            id: 401,
            name: "Papa John",
            xpPoints: 3400
          },
          message:
            "The match is ongoing, you can report the results from the lobby",
          format: "2v2 Club rules",
          thumbnail: [
            {
              title: "game_2_thumb.jpg",
              imageUrl: "/images/game_2_thumb.jpg",
              alternateText: "game_2_thumb.jpg",
              width: 182,
              height: 164
            }
          ]
        }
      ],
      live: [
        {
          id: 108,
          title: "The League",
          prize: 5,
          opponent: {
            id: 401,
            name: "Papa John",
            xpPoints: 3400
          },
          message:
            "The match is ongoing, you can report the results from the lobby",
          format: "2v2 Club rules",
          thumbnail: [
            {
              title: "game_8_thumb.jpg",
              imageUrl: "/images/game_4_thumb.jpg",
              alternateText: "game_8_thumb.jpg",
              width: 182,
              height: 164
            }
          ]
        }
      ],
      inputScore: [],
      disputes: [
        {
          id: 101,
          title: "Fortnite",
          prize: 5,
          opponent: {
            id: 401,
            name: "Papa John",
            xpPoints: 3400
          },
          message:
            "The match is ongoing, you can report the results from the lobby",
          format: "2v2 Club rules",
          thumbnail: [
            {
              title: "game_1_thumb.jpg",
              imageUrl: "/images/game_1_thumb.jpg",
              alternateText: "game_1_thumb.jpg",
              width: 182,
              height: 164
            }
          ]
        },
        {
          id: 102,
          title: "NBA 2K",
          prize: 5,
          opponent: {
            id: 401,
            name: "Papa John",
            xpPoints: 3400
          },
          message:
            "The match is ongoing, you can report the results from the lobby",
          format: "2v2 Club rules",
          thumbnail: [
            {
              title: "game_2_thumb.jpg",
              imageUrl: "/images/game_2_thumb.jpg",
              alternateText: "game_2_thumb.jpg",
              width: 182,
              height: 164
            }
          ]
        }
      ],
      completed: [
        {
          id: 101,
          title: "Fortnite",
          prize: 5,
          opponent: {
            id: 401,
            name: "Papa John",
            xpPoints: 3400
          },
          message:
            "The match is ongoing, you can report the results from the lobby",
          format: "2v2 Club rules",
          thumbnail: [
            {
              title: "game_1_thumb.jpg",
              imageUrl: "/images/game_1_thumb.jpg",
              alternateText: "game_1_thumb.jpg",
              width: 182,
              height: 164
            }
          ]
        },
        {
          id: 102,
          title: "NBA 2K",
          prize: 5,
          opponent: {
            id: 401,
            name: "Papa John",
            xpPoints: 3400
          },
          message:
            "The match is ongoing, you can report the results from the lobby",
          format: "2v2 Club rules",
          thumbnail: [
            {
              title: "game_2_thumb.jpg",
              imageUrl: "/images/game_2_thumb.jpg",
              alternateText: "game_2_thumb.jpg",
              width: 182,
              height: 164
            }
          ]
        },
        {
          id: 103,
          title: "COD",
          prize: 5,
          opponent: {
            id: 401,
            name: "Papa John",
            xpPoints: 3400
          },
          message:
            "The match is ongoing, you can report the results from the lobby",
          format: "2v2 Club rules",
          thumbnail: [
            {
              title: "game_3_thumb.jpg",
              imageUrl: "/images/game_3_thumb.jpg",
              alternateText: "game_3_thumb.jpg",
              width: 182,
              height: 164
            }
          ]
        }
      ]
    });
  }
}
