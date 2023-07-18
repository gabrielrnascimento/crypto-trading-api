import { type Validation } from '../../utils/protocols/validation';
import { type Controller } from '../protocols/controller';
import { type HttpRequest, type HttpResponse } from '../protocols/http';
import { badRequest } from '../utils/http-helper';

export class OfferController implements Controller {
  constructor (private readonly validation: Validation) {
    this.validation = validation;
  }

  async handle (request: HttpRequest): Promise<HttpResponse<any>> {
    const error = this.validation.validate(request.body);
    if (error) return badRequest(error);
    return null;
  }
}
