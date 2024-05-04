import AuthenticatedApiService from "../authenticatedApiService";

let newId = 1000;

export default class MockService extends AuthenticatedApiService {
  constructor() {
    super();

    this.list = [
      {
        id: 1,
        player: {
          id: 101,
          name: "Roger ATK",
          thumbnailUrl: "/images/portrait.jpg"
        },
        messageContent:
          "101 Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
        date: "2019-02-25T17:33:44.040752"
      }
    ];
  }
  get() {
    return Promise.resolve(this.list);
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
