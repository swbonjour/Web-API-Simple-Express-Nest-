// import { IncomingMessage, ServerResponse } from 'http';
// import Logger from '../helpers/logger';
// import RequestParser from './request.parser';

// enum RequestMethod {
//   GET = 'GET',
//   POST = 'POST',
//   PUT = 'PUT',
//   DELETE = 'DELETE',
// }

// export class RequestInit {
//   private req: IncomingMessage;
//   private res: ServerResponse<IncomingMessage>;
//   private chunk: Buffer;

//   private method?: RequestMethod;

//   constructor(req: IncomingMessage, res: ServerResponse<IncomingMessage>, chunk: Buffer) {
//     this.req = req;
//     this.res = res;
//     this.chunk = chunk;
//   }

//   public init(): { method: RequestMethod; successStatusCode: number; responseContentType: 'applicatin/json' } {
//     this.method = this.req.method as RequestMethod;

//     const parsedData: string | JSON | undefined = RequestParser.parseRequestData(this.req.headers, this.chunk);

//     if (!this.method) {
//       Logger.logError('Request method is not specified');
//     }

//     switch (this.method) {
//       case RequestMethod.GET:
//         const getRequestData = this.getRequest();
//         return { method: RequestMethod.GET, successStatusCode: getRequestData, responseContentType: 'applicatin/json' };
//       case RequestMethod.POST:
//         break;
//       case RequestMethod.PUT:
//         break;
//       case RequestMethod.DELETE:
//         break;
//       default:
//         break;
//     }
//   }

//   private getRequest() {
//     const successStatusCode = 200;
//     return successStatusCode;
//   }
// }
