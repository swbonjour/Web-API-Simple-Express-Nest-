import EnvConfig from './helpers/env.config';
new EnvConfig(`${__dirname} + '/../.env`).init();
import { createServer } from 'http';
import Logger from './helpers/logger';
import RequestParser from './network/request.parser';
import Router from './network/router';
import { RequestMethod } from './network/network.enums';

try {
  const server = createServer((req, res) => {
    const routeUrl = Router.parseUrl(req.url!);

    const result = Router.use(routeUrl.url, req.method! as RequestMethod);

    req.on('data', (chunk: Buffer) => {
      const parsedData: string | JSON | undefined = RequestParser.parseRequestData(req.headers, chunk);
    });
    res.end(result);
  });

  server.listen(process.env.PORT, Number(process.env.HOSTNAME), () => {
    Logger.logInfo(`Server is listening at http://${process.env.HOSTNAME}:${process.env.PORT}`);
  });

  Router.add('user', RequestMethod.GET, () => {
    return 'asdffwgasdgaw';
  });
} catch (error) {
  Logger.logError(error);
}
