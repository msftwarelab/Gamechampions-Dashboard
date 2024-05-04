export default class BoyGamesMockService {
  getBoyGames() {
    return Promise.resolve([
      {
        "gameId": 1,
        "title": "Fortnite",
        "thumbnail": {
          "title": "fortn9t.png",
          "imageUrl": "/media/4216/fortn9t.png",
          "alternateText": "fortn9t.png",
          "width": 274,
          "height": 184,
          "id": 7251
        },
        "maximumBetAmount": 0
      }
    ]);
  }
}
