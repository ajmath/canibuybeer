import * as Hapi from "hapi";
import * as Inert from "inert";

import config from "./config";
import Rules from "./controllers/Rules";
import Health  from "./controllers/Health";
import StaticContent from "./controllers/StaticContent";

let server: Hapi.Server;
async function getServer(): Promise<Hapi.Server> {
  if (server) {
    return server;
  }

  server = new Hapi.Server(config.hapi.server);
  server.connection(config.hapi.connection);
  let error = await server.register([Inert]);
  if (error) {
    console.error("Failed loading plugins", error);
    throw new Error("Failed loading plugins");
  }

  server.route(Rules.getRoutes());
  server.route(Health.getRoutes());
  server.route(StaticContent.getRoutes());

  error = await server.initialize();
  if (error) {
    console.error("Hapi initialization error", error);
    throw new Error("Hapi initialization error");
  }
  return server;
}
export default getServer;
