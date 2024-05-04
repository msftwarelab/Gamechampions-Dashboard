import ApiService from "../apiService";
import { getUuid } from "../../src/js/util/util";
import { users } from "~service/self/service.mock";

const NEW_USER_FACEBOOK_ID = "3185468001538518";
const OLD_USER_FACEBOOK_ID = "106669264445095";

export default class AuthenticationMockService extends ApiService {
  constructor() {
    super();

    this.people = [
      {
        email: "john@doe.com",
        resetPasswordHash: "a12345"
      }
    ];

    this.facebookLoginNewUserResponse = {
      profile: {
        email: "rajsam003@gmail.com",
        userName: "samraj",
        fullName: "Sam Raj",
        dateOfBirth: "1990-11-28T00:00:00",
        isVerified: false,
        acceptedTaC: false,
        currency: "$",
        role: 2,
        id: 6,
        imageUrl:
          "https://platform-lookaside.fbsbx.com/platform/profilepic/?asid=3185468001538518&height=50&width=50&ext=1596355264&hash=AeRdXqIVXfqnrGSH",
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

    this.facebookLoginOldUserResponse = {
      profile: {
        email: "rajsam003@gmail.com",
        userName: "samraj",
        fullName: "Sam Raj",
        dateOfBirth: "1990-11-28T00:00:00",
        streetAddress: "Street",
        city: "Madras",
        country: "India",
        contactNumber: "823345758255",
        postCode: "hfkjsadhf",
        isVerified: false,
        acceptedTaC: false,
        currency: "$",
        role: 2,
        id: 6,
        registrationNumber: "123123",
        vatNumber: "4445555",
        otherInformation: "test test test",
        imageUrl:
          "https://platform-lookaside.fbsbx.com/platform/profilepic/?asid=106669264445095&height=50&width=50&ext=1596378057&hash=AeRvXQsYYroz22WE",
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

  createMyAccount({ data }) {
    if (data) {
      return Promise.resolve(this.response);
    } else {
      return Promise.reject("Invalid User");
    }
  }

  authenticate({ data }) {
    const userData = users.find(
      n =>
        n.profile.email === data.email && n.profile.password === data.password
    );

    if (userData) {
      return Promise.resolve(userData);
    }

    return Promise.reject({
      message: "Incorrect login or password"
    });
  }

  facebookAuthenticate({ data }) {
    if (data.facebookId === NEW_USER_FACEBOOK_ID) {
      return Promise.resolve(this.facebookLoginNewUserResponse);
    } else if (data.facebookId === OLD_USER_FACEBOOK_ID)
      return Promise.resolve(this.facebookLoginOldUserResponse);
    return Promise.reject({
      message: "Incorrect facebook Id"
    });
  }

  refreshToken() {
    return Promise.resolve({
      token: getUuid() + getUuid() + getUuid() + getUuid(),
      refreshToken: getUuid()
    });
  }

  resetPassword() {
    return Promise.resolve();
  }

  getFromHash(hash) {
    return Promise.resolve(this.people.find(n => n.resetPasswordHash === hash));
  }

  updatePassword() {
    return Promise.resolve();
  }

  changePassword() {
    return Promise.resolve();
  }
}
