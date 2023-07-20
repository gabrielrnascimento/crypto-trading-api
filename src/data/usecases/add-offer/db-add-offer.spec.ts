import { mockOffer } from '../../../domain/test/mocks';
import { InsufficientBalanceError } from '../../errors/insufficient-balance-error';
import { AddOfferRepositorySpy, CheckOfferCreationDailyLimitRepositorySpy, CheckBalanceRepositorySpy } from '../../test/mocks/mock-db-offer';
import { DbAddOffer } from './db-add-offer';

type SutTypes = {
  sut: DbAddOffer
  addOfferRepositorySpy: AddOfferRepositorySpy
  checkOfferCreationDailyLimitRepositorySpy: CheckOfferCreationDailyLimitRepositorySpy
  checkBalanceRepositorySpy: CheckBalanceRepositorySpy
};

const makeSut = (): SutTypes => {
  const addOfferRepositorySpy = new AddOfferRepositorySpy();
  const checkOfferCreationDailyLimitRepositorySpy = new CheckOfferCreationDailyLimitRepositorySpy();
  const checkBalanceRepositorySpy = new CheckBalanceRepositorySpy();
  const sut = new DbAddOffer(addOfferRepositorySpy, checkOfferCreationDailyLimitRepositorySpy, checkBalanceRepositorySpy);

  return {
    sut,
    addOfferRepositorySpy,
    checkOfferCreationDailyLimitRepositorySpy,
    checkBalanceRepositorySpy
  };
};

describe('DbAddOffer', () => {
  test('should call AddAccountRepository with correct values', async () => {
    const { sut, addOfferRepositorySpy } = makeSut();

    const offer = mockOffer();
    await sut.add(offer);

    expect(addOfferRepositorySpy.params).toEqual(offer);
  });

  test('should throw if AddAccountRepository throws', async () => {
    const { sut, addOfferRepositorySpy } = makeSut();
    jest.spyOn(addOfferRepositorySpy, 'add').mockRejectedValueOnce(new Error());

    const offer = mockOffer();
    const promise = sut.add(offer);

    await expect(promise).rejects.toThrow(new Error());
  });

  test('should return false if AddOfferRepository returns false', async () => {
    const { sut, addOfferRepositorySpy } = makeSut();
    addOfferRepositorySpy.result = false;

    const offer = mockOffer();
    const response = await sut.add(offer);

    expect(response).toBe(false);
  });

  test('should call CheckOfferCreationDailyLimitRepository with correct values', async () => {
    const { sut, checkOfferCreationDailyLimitRepositorySpy } = makeSut();

    const offer = mockOffer();
    await sut.add(offer);

    expect(checkOfferCreationDailyLimitRepositorySpy.params).toEqual(offer.wallet);
  });

  test('should throw if CheckOfferCreationDailyLimitRepository throws', async () => {
    const { sut, checkOfferCreationDailyLimitRepositorySpy } = makeSut();
    jest.spyOn(checkOfferCreationDailyLimitRepositorySpy, 'validateLimit').mockRejectedValueOnce(new Error());

    const offer = mockOffer();
    const promise = sut.add(offer);

    await expect(promise).rejects.toThrow(new Error());
  });

  test('should return false if CheckOfferCreationDailyLimitRepository returns false', async () => {
    const { sut, checkOfferCreationDailyLimitRepositorySpy } = makeSut();
    checkOfferCreationDailyLimitRepositorySpy.result = false;

    const offer = mockOffer();
    const response = await sut.add(offer);

    expect(response).toBe(false);
  });

  test('should call CheckBalanceRepository with correct values', async () => {
    const { sut, checkBalanceRepositorySpy } = makeSut();

    const offer = mockOffer();
    await sut.add(offer);

    expect(checkBalanceRepositorySpy.params).toEqual(offer);
  });

  test('should throw if CheckBalanceRepository throws', async () => {
    const { sut, checkBalanceRepositorySpy } = makeSut();
    jest.spyOn(checkBalanceRepositorySpy, 'validateBalance').mockRejectedValueOnce(new Error());

    const offer = mockOffer();
    const promise = sut.add(offer);

    await expect(promise).rejects.toThrow(new Error());
  });

  test('should throw InsufficientBalanceError if CheckBalanceRepository returns false', async () => {
    const { sut, checkBalanceRepositorySpy } = makeSut();
    checkBalanceRepositorySpy.result = false;

    const offer = mockOffer();
    const response = sut.add(offer);

    await expect(response).rejects.toThrow(new InsufficientBalanceError());
  });

  test('should return true on success', async () => {
    const { sut } = makeSut();

    const offer = mockOffer();
    const response = await sut.add(offer);

    expect(response).toBe(true);
  });
});
