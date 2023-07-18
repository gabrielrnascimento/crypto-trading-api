import { type HttpResponse } from './http';

export interface Controller<Request = any> {
  handle: (request: Request) => Promise<HttpResponse>
}
