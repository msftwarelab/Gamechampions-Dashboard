export default class Service {
  get({ id, url, data }) {
    const translation = {
      translation: [
        {
          key: "ContactPageHeading",
          value: "Get in touch"
        }
      ]
    };

    return Promise.resolve(translation);
  }
}
