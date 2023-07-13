import { type User, type Coin, type Wallet, type Offer } from '../../../domain/models';
import { type AddOfferModel } from '../../../domain/usecases/add-offer';
import { type CheckBalanceRepository, type CheckOfferCreationDailyLimitRepository } from '../../protocols';
import { type AddOfferRepository } from '../../protocols/add-offer-repository';
import { DbAddOffer } from './db-add-offer';

class AddOfferRepositoryStub implements AddOfferRepository {
  async add (data: AddOfferModel): Promise<boolean> {
    return true;
  }
}

class CheckOfferCreationDailyLimitRepositoryStub implements CheckOfferCreationDailyLimitRepository {
  async validate (offerData: Offer): Promise<boolean> {
    return true;
  }
}

class CheckBalanceRepositoryStub implements CheckBalanceRepository {
  async validate (data: Offer): Promise<boolean> {
    return true;
  }
}

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
  addOfferRepositoryStub: AddOfferRepository
  checkOfferCreationDailyLimitRepositoryStub: CheckOfferCreationDailyLimitRepository
  checkBalanceRepositoryStub: CheckBalanceRepository
};

const makeSut = (): SutTypes => {
  const addOfferRepositoryStub = new AddOfferRepositoryStub();
  const checkOfferCreationDailyLimitRepositoryStub = new CheckOfferCreationDailyLimitRepositoryStub();
  const checkBalanceRepositoryStub = new CheckBalanceRepositoryStub();
  const sut = new DbAddOffer(addOfferRepositoryStub, checkOfferCreationDailyLimitRepositoryStub, checkBalanceRepositoryStub);

  return {
    sut,
    addOfferRepositoryStub,
    checkOfferCreationDailyLimitRepositoryStub,
    checkBalanceRepositoryStub
  };
};

describe('DbAddOffer', () => {
  test('should call AddAccountRepository with correct values', async () => {
    const { sut, addOfferRepositoryStub } = makeSut();
    const addSpy = jest.spyOn(addOfferRepositoryStub, 'add');

    const offer = makeAddOfferModel();
    await sut.add(offer);

    expect(addSpy).toHaveBeenCalledWith(offer);
  });

  test('should throw if AddAccountRepository throws', async () => {
    const { sut, addOfferRepositoryStub } = makeSut();
    jest.spyOn(addOfferRepositoryStub, 'add').mockRejectedValueOnce(new Error());

    const offer = makeAddOfferModel();
    const promise = sut.add(offer);

    await expect(promise).rejects.toThrow(new Error());
  });

  test('should return true on success', async () => {
    const { sut } = makeSut();

    const offer = makeAddOfferModel();
    const response = await sut.add(offer);

    expect(response).toBe(true);
  });

  test('should return false if AddOfferRepository returns false', async () => {
    const { sut, addOfferRepositoryStub } = makeSut();
    jest.spyOn(addOfferRepositoryStub, 'add').mockResolvedValueOnce(false);

    const offer = makeAddOfferModel();
    const response = await sut.add(offer);

    expect(response).toBe(false);
  });

  test('should call CheckOfferCreationDailyLimitRepository with correct values', async () => {
    const { sut, checkOfferCreationDailyLimitRepositoryStub } = makeSut();
    const validateSpy = jest.spyOn(checkOfferCreationDailyLimitRepositoryStub, 'validate');

    const offer = makeAddOfferModel();
    await sut.add(offer);

    expect(validateSpy).toHaveBeenCalledWith(offer);
  });

  test('should return false if CheckOfferCreationDailyLimitRepository returns false', async () => {
    const { sut, checkOfferCreationDailyLimitRepositoryStub } = makeSut();
    jest.spyOn(checkOfferCreationDailyLimitRepositoryStub, 'validate').mockResolvedValueOnce(false);

    const offer = makeAddOfferModel();
    const response = await sut.add(offer);

    expect(response).toBe(false);
  });

  test('should call CheckBalanceRepository with correct values', async () => {
    const { sut, checkBalanceRepositoryStub } = makeSut();
    const validateSpy = jest.spyOn(checkBalanceRepositoryStub, 'validate');

    const offer = makeAddOfferModel();
    await sut.add(offer);

    expect(validateSpy).toHaveBeenCalledWith(offer);
  });
});
