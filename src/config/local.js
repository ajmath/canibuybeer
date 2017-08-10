const Path = require('path');

module.exports.default = function() {
  return {
    hapi: {
      server: {
        connections: {
          routes: {
            files: {
              relativeTo: Path.resolve(process.env.PWD, "public"),
            },
            cors: true,
          }
        }
      },
      connection: {
        compression: false,
      },
    },
    isLocal: true,
    urls: {
      canIBuyBeer: "canibuybeer.local",
    },
    awsRegion: "us-local-1",
    acmCertArn: "arn:aws:acm:us-local1-1:555555555:certificate/abcedfg",
  };
};
