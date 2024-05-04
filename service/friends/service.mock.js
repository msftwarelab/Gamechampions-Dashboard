import AuthenticatedApiService from "../authenticatedApiService";

export default class MockService extends AuthenticatedApiService {
  constructor() {
    super();
    this.list = [
      {
        id: 36,
        name: "Jose",
        surname: "",
        email: "sadasda@gmail.com",
        iconUrl: "/images/Alex.png"
      },
      {
        id: 32,
        name: "Shaun",
        surname: "",
        email: "sadasda@gmail.com",
        iconUrl: "/images/Alex.png"
      },
      {
        id: 1001,
        name: "Alex",
        surname: "",
        email: "sadasda@gmail.com",
        iconUrl: "/images/Alex.png"
      },
      {
        id: 1002,
        name: "Alexandra",
        surname: "",
        email: "sadasda@gmail.com",
        iconUrl: "/images/Alexandra.png"
      },
      {
        id: 1003,
        name: "Brody",
        surname: "",
        email: "sadasda@gmail.com",
        iconUrl: "/images/Brody.png"
      },
      {
        id: 1004,
        name: "Carlos",
        surname: "",
        email: "sadasda@gmail.com",
        iconUrl: "/images/Carlos.png"
      },
      {
        id: 1005,
        name: "Charlie",
        surname: "",
        email: "sadasda@gmail.com",
        iconUrl: "/images/Charlie.png"
      },
      {
        id: 1006,
        name: "Emma",
        surname: "",
        email: "sadasda@gmail.com",
        iconUrl: "/images/Emma.png"
      },
      {
        id: 1007,
        name: "Jack",
        surname: "",
        email: "sadasda@gmail.com",
        iconUrl: "/images/Jack.png"
      },
      {
        id: 1008,
        name: "Jade",
        surname: "",
        email: "sadasda@gmail.com",
        iconUrl: "/images/Jade.png"
      },
      {
        id: 1009,
        name: "James",
        surname: "",
        email: "sadasda@gmail.com",
        iconUrl: "/images/James.png"
      },
      {
        id: 1010,
        name: "Kyle",
        surname: "",
        email: "sadasda@gmail.com",
        iconUrl: "/images/Kyle.png"
      },
      {
        id: 1011,
        name: "Leah",
        surname: "",
        email: "sadasda@gmail.com",
        iconUrl: "/images/Leah.png"
      },
      {
        id: 1012,
        name: "Mackenzie",
        surname: "",
        email: "sadasda@gmail.com",
        iconUrl: "/images/Mackenzie.png"
      },
      {
        id: 1013,
        name: "Mike",
        surname: "",
        email: "sadasda@gmail.com",
        iconUrl: "/images/Mike.png"
      },
      {
        id: 1014,
        name: "Ryan",
        surname: "",
        email: "sadasda@gmail.com",
        iconUrl: "/images/Ryan.png"
      },
      {
        id: 1015,
        name: "Sophie",
        surname: "",
        email: "sadasda@gmail.com",
        iconUrl: "/images/Sophie.png"
      }
    ];

    this.referrerId = "generatedhash";
  }

  getAll(data) {
    let textToSearch = "";

    if (data) {
      textToSearch = data.textToSearch;
    }
    let tmpList = this.list;
    let results = textToSearch
      ? tmpList.filter(
          n =>
            n.name.toLowerCase().includes(textToSearch.toLowerCase()) ||
            n.surname.toLowerCase().includes(textToSearch.toLowerCase())
        )
      : tmpList;

    return Promise.resolve(results);
  }

  getReferrerId({ data }) {
    if (data.id) {
      return Promise.resolve({ referrerId: `${this.referrerId}${data.id}` });
    } else {
      return Promise.reject("ID is missing");
    }
  }

  sendInvite({ data }) {
    if (data.id) {
      return Promise.resolve();
    } else {
      return Promise.reject("ID is missing");
    }
  }
}
