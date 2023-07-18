import { type InputAddOfferDTO } from '../../data/dtos';
import { type AddOffer } from '../../domain/usecases/add-offer';
import { type Validation } from '../../utils/protocols/validation';
import { type HttpRequest } from '../protocols/http';
import { badRequest, serverError } from '../utils/http-helper';
import { OfferController } from './offer-controller';

class ValidationStub implements Validation {
  validate (input: any): Error {
    return null;
  }
}

class AddOfferStub implements AddOffer {
  async add (offer: InputAddOfferDTO): Promise<boolean> {
    return true;
  }
}

const makeFakeAddOfferRequest = (): HttpRequest<InputAddOfferDTO> => ({
  body: {
    coin: { id: 1 },
    wallet: { id: 1 },
    quantity: 42
  }
});

export type SutTypes = {
  sut: OfferController
  validationStub: ValidationStub
  addOfferStub: AddOfferStub
};

const makeSut = (): SutTypes => {
  const validationStub = new ValidationStub();
  const addOfferStub = new AddOfferStub();
  const sut = new OfferController(validationStub, addOfferStub);
  return {
    sut,
    validationStub,
    addOfferStub
  };
};

describe('OfferController', () => {
  test('should call Validation with correct value', async () => {
    const { sut, validationStub } = makeSut();
    const validateSpy = jest.spyOn(validationStub, 'validate');
    const httpRequest = makeFakeAddOfferRequest();

    await sut.handle(httpRequest);

    expect(validateSpy).toHaveBeenCalledWith(httpRequest.body);
  });

  test('should return 400 if Validation returns an error', async () => {
    const { sut, validationStub } = makeSut();
    jest.spyOn(validationStub, 'validate').mockReturnValueOnce(new Error('any_message'));
    const httpRequest = makeFakeAddOfferRequest();

    const response = await sut.handle(httpRequest);

    expect(response).toEqual(badRequest(new Error('any_message')));
  });

  test('should call AddOffer with correct values', async () => {
    const { sut, addOfferStub } = makeSut();
    const addSpy = jest.spyOn(addOfferStub, 'add');
    const httpRequest = makeFakeAddOfferRequest();

    await sut.handle(httpRequest);

    expect(addSpy).toHaveBeenCalledWith(httpRequest.body);
  });

  test('should return 500 if AddOffer throws', async () => {
    const { sut, addOfferStub } = makeSut();
    jest.spyOn(addOfferStub, 'add').mockRejectedValueOnce(new Error('any_message'));
    const httpRequest = makeFakeAddOfferRequest();

    const response = await sut.handle(httpRequest);

    expect(response).toEqual(serverError(new Error('any_message')));
  });
});
