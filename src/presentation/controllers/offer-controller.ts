import { type Validation } from '../../utils/protocols/validation';
import { type Controller } from '../protocols/controller';
import { type HttpRequest, type HttpResponse } from '../protocols/http';

export class OfferController implements Controller {
  constructor (private readonly validation: Validation) {
    this.validation = validation;
  }

  async handle (request: HttpRequest): Promise<HttpResponse<any>> {
    this.validation.validate(request.body);
    return null;
  }
}
