import { DatabaseTestHelper, TestDataSource } from '../test/test-helper';
import { OfferEntity } from '../entities';
import { type InputAddOfferDTO } from '../../../../data/dtos/';
import { OfferTypeORMRepository } from './offer-typeorm-repository';
import { coinOnWalletList } from '../../../util/seeds';

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
      const { coin, wallet, quantity } = coinOnWalletList[2];
      const offerData: InputAddOfferDTO = {
        quantity,
        coin: { id: coin.id },
        wallet: { id: wallet.id }
      };

      const sut = new OfferTypeORMRepository(TestDataSource);
      const response = await sut.add(offerData);

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
          quantity: offerData.quantity,
          coinOnWallet: expect.objectContaining({
            coin: expect.objectContaining({
              id: offerData.coin.id
            }),
            wallet: expect.objectContaining({
              id: offerData.wallet.id
            })
          })
        })
      );
    });
  });
});
