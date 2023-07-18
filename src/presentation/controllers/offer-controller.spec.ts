import { type Validation } from '../../utils/protocols/validation';
import { type HttpRequest } from '../protocols/http';
import { OfferController } from './offer-controller';

class ValidationStub implements Validation {
  validate (input: any): Error {
    return null;
  }
}

const makeFakeRequest = (): HttpRequest => ({
  body: {
    coin: 'any_coin',
    wallet: 'any_wallet',
    quantity: 42
  }
});

describe('OfferController', () => {
  test('should call Validation with correct value', async () => {
    const validationStub = new ValidationStub();
    const sut = new OfferController(validationStub);
    const validateSpy = jest.spyOn(validationStub, 'validate');
    const httpRequest = makeFakeRequest();

    await sut.handle(httpRequest);
    expect(validateSpy).toHaveBeenCalledWith(httpRequest.body);
  });
});
