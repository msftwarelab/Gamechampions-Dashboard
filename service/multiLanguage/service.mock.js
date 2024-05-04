import AuthenticatedApiService from "../authenticatedApiService";

export default class MockService extends AuthenticatedApiService {
  get() {
    //if you add a new language here don't forget to update the array in the \src\js\util\util.js used for util's function
    return Promise.resolve([
      {
        id: 1001,
        language: "en",
        flagPath: "/img/flags/gb.svg"
      },
      {
        id: 1002,
        language: "fr",
        flagPath: "/img/flags/fr.svg"
      },
      {
        id: 1004,
        language: "es",
        flagPath: "/img/flags/es.svg"
      },
      {
        id: 1005,
        language: "de",
        flagPath: "/img/flags/de.svg"
      },
      {
        id: 1006,
        language: "it",
        flagPath: "/img/flags/it.svg"
      },
      {
        id: 1007,
        language: "pt",
        flagPath: "/img/flags/pt.svg"
      },
      {
        id: 1007,
        language: "nl",
        flagPath: "/img/flags/nl.svg"
      },
      {
        id: 1008,
        language: "jp",
        flagPath: "/img/flags/jp.svg"
      },
      {
        id: 1009,
        language: "kr",
        flagPath: "/img/flags/kr.svg"
      }
    ]);
  }
}
