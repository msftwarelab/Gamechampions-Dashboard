import AuthenticatedApiService from "../authenticatedApiService";

let newId = 1000;

export default class MockService extends AuthenticatedApiService {
  constructor() {
    super();

    this.list = [
      {
        id: 1,
        gameId: 2,
        player: {
          id: 101,
          name: "Roger ATK",
          thumbnailUrl: "/images/portrait.jpg"
        },
        messageContent:
          "101 Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
        date: "2019-02-25T17:33:44.040752"
      },
      {
        id: 2,
        gameId: 2,
        isFromSender: true,
        messageContent: "101 sit amet, consectetur adipisicing elit.",
        date: "2019-02-25T17:33:44.040752"
      },
      {
        id: 3,
        gameId: 101,
        player: {
          id: 102,
          name: "Paulolo",
          thumbnailUrl: "/images/portrait.jpg"
        },
        messageContent: "102  dolor sit amet, consectetur adipisicing elit.",
        date: "2019-02-25T17:33:44.040752"
      },
      {
        id: 4,
        gameId: 101,
        player: {
          id: 102,
          name: "Paulolo",
          thumbnailUrl: "/images/portrait.jpg"
        },
        messageContent: "102  dolor sit amet, consectetur adipisicing elit.",
        date: "2019-02-25T17:33:44.040752"
      },
      {
        id: 5,
        gameId: 101,
        isFromSender: true,
        messageContent: "101 sit amet, consectetur adipisicing elit.",
        date: "2019-02-25T17:33:44.040752"
      },
      {
        id: 6,
        gameId: 101,
        isFromSender: true,
        messageContent:
          "101 Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
        date: "2019-02-25T17:33:44.040752"
      },
      {
        id: 7,
        gameId: 101,
        isFromSender: true,
        messageContent: "101 sit amet, consectetur adipisicing elit.",
        date: "2019-02-25T17:33:44.040752"
      },
      {
        id: 8,
        gameId: 101,
        isFromSender: true,
        messageContent:
          "101 Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
        date: "2019-02-25T17:33:44.040752"
      },
      {
        id: 9,
        gameId: 101,
        player: {
          id: 102,
          name: "Paulolo",
          thumbnailUrl: "/images/portrait.jpg"
        },
        messageContent: "102  dolor sit amet, consectetur adipisicing elit.",
        date: "2019-02-25T17:33:44.040752"
      },
      {
        id: 10,
        gameId: 102,
        messageContent: "103 consectetur adipisicing elit.",
        date: "2019-02-25T17:33:44.040752"
      }
    ];
  }

  get({ data }) {
    return Promise.resolve(this.list.filter(n => n.gameId === data.gameId));
  }

  post({ data }) {
    let message = {
      id: (newId += 1),
      ...data,
      data: new Date()
    };
    this.list.push(message);

    return Promise.resolve(message);
  }
}
