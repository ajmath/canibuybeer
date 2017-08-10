import {Request, ReplyNoContinue, RouteConfiguration} from "hapi";

export default class Rules {
  public getRules(request: Request, reply: ReplyNoContinue) {
    const response = {
      request_args: {
        type: request.params["type"],
        location: {
          lat: request.params["lat"],
          lon: request.params["lon"],
        },
      },
      region: {
        data_available: true,
        prohibited_on: [] as any[],
      },
    };
    return reply(response).code(200);
  }

  public static getRoutes(): RouteConfiguration[] {
    return [{
      method: 'GET',
      path: '/api/rules/{type}/{lat},{lon}',
      handler: (request: Request, reply: ReplyNoContinue) => {
        const controller = new Rules();
        controller.getRules(request, reply);
      },
    }];
  }
}
