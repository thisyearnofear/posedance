const { PlayFabClient } = require("playfab-sdk");

module.exports = function (context, req) {
  PlayFabClient.settings.titleId = "93CC0";
  PlayFabClient.settings.sessionTicket = req.body.sessionId;

  var request = {
    Statistics: [
      {
        StatisticName: "score",
        Value: req.body.score,
      },
    ],
  };

  PlayFabClient.UpdatePlayerStatistics(request, function (error, result) {
    if (error) {
      context.res = {
        status: 400,
        body: error,
      };
    } else {
      context.res = {
        status: 200,
        body: result.data,
      };
    }
    context.done();
  });
};
