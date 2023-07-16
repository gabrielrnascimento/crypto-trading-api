import { DatabaseTestHelper, TestDataSource } from '../test/test-helper';
import { OfferEntity } from '../entities';
import { OfferTypeORMRepository } from './offer-typeorm-repository';
import { coinOnWalletList } from '../../../util/seeds';
import { type InputAddOfferRepositoryDTO } from '../../../../data/dtos';

type SutTypes = {
  sut: OfferTypeORMRepository
  addOfferData: InputAddOfferRepositoryDTO
};

const makeSut = (): SutTypes => {
  const sut = new OfferTypeORMRepository(TestDataSource);

  const { coin, wallet, quantity } = coinOnWalletList[2];
  const addOfferData: InputAddOfferRepositoryDTO = {
    quantity,
    coin: { id: coin.id },
    wallet: { id: wallet.id }
  };

  return {
    sut,
    addOfferData
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
});
