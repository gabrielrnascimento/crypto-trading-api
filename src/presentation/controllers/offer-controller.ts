import { type InputAddOfferDTO } from '../../data/dtos';
import { type AddOffer } from '../../domain/usecases/add-offer';
import { type Validation } from '../../utils/protocols/validation';
import { type Controller } from '../protocols/controller';
import { type HttpRequest, type HttpResponse } from '../protocols/http';
import { badRequest, created, forbidden, serverError } from '../utils/http-helper';
import { InsufficientBalanceError, OfferCreationLimitError } from '../../data/errors';

export class OfferController implements Controller {
  constructor (
    private readonly validation: Validation,
    private readonly addOffer: AddOffer
  ) {
    this.validation = validation;
  }

  async handle (request: HttpRequest<InputAddOfferDTO>): Promise<HttpResponse<any>> {
    const error = this.validation.validate(request.body);
    if (error) return badRequest(error);
    try {
      await this.addOffer.add(request.body);
      return created();
    } catch (err) {
      if (err instanceof InsufficientBalanceError ||
        err instanceof OfferCreationLimitError) return forbidden(err);
      return serverError(err);
    }
  }
}
