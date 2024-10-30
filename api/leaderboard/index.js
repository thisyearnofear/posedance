const { PlayFab, PlayFabServer } = require("playfab-sdk");

function getKey() {
  return process.env["VUE_APP_PLAYFAB_SECRET_KEY"];
}

module.exports = function (context, req) {
  let playfab_key = getKey();

  if (!playfab_key) {
    context.res = {
      status: 500,
      body: { error: "Server configuration error" },
    };
    context.done();
    return;
  }

  var leaderboardRequest = {
    ProfileConstraints: {
      ShowDisplayName: true,
      ShowLinkedAccounts: true,
      ShowContactEmailAddresses: false,
    },
    MaxResultsCount: 100,
    StartPosition: 0,
    StatisticName: "score",
  };

  PlayFabServer.settings.titleId = "93CC0";
  PlayFab.settings.developerSecretKey = playfab_key;

  PlayFabServer.GetLeaderboard(leaderboardRequest, function (error, result) {
    if (error) {
      context.res = {
        status: 400,
        body: error,
      };
    } else {
      context.res = {
        status: 200,
        body: result.data.Leaderboard,
      };
    }
    context.done();
  });
};
