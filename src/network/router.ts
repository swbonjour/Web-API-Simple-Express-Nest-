// As i assume we should have some kind of map
// That consist of objects like { url: 'smth', method: 'CRUD' }
// If url doesn't exist or url doesn't match with method we send http error

import Logger from '../helpers/logger';
import { RequestMethod } from './network.enums';

let instance: RouterInstance | undefined;

export class RouterInstance {
  private routesMap: Map<string, () => any>;

  constructor() {
    if (instance) {
      throw new Error(`Can't create new instance of Router`);
    }

    this.routesMap = new Map();

    instance = this;
  }

  public parseUrl(url: string) {
    const queryParams = url.split('?');
    const params: { [key: string]: any } = {};

    let resultUrl;

    if (!queryParams[1]) {
      resultUrl = url;
    } else {
      const parsedParams = queryParams[1].split('&');
      for (const item of parsedParams) {
        const [key, value] = item.split('=');
        params[key] = value;
      }

      resultUrl = queryParams[0].slice(1);
    }

    return {
      url: resultUrl,
      params: params,
    };
  }

  private isRouteExist(name: string) {
    return this.routesMap.get(name);
  }

  public add(url: string, method: RequestMethod, fn: () => any) {
    if (this.isRouteExist(`${url}_${method}`)) {
      throw new Error(`Router ${url} -> Method: ${method} already exists`);
    }

    this.routesMap.set(`${url}_${method}`, fn);

    Logger.logInfo(`Router ${url} -> ${method} created [http://${process.env.HOSTNAME}:${process.env.PORT}/${url}]`);
  }

  public use(url: string, method: RequestMethod) {
    const callback = this.routesMap.get(`${url}_${method}`);
    if (callback) {
      return callback();
    }
  }
}

const Router = new RouterInstance();

export default Router;
