export class MissingParamError extends Error {
  constructor (param: string) {
    super();
    this.name = 'MissingParamError';
    this.message = `Missing param: ${param}`;
  }
}
