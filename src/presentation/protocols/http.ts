export interface HttpResponse<Body = any> {
  statusCode: number
  body: Body
}

export interface HttpRequest {
  body?: any
}
