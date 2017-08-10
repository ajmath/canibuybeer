import {RouteConfiguration} from "hapi";

export default class StaticContent {
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
