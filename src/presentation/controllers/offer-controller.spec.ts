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

export type SutTypes = {
  sut: OfferController
  validationStub: ValidationStub
};

const makeSut = (): SutTypes => {
  const validationStub = new ValidationStub();
  const sut = new OfferController(validationStub);
  return {
    sut,
    validationStub
  };
};

describe('OfferController', () => {
  test('should call Validation with correct value', async () => {
    const { sut, validationStub } = makeSut();
    const validateSpy = jest.spyOn(validationStub, 'validate');
    const httpRequest = makeFakeRequest();

    await sut.handle(httpRequest);
    expect(validateSpy).toHaveBeenCalledWith(httpRequest.body);
  });
});
