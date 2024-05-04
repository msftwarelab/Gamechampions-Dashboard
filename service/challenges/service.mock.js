import AuthenticatedApiService from "../authenticatedApiService";

export default class MockService extends AuthenticatedApiService {
  constructor() {
    super();

    this.gamesAndRules = [
      {
        id: 1,
        title: "FIFA 20",
        gameRules: [
          {
            id: 1,
            title: "FIFA Standard settings",
            ruleDescription:
              "Match duration: 12 minutes (6 minutes per half)<br />Game speed: Normal<br />Level: Legendary"
          },
          {
            id: 2,
            title: "FIFA Club Rule",
            ruleDescription:
              "FIFA Club Rule- Being the savage's bowsman, that is, the person who pulled the bow-oar in his boat (the second one from forward), it was my cheerful duty to attend upon him while taking that hard-scrabble scramble upon the dead whale's back. You have seen Italian organ-boys holding a dancing-ape by a long cord. Just so, from the ship's steep side, did I hold Queequeg down there in the sea, by what is technically called in the fishery a monkey-rope, attached to a strong strip of canvas belted round his waist."
          }
        ]
      },
      {
        id: 2,
        title: "Fortnite",
        gameRules: [
          {
            id: 1,
            title: "Fortnite Standard Rule",
            ruleDescription:
              "Fortnite Standard Rule Being the savage's bowsman, that is, the person who pulled the bow-oar in his boat (the second one from forward), it was my cheerful duty to attend upon him while taking that hard-scrabble scramble upon the dead whale's back. You have seen Italian organ-boys holding a dancing-ape by a long cord. Just so, from the ship's steep side, did I hold Queequeg down there in the sea, by what is technically called in the fishery a monkey-rope, attached to a strong strip of canvas belted round his waist."
          },
          {
            id: 2,
            title: "Fortnite Club Rule",
            ruleDescription:
              "Fortnite Club Rule Being the savage's bowsman, that is, the person who pulled the bow-oar in his boat (the second one from forward), it was my cheerful duty to attend upon him while taking that hard-scrabble scramble upon the dead whale's back. You have seen Italian organ-boys holding a dancing-ape by a long cord. Just so, from the ship's steep side, did I hold Queequeg down there in the sea, by what is technically called in the fishery a monkey-rope, attached to a strong strip of canvas belted round his waist."
          }
        ]
      },
      {
        id: 3,
        title: "NBA 2K",
        gameRules: [
          {
            id: 1,
            title: "NBA 2K Standard Rule",
            ruleDescription:
              "NBA 2K Standard Rule Being the savage's bowsman, that is, the person who pulled the bow-oar in his boat (the second one from forward), it was my cheerful duty to attend upon him while taking that hard-scrabble scramble upon the dead whale's back. You have seen Italian organ-boys holding a dancing-ape by a long cord. Just so, from the ship's steep side, did I hold Queequeg down there in the sea, by what is technically called in the fishery a monkey-rope, attached to a strong strip of canvas belted round his waist."
          },
          {
            id: 2,
            title: "NBA 2K Club Rule",
            ruleDescription:
              "NBA 2K Club Rule Being the savage's bowsman, that is, the person who pulled the bow-oar in his boat (the second one from forward), it was my cheerful duty to attend upon him while taking that hard-scrabble scramble upon the dead whale's back. You have seen Italian organ-boys holding a dancing-ape by a long cord. Just so, from the ship's steep side, did I hold Queequeg down there in the sea, by what is technically called in the fishery a monkey-rope, attached to a strong strip of canvas belted round his waist."
          }
        ]
      },
      {
        id: 4,
        title: "The Show",
        gameRules: [
          {
            id: 1,
            title: "The Show Standard Rule",
            ruleDescription:
              "The Show Standard Rule Being the savage's bowsman, that is, the person who pulled the bow-oar in his boat (the second one from forward), it was my cheerful duty to attend upon him while taking that hard-scrabble scramble upon the dead whale's back. You have seen Italian organ-boys holding a dancing-ape by a long cord. Just so, from the ship's steep side, did I hold Queequeg down there in the sea, by what is technically called in the fishery a monkey-rope, attached to a strong strip of canvas belted round his waist."
          },
          {
            id: 2,
            title: "The Show Club Rule",
            ruleDescription:
              "The Show Club Rule Being the savage's bowsman, that is, the person who pulled the bow-oar in his boat (the second one from forward), it was my cheerful duty to attend upon him while taking that hard-scrabble scramble upon the dead whale's back. You have seen Italian organ-boys holding a dancing-ape by a long cord. Just so, from the ship's steep side, did I hold Queequeg down there in the sea, by what is technically called in the fishery a monkey-rope, attached to a strong strip of canvas belted round his waist."
          }
        ]
      }
    ];
  }

  getGamesAndRules() {
    return Promise.resolve(this.gamesAndRules);
  }

  sendCreateChallenge({ data }) {
    if (data) {
      return Promise.resolve();
    } else {
      return Promise.reject("Data is missing");
    }
  }

  sendPlayerChallenge({ data }) {
    if (data) {
      return Promise.resolve();
    } else {
      return Promise.reject("Data is missing");
    }
  }
}
