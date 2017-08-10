
import {ServerOptions} from "hapi";
import {ConnectionOptions} from "tls";

export interface Config {
  hapi: {
    server: ServerOptions;
    connection: ConnectionOptions;
  };
  isLocal: boolean;
  urls: {
    canIBuyBeer: string;
  };
  awsRegion: string;
}

const env = process.env.NODE_ENV || "local";
export default require(`./config/${env}`).default() as Config;
