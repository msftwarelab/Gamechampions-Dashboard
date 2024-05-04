import AuthenticatedApiService from "../authenticatedApiService";

let newId = 1000;

export default class ChatService extends AuthenticatedApiService {
  constructor() {
    super();

    this.list = [
      {
        id: 1,
        userId: 1001,
        messageContent:
          "101 Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
        date: "2019-02-25T17:33:44.040752"
      },
      {
        id: 2,
        userId: 1001,
        isFromSender: true,
        messageContent: "101 sit amet, consectetur adipisicing elit.",
        date: "2019-02-25T17:33:44.040752"
      },
      {
        id: 3,
        userId: 1002,
        messageContent: "102  dolor sit amet, consectetur adipisicing elit.",
        date: "2019-02-25T17:33:44.040752"
      },
      {
        id: 4,
        userId: 1003,
        messageContent: "103 consectetur adipisicing elit.",
        date: "2019-02-25T17:33:44.040752"
      },
      {
        id: 5,
        userId: 1001,
        messageContent: "New Message",
        date: "2020-07-09T15:11:00.227Z"
      },
      {
        id: 6,
        userId: 1001,
        messageContent: "New Future Message",
        date: "2020-07-09T15:11:00.227Z"
      }
    ];
  }

  get(data) {
    return Promise.resolve(
      this.list.filter(n => n.userId === data.data.userId)
    );
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
