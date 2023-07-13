import { type User, type Coin, type Wallet } from '../../../domain/models';
import { type AddOfferModel } from '../../../domain/usecases/add-offer';
import { AddOfferRepositorySpy, CheckOfferCreationDailyLimitRepositorySpy, CheckBalanceRepositorySpy } from '../../test/mocks/mock-db-offer';
import { DbAddOffer } from './db-add-offer';

const makeCoinMock = (): Coin => ({
  id: 1,
  code: 'ANY',
  unitPrice: 3.50
});

const makeUserMock = (): User => ({
  id: 1,
  email: 'any_email@mail.com',
  wallets: [

  ]
});

const makeWalletMock = (): Wallet => ({
  id: 1,
  coins: [
    makeCoinMock()
  ],
  name: 'any_wallet',
  owner: makeUserMock()
});

const makeAddOfferModel = (): AddOfferModel => ({
  coin: makeCoinMock(),
  createdBy: makeUserMock(),
  wallet: makeWalletMock(),
  quantity: 10,
  unitPrice: 3.50,
  totalPrice: 35.0
});

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

    const offer = makeAddOfferModel();
    await sut.add(offer);

    expect(addOfferRepositorySpy.params).toEqual(offer);
  });

  test('should throw if AddAccountRepository throws', async () => {
    const { sut, addOfferRepositorySpy } = makeSut();
    jest.spyOn(addOfferRepositorySpy, 'add').mockRejectedValueOnce(new Error());

    const offer = makeAddOfferModel();
    const promise = sut.add(offer);

    await expect(promise).rejects.toThrow(new Error());
  });

  test('should return false if AddOfferRepository returns false', async () => {
    const { sut, addOfferRepositorySpy } = makeSut();
    addOfferRepositorySpy.result = false;

    const offer = makeAddOfferModel();
    const response = await sut.add(offer);

    expect(response).toBe(false);
  });

  test('should call CheckOfferCreationDailyLimitRepository with correct values', async () => {
    const { sut, checkOfferCreationDailyLimitRepositorySpy } = makeSut();

    const offer = makeAddOfferModel();
    await sut.add(offer);

    expect(checkOfferCreationDailyLimitRepositorySpy.params).toEqual(offer);
  });

  test('should throw if CheckOfferCreationDailyLimitRepository throws', async () => {
    const { sut, checkOfferCreationDailyLimitRepositorySpy } = makeSut();
    jest.spyOn(checkOfferCreationDailyLimitRepositorySpy, 'validate').mockRejectedValueOnce(new Error());

    const offer = makeAddOfferModel();
    const promise = sut.add(offer);

    await expect(promise).rejects.toThrow(new Error());
  });

  test('should return false if CheckOfferCreationDailyLimitRepository returns false', async () => {
    const { sut, checkOfferCreationDailyLimitRepositorySpy } = makeSut();
    checkOfferCreationDailyLimitRepositorySpy.result = false;

    const offer = makeAddOfferModel();
    const response = await sut.add(offer);

    expect(response).toBe(false);
  });

  test('should call CheckBalanceRepository with correct values', async () => {
    const { sut, checkBalanceRepositorySpy } = makeSut();

    const offer = makeAddOfferModel();
    await sut.add(offer);

    expect(checkBalanceRepositorySpy.params).toEqual(offer);
  });

  test('should throw if CheckBalanceRepository throws', async () => {
    const { sut, checkBalanceRepositorySpy } = makeSut();
    jest.spyOn(checkBalanceRepositorySpy, 'validate').mockRejectedValueOnce(new Error());

    const offer = makeAddOfferModel();
    const promise = sut.add(offer);

    await expect(promise).rejects.toThrow(new Error());
  });

  test('should return false if CheckBalanceRepository returns false', async () => {
    const { sut, checkBalanceRepositorySpy } = makeSut();
    checkBalanceRepositorySpy.result = false;

    const offer = makeAddOfferModel();
    const response = await sut.add(offer);

    expect(response).toBe(false);
  });

  test('should return true on success', async () => {
    const { sut } = makeSut();

    const offer = makeAddOfferModel();
    const response = await sut.add(offer);

    expect(response).toBe(true);
  });
});
