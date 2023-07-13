import { type User, type Coin, type Wallet } from '../../../domain/models';
import { type AddOfferModel } from '../../../domain/usecases/add-offer';
import { type AddOfferRepository } from '../../protocols/add-offer-repository';
import { DbAddOffer } from './db-add-offer';

class AddOfferRepositoryStub implements AddOfferRepository {
  async add (data: AddOfferModel): Promise<AddOfferModel> {
    return makeAddOfferModel();
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
  addOfferRepositoryStub: AddOfferRepository
  sut: DbAddOffer
};

const makeSut = (): SutTypes => {
  const addOfferRepositoryStub = new AddOfferRepositoryStub();
  const sut = new DbAddOffer(addOfferRepositoryStub);

  return {
    addOfferRepositoryStub,
    sut
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
});
