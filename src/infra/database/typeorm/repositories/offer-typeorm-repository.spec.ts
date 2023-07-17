import { DatabaseTestHelper, TestDataSource } from '../test/test-helper';
import { OfferEntity } from '../entities';
import { OfferTypeORMRepository } from './offer-typeorm-repository';
import { coinOnWalletList } from '../../../util/seeds';
import { type InputCheckOfferCreationDailyLimitRepositoryDTO, type InputAddOfferRepositoryDTO, type InputCheckBalanceRepositoryDTO } from '../../../../data/dtos';

type SutTypes = {
  sut: OfferTypeORMRepository
  addOfferData: InputAddOfferRepositoryDTO
  checkOfferCreationLimitData: InputCheckOfferCreationDailyLimitRepositoryDTO
  checkBalanceData: InputCheckBalanceRepositoryDTO
};

const makeSut = (): SutTypes => {
  const sut = new OfferTypeORMRepository(TestDataSource);

  const { coin, wallet, quantity } = coinOnWalletList[2];
  const addOfferData: InputAddOfferRepositoryDTO = {
    quantity,
    coin: { id: coin.id },
    wallet: { id: wallet.id }
  };

  const checkOfferCreationLimitData: InputCheckOfferCreationDailyLimitRepositoryDTO = { id: 1 };

  const checkBalanceData: InputCheckBalanceRepositoryDTO = {
    quantity: quantity + 1,
    coin,
    wallet
  };

  return {
    sut,
    addOfferData,
    checkOfferCreationLimitData,
    checkBalanceData
  };
};

describe('OfferTypeORMRepository', () => {
  let databaseTestHelper: DatabaseTestHelper;

  beforeEach(async () => {
    databaseTestHelper = new DatabaseTestHelper();
    await databaseTestHelper.init();
  });

  afterEach(async () => {
    await databaseTestHelper.close();
  });

  describe('add()', () => {
    test('should insert a new offer to the database', async () => {
      const { sut, addOfferData } = makeSut();
      const response = await sut.add(addOfferData);

      const offerRepository = TestDataSource.getRepository(OfferEntity);
      const offers = await offerRepository.find({
        relations: {
          coinOnWallet: {
            coin: true,
            wallet: true
          }
        }
      });
      const [offer] = offers;

      expect(response).toBe(true);
      expect(offers.length).toBe(1);
      expect(offer).toEqual(
        expect.objectContaining({
          quantity: addOfferData.quantity,
          coinOnWallet: expect.objectContaining({
            coin: expect.objectContaining({
              id: addOfferData.coin.id
            }),
            wallet: expect.objectContaining({
              id: addOfferData.wallet.id
            })
          })
        })
      );
    });

    test('should return false if fails', async () => {
      const getRepository: any = {
        findOne: () => null
      };
      jest
        .spyOn(TestDataSource, 'getRepository')
        .mockImplementationOnce(() => getRepository);

      const { sut, addOfferData } = makeSut();
      const response = await sut.add(addOfferData);

      expect(response).toBe(false);
    });
  });

  describe('validateLimit()', () => {
    test('should return true if creation limit is valid', async () => {
      const { sut, checkOfferCreationLimitData } = makeSut();

      const response = await sut.validateLimit(checkOfferCreationLimitData);

      expect(response).toBe(true);
    });

    test('should return false if creation limit is invalid', async () => {
      const { sut, checkOfferCreationLimitData } = makeSut();
      await databaseTestHelper.seedOffers();

      const response = await sut.validateLimit(checkOfferCreationLimitData);

      expect(response).toBe(false);
    });
  });

  describe('validateBalance()', () => {
    test('should return true if balance is valid', async () => {
      const { sut, addOfferData } = makeSut();

      const response = await sut.validateBalance(addOfferData);

      expect(response).toBe(true);
    });

    test('should return false if balance is invalid', async () => {
      const { sut, checkBalanceData } = makeSut();

      const response = await sut.validateBalance(checkBalanceData);

      expect(response).toBe(false);
    });
  });
});
