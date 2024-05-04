import AuthenticatedApiService from "../authenticatedApiService";

export default class AffiliatesMockService extends AuthenticatedApiService {
  constructor() {
    super();

    this.affiliates = [
      {
        id: 101,
        fullName: "Sanyi Egy",
        email: "sanyi@egy.hu",
        dateRegistered: "2020/01/01",
        urls: []
      },
      {
        id: 102,
        fullName: "Sanyi Ketto",
        email: "sanyi@ketto.hu",
        dateRegistered: "2020/01/02",
        urls: []
      },
      {
        id: 103,
        fullName: "Sanyi Harom",
        email: "sanyi@harom.hu",
        dateRegistered: "2020/01/03",
        urls: []
      },
      {
        id: 104,
        fullName: "Sanyi Negy",
        email: "sanyi@negy.hu",
        dateRegistered: "2020/01/04",
        urls: []
      },
      {
        id: 105,
        fullName: "Sanyi Ot",
        email: "sanyi@ot.hu",
        dateRegistered: "2020/01/05",
        urls: []
      },
      {
        id: 106,
        fullName: "Sanyi Hat",
        email: "sanyi@hat.hu",
        dateRegistered: "2020/01/06",
        urls: []
      },
      {
        id: 107,
        fullName: "Sanyi Het",
        email: "sanyi@het.hu",
        dateRegistered: "2020/01/07",
        urls: []
      },
      {
        id: 108,
        fullName: "Sanyi Nyolc",
        email: "sanyi@nyolc.hu",
        dateRegistered: "2020/01/08",
        urls: []
      }
    ];

    this.affiliatePlayers = [
      {
        id: 101,
        fullName: "Sanyi Egy",
        email: "sanyi@egy.hu",
        affiliateId: 101,
        dateCreated: "2020/01/01",
        firstDeposit: "2020/01/01",
        deposit: 5,
        commission: 1,
        lifetimeValue: 10
      },
      {
        id: 102,
        fullName: "Sanyi Ketto",
        email: "sanyi@ketto.hu",
        affiliateId: 101,
        dateCreated: "2020/01/02",
        firstDeposit: "2020/01/02",
        deposit: 53,
        commission: 12,
        lifetimeValue: 10
      },
      {
        id: 103,
        fullName: "Sanyi Harom",
        email: "sanyi@harom.hu",
        affiliateId: 101,
        dateCreated: "2020/01/03",
        firstDeposit: "2020/01/03",
        deposit: 23,
        commission: 11,
        lifetimeValue: 10
      },
      {
        id: 104,
        fullName: "Sanyi Negy",
        email: "sanyi@negy.hu",
        affiliateId: 102,
        dateCreated: "2020/01/04",
        firstDeposit: "2020/01/04",
        deposit: 4,
        commission: 1,
        lifetimeValue: 10
      },
      {
        id: 105,
        fullName: "Sanyi Ot",
        email: "sanyi@ot.hu",
        affiliateId: 102,
        dateCreated: "2020/01/05",
        firstDeposit: "2020/01/05",
        deposit: 5,
        commission: 1,
        lifetimeValue: 10
      },
      {
        id: 106,
        fullName: "Sanyi Hat",
        email: "sanyi@hat.hu",
        affiliateId: 103,
        dateCreated: "2020/01/06",
        firstDeposit: "2020/01/06",
        deposit: 45,
        commission: 876,
        lifetimeValue: 103
      },
      {
        id: 107,
        fullName: "Sanyi Het",
        email: "sanyi@het.hu",
        affiliateId: 103,
        dateCreated: "2020/01/01",
        firstDeposit: "2020/01/01",
        deposit: 5,
        commission: 1,
        lifetimeValue: 10
      },
      {
        id: 108,
        fullName: "Sanyi Nyolc",
        email: "sanyi@nyolc.hu",
        affiliateId: 104,
        dateCreated: "2020/01/08",
        firstDeposit: "2020/01/08",
        deposit: 23,
        commission: 56,
        lifetimeValue: 106
      }
    ];

    this.urls = [
      {
        id: 1,
        affiliateId: 101,
        shortUrl: "https://www.gamechampions.com/en?IWSource=SanyiEgy-101",
        destinationUrl: "https://www.gamechampions.com/en",
        medium: "",
        numberOfClicks: 234
      },
      {
        id: 2,
        affiliateId: 102,
        shortUrl:
          "https://www.gamechampions.com/en?IWSource=SanyiKetto-102&IWMedium=geza",
        destinationUrl: "https://www.gamechampions.com/en",
        medium: "geza",
        numberOfClicks: 34
      },
      {
        id: 3,
        affiliateId: 103,
        shortUrl: "https://www.gamechampions.com/en?IWSource=Sanyiharom-103",
        destinationUrl: "https://www.gamechampions.com/en",
        medium: "",
        numberOfClicks: 3
      },
      {
        id: 4,
        affiliateId: 104,
        shortUrl: "https://www.gamechampions.com/en?IWSource=Sanyinegy-104",
        destinationUrl: "https://www.gamechampions.com/en",
        medium: "",
        numberOfClicks: 57
      },
      {
        id: 5,
        affiliateId: 105,
        shortUrl: "https://www.gamechampions.com/en?IWSource=SanyiOt-105",
        destinationUrl: "https://www.gamechampions.com/en",
        medium: "",
        numberOfClicks: 22
      },
      {
        id: 6,
        affiliateId: 105,
        shortUrl:
          "https://www.gamechampions.com/en?IWSource=SanyiOt-105&IWMedium=juci",
        destinationUrl: "https://www.gamechampions.com/en",
        medium: "juci",
        numberOfClicks: 5
      },
      {
        id: 7,
        affiliateId: 104,
        shortUrl:
          "https://www.gamechampions.com/en?IWSource=SanyiNegy-104&IWMedium=laci",
        destinationUrl: "https://www.gamechampions.com/en",
        medium: "laci",
        numberOfClicks: 4
      },
      {
        id: 8,
        affiliateId: 104,
        shortUrl:
          "https://www.gamechampions.com/en?IWSource=SanyiNegy-104&IWMedium=lola",
        destinationUrl: "https://www.gamechampions.com/en",
        medium: "lola",
        numberOfClicks: 3
      }
    ];
  }

  getAll() {
    return Promise.resolve(this.affiliates);
  }

  getById(data) {
    const affiliate = this.affiliates.find(n => n.id == data.affiliateId);

    if (affiliate) {
      return Promise.resolve(affiliate);
    }

    return Promise.reject("Affiliate not found or Id is missing");
  }

  getUrls(data) {
    if (data) {
      let urls = [];
      urls = this.urls.filter(url => url.affiliateId == data.affiliateId);
      return Promise.resolve(urls);
    }

    return Promise.reject("Affiliate not found or Id is missing");
  }

  createAffiliateUrl(data) {
    if (data) {
      let affiliateId = data.affiliateId;
      return Promise.resolve(affiliateId);
    }
    return Promise.reject("Affiliate not found or Id is missing");
  }

  trackAffiliate() {
    return Promise.resolve();
  }

  getAffiliatePlayers(data) {
    if (data) {
      let players = [];
      players = this.affiliatePlayers.filter(
        affiliatePlayer => affiliatePlayer.affiliateId == data
      );
      return Promise.resolve(players);
    }

    return Promise.reject("Affiliate not found or Id is missing");
  }
}
