import AuthenticatedApiService from "../authenticatedApiService";
import { getUuid } from "../../src/js/util/util";

export default class Service extends AuthenticatedApiService {
  constructor() {
    super();
    this.response = {
      profile: {
        email: "info@incredible-web.com",
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
        role: 2,
        id: 6,
        imageUrl: "/img/G_logo.png",
        dateCreated: "2019-02-11T14:34:11.1277093",
        dateUpdated: "2019-02-11T14:34:11.1277093"
      },
      authenticationToken: {
        token: getUuid() + getUuid() + getUuid() + getUuid(),
        expiryDate: "2019-11-29T08:40:35.4263938+00:00",
        refreshToken: getUuid(),
        isExpired: false
      }
    };
  }

  sendMyAccount() {
    return Promise.resolve();
  }
}
