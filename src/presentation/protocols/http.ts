export interface HttpResponse<Body = any> {
  statusCode: number
  body: Body
}
