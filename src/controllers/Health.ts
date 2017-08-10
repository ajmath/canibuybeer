import {Request, ReplyNoContinue, RouteConfiguration} from "hapi";

export default class Health {
  public static getRoutes(): RouteConfiguration[] {
    return [{
      method: 'GET',
      path: '/api/ping',
      handler: (request: Request, reply: ReplyNoContinue) => {
        return reply("ok")
          .code(200)
          .type("text/plain")
          .header("x-is-it-good", "true");
      },
    }];
  }
}
