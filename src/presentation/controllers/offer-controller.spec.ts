import { type InputAddOfferDTO } from '../../data/dtos';
import { InsufficientBalanceError, OfferCreationLimitError } from '../../data/errors';
import { type HttpRequest } from '../protocols/http';
import { AddOfferStub } from '../test/mocks/mock-add-offer';
import { ValidationStub } from '../test/mocks/mock-validation';
import { badRequest, created, forbidden, serverError } from '../utils/http-helper';
import { OfferController } from './offer-controller';

const makeFakeAddOfferRequest = (): HttpRequest<InputAddOfferDTO> => ({
  body: {
    coin: { id: 1 },
    wallet: { id: 1 },
    quantity: 42
  }
});

type SutTypes = {
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

  test('should return 403 if AddOffer throws InsufficientBalanceError', async () => {
    const { sut, addOfferStub } = makeSut();
    jest.spyOn(addOfferStub, 'add').mockRejectedValueOnce(new InsufficientBalanceError());
    const httpRequest = makeFakeAddOfferRequest();

    const response = await sut.handle(httpRequest);

    expect(response).toEqual(forbidden(new InsufficientBalanceError()));
  });

  test('should return 403 if AddOffer throws OfferCreationLimitError', async () => {
    const { sut, addOfferStub } = makeSut();
    jest.spyOn(addOfferStub, 'add').mockRejectedValueOnce(new OfferCreationLimitError());
    const httpRequest = makeFakeAddOfferRequest();

    const response = await sut.handle(httpRequest);

    expect(response).toEqual(forbidden(new OfferCreationLimitError()));
  });

  test('should return 500 if AddOffer throws an unexpected error', async () => {
    const { sut, addOfferStub } = makeSut();
    jest.spyOn(addOfferStub, 'add').mockRejectedValueOnce(new Error('any_message'));
    const httpRequest = makeFakeAddOfferRequest();

    const response = await sut.handle(httpRequest);

    expect(response).toEqual(serverError(new Error('any_message')));
  });

  test('should return 201 if AddOffer succeeds', async () => {
    const { sut } = makeSut();
    const httpRequest = makeFakeAddOfferRequest();

    const response = await sut.handle(httpRequest);

    expect(response).toEqual(created());
  });
});
