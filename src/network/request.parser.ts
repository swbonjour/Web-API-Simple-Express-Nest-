import { IncomingHttpHeaders, IncomingMessage } from 'http';
import Logger from '../helpers/logger';
import { RequestContentType } from './network.enums';

let instance: RequestParserInstace | undefined = undefined;

class RequestParserInstace {
  constructor() {
    if (instance) {
      throw new Error(`Can't create new instance of Request Parser`);
    }

    instance = this;
  }

  private parseReqDataToString(byteArray: Buffer): string {
    return Buffer.from(byteArray).toString('ascii');
  }

  private stringifyReqData(data: string): JSON {
    return JSON.parse(data);
  }

  public parseRequestData(reqHeader: IncomingHttpHeaders, chunk: Buffer): JSON | undefined {
    try {
      if (!reqHeader['content-type']) {
        throw new Error('Request header is not specified');
      }

      const parsedData: string = this.parseReqDataToString(chunk);

      switch (reqHeader['content-type']) {
        case RequestContentType.ApplicationJSON:
          return this.stringifyReqData(parsedData);
        case RequestContentType.TextPlain:
          return JSON.parse(`{ plainText: ${parsedData} }`);
        default:
          throw new Error(`${reqHeader['content-type']} is not supported`);
      }
    } catch (err: any) {
      Logger.logError(err);
    }
  }
}

const RequestParser = new RequestParserInstace();

export default RequestParser;
