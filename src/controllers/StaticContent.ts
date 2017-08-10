import {ReplyNoContinue, RouteConfiguration, Request} from "hapi";

export default class StaticContent {

  public getFile(request: Request, reply: ReplyNoContinue) {
    console.log(`Got request for param ${request.params.param}:  Returning index.html`);
    return reply.file("index.html");
  }

  public static getRoutes(): RouteConfiguration[] {
    // const controller = new StaticContent();
    return [{
      method: 'GET',
      path: '/{param*}',
      handler: {
        directory: {
          path: ".",
          redirectToSlash: true,
          index: true,
          showHidden: true,
        }
      },
    }];
  }
}
