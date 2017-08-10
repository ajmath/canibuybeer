const Path = require("path");

module.exports.default = function() {
  return {
    hapi: {
      server: {
        connections: {
          routes: {
            files: {
              relativeTo: Path.resolve("./public"),
            },
            cors: true,
          }
        }
      },
      connection: {
        compression: false,
      },
    },
    isLocal: false,
    urls: {
      canIBuyBeer: "www.canibuybeer.com",
    },
    awsRegion: "us-east-1",
    acmCertArn: "arn:aws:acm:us-east-1:208348361849:certificate/83f6782e-5255-42cd-8524-19fa5927da29",
  };
};
