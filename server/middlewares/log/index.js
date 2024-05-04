let appInsights = require("applicationinsights");

appInsights
  .setup("39ed404b-58f8-4cd1-97a4-02414fe70b73")
  .setAutoDependencyCorrelation(true)
  .setAutoCollectRequests(true)
  .setAutoCollectPerformance(true, true)
  .setAutoCollectExceptions(true)
  .setAutoCollectDependencies(true)
  .setAutoCollectConsole(true)
  .setUseDiskRetryCaching(true)
  .setSendLiveMetrics(true)
  .setDistributedTracingMode(appInsights.DistributedTracingModes.AI)
  .start();

export const logMiddleware = (req, res, next) => {
  const { path, url } = req;
  const isAsset =
    path.includes(".jpg") ||
    path.includes(".png") ||
    path.includes(".ico") ||
    path.includes(".svg");

  if (req.method === "GET" && !isAsset) {
    console.log(url);

    appInsights.defaultClient.trackRequest({
      request: req,
      response: res
    });
  }

  next();
};
