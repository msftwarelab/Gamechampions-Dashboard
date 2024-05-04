import ApiService from "../apiService";
import { getUuid } from "../../src/js/util/util";

export const users = [
  {
    profile: {
      role: 2,
      id: 6,
      email: "info@incredible-web.com",
      password: "abcd1234",
      dateOfBirth: "2019-11-28T00:00:00",
      contactNumber: "123123",
      userName: "turgaygulmez",
      fullName: "Turgay Gulmez",
      streetAddress: "Street",
      city: "Sliema",
      postCode: "MT124124",
      country: "Malta",
      isVerified: false,
      acceptedTaC: false,
      currency: "$",
      registrationNumber: "123123",
      vatNumber: "4445555",
      otherInformation: "test test test",
      imageUrl: "/img/G_logo.png",
      dateCreated: "2019-02-11T14:34:11.1277093",
      dateUpdated: "2019-02-11T14:34:11.1277093"
    },
    authenticationToken: {
      token: getUuid() + getUuid() + getUuid() + getUuid(),
      expiryDate: "2019-11-29T08:40:35.4263938+00:00",
      refreshToken: getUuid(),
      isExpired: false
    },
    card: { cardDisplayNumber: "4596", cardHolderFullName: "Robert Smith" }
  },
  {
    profile: {
      email: "test@incredible-web.com",
      password: "abcd1234",
      dateOfBirth: "1990-11-28T00:00:00",
      contactNumber: "123123",
      userName: "johndoe",
      fullName: "John Doe",
      streetAddress: "Street",
      city: "Msida",
      postCode: "MSD1241",
      country: "Malta",
      isVerified: false,
      acceptedTaC: false,
      currency: "$",
      role: 2,
      id: 7,
      registrationNumber: "123123",
      vatNumber: "4445555",
      otherInformation: "test test test",
      imageUrl: "/img/mock_images/player/portrait.jpg",
      dateCreated: "2019-02-11T14:34:11.1277093",
      dateUpdated: "2019-02-11T14:34:11.1277093"
    },
    authenticationToken: {
      token: getUuid() + getUuid() + getUuid() + getUuid(),
      expiryDate: "2019-11-29T08:40:35.4263938+00:00",
      refreshToken: getUuid(),
      isExpired: false
    }
  }
];

export default class SelfMockService extends ApiService {
  constructor() {
    super();
  }

  get() {
    return Promise.resolve(users[0].profile);
  }

  getCard() {
    const hasCard = true;
    return Promise.resolve(hasCard ? users[0].card : null);
  }

  getBonusTransactions() {
    Promise.resolve([]);
  }
}
