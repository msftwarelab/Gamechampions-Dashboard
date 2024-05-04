export default class ConfigServiceMock {
  constructor({ configuration }) {
    this.configuration = configuration;
  }

  get() {
    return Promise.resolve(this.configuration);
  }
}
